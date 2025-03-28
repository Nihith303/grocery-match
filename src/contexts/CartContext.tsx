import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { CartItem, Ingredient, Dish } from "@/types/database.types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  cartDishes: {
    dish: Dish;
    people: number;
    ingredients: CartItem[];
  }[];
  loading: boolean;
  addToCart: (ingredientId: string, quantity: number, dishId?: string) => Promise<void>;
  removeFromCart: (ingredientId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addDishToCart: (dishId: string) => Promise<void>;
  removeDishFromCart: (dishId: string) => Promise<void>;
  updatePeopleCount: (dishId: string, count: number) => Promise<void>;
  customizeIngredient: (
    dishId: string, 
    ingredientId: string, 
    quantity: number
  ) => Promise<void>;
  removeIngredientFromDish: (
    dishId: string,
    ingredientId: string
  ) => Promise<void>;
  addIngredientToDish: (
    dishId: string,
    ingredientId: string,
    quantity: number
  ) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDishes, setCartDishes] = useState<{
    dish: Dish;
    people: number;
    ingredients: CartItem[];
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const organizeCartItems = async (items: CartItem[]) => {
    const standaloneItems = items.filter(item => !item.dish_id);
    const dishGroups = items.filter(item => item.dish_id).reduce((acc, item) => {
      if (!acc[item.dish_id!]) {
        acc[item.dish_id!] = [];
      }
      acc[item.dish_id!].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);
    
    const dishPromises = Object.keys(dishGroups).map(async (dishId) => {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('id', dishId)
        .single();
        
      if (error || !data) return null;
      
      return {
        dish: data as Dish,
        people: dishGroups[dishId][0].people || 1,
        ingredients: dishGroups[dishId]
      };
    });
    
    const dishesWithIngredients = (await Promise.all(dishPromises)).filter(Boolean);
    setCartDishes(dishesWithIngredients as any);
    setCartItems(standaloneItems);
  };

  const fetchCartItems = async () => {
    if (!user) {
      setCartItems([]);
      setCartDishes([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_carts')
        .select(`
          *,
          ingredient:ingredients(*)
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      await organizeCartItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      toast({
        variant: "destructive",
        title: "Failed to load cart",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const addToCart = async (ingredientId: string, quantity: number, dishId?: string) => {
    if (!user) return;
    
    try {
      const existingItemIndex = cartItems.findIndex(item => 
        item.ingredient_id === ingredientId && 
        (dishId ? item.dish_id === dishId : !item.dish_id)
      );
      
      if (existingItemIndex >= 0) {
        const newQuantity = cartItems[existingItemIndex].quantity + quantity;
        await updateQuantity(cartItems[existingItemIndex].id, newQuantity);
      } else {
        const { error } = await supabase
          .from('user_carts')
          .insert({
            user_id: user.id,
            ingredient_id: ingredientId,
            quantity,
            dish_id: dishId,
            people: dishId ? 1 : null
          });
          
        if (error) throw error;
        await fetchCartItems();
        toast({
          title: "Added to cart",
          description: "Item has been added to your cart.",
        });
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to add item",
        description: error.message,
      });
    }
  };

  const removeFromCart = async (ingredientId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id)
        .eq('ingredient_id', ingredientId);
        
      if (error) throw error;
      
      await fetchCartItems();
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove item",
        description: error.message,
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    try {
      if (quantity <= 0) {
        const itemToRemove = [...cartItems, ...cartDishes.flatMap(d => d.ingredients)].find(i => i.id === itemId);
        if (itemToRemove) {
          await removeFromCart(itemToRemove.ingredient_id);
        }
        return;
      }
      
      const { error } = await supabase
        .from('user_carts')
        .update({ quantity })
        .eq('id', itemId);
        
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast({
        variant: "destructive",
        title: "Failed to update quantity",
        description: error.message,
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setCartItems([]);
      setCartDishes([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to clear cart",
        description: error.message,
      });
    }
  };

  const addDishToCart = async (dishId: string) => {
    if (!user) return;
    
    try {
      const { data: dishIngredients, error: ingredientsError } = await supabase
        .from('dish_ingredients')
        .select(`
          *,
          ingredient:ingredients(*)
        `)
        .eq('dish_id', dishId);
        
      if (ingredientsError) throw ingredientsError;
      
      if (!dishIngredients || dishIngredients.length === 0) {
        toast({
          variant: "destructive",
          title: "No ingredients",
          description: "This dish has no ingredients to add to cart.",
        });
        return;
      }
      
      const cartPromises = dishIngredients.map(async (item) => {
        const { error } = await supabase
          .from('user_carts')
          .insert({
            user_id: user.id,
            ingredient_id: item.ingredient_id,
            quantity: item.quantity,
            dish_id: dishId,
            people: 1
          });
          
        if (error) throw error;
      });
      
      await Promise.all(cartPromises);
      await fetchCartItems();
      
      const { data: dishData } = await supabase
        .from('dishes')
        .select('name')
        .eq('id', dishId)
        .single();
      
      toast({
        title: "Added to cart",
        description: `${dishData?.name || 'The dish'} has been added to your cart.`,
      });
    } catch (error: any) {
      console.error('Error adding dish to cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to add dish",
        description: error.message,
      });
    }
  };

  const removeDishFromCart = async (dishId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id)
        .eq('dish_id', dishId);
        
      if (error) throw error;
      
      await fetchCartItems();
      toast({
        title: "Removed from cart",
        description: "Dish has been removed from your cart.",
      });
    } catch (error: any) {
      console.error('Error removing dish from cart:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove dish",
        description: error.message,
      });
    }
  };

  const updatePeopleCount = async (dishId: string, count: number) => {
    if (!user || count < 1) return;
    
    try {
      const { error } = await supabase
        .from('user_carts')
        .update({ people: count })
        .eq('user_id', user.id)
        .eq('dish_id', dishId);
        
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error updating people count:', error);
      toast({
        variant: "destructive",
        title: "Failed to update people count",
        description: error.message,
      });
    }
  };

  const customizeIngredient = async (dishId: string, ingredientId: string, quantity: number) => {
    if (!user) return;
    
    try {
      const dishItems = cartDishes.find(d => d.dish.id === dishId)?.ingredients || [];
      const itemToUpdate = dishItems.find(item => item.ingredient_id === ingredientId);
      
      if (!itemToUpdate) {
        throw new Error("Ingredient not found in dish");
      }
      
      await updateQuantity(itemToUpdate.id, quantity);
    } catch (error: any) {
      console.error('Error customizing ingredient:', error);
      toast({
        variant: "destructive",
        title: "Failed to customize ingredient",
        description: error.message,
      });
      throw error;
    }
  };

  const removeIngredientFromDish = async (dishId: string, ingredientId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_carts')
        .delete()
        .eq('user_id', user.id)
        .eq('dish_id', dishId)
        .eq('ingredient_id', ingredientId);
        
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error removing ingredient from dish:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove ingredient",
        description: error.message,
      });
      throw error;
    }
  };

  const addIngredientToDish = async (dishId: string, ingredientId: string, quantity: number) => {
    if (!user) return;
    
    try {
      const dishInCart = cartDishes.find(d => d.dish.id === dishId);
      const peopleCount = dishInCart ? dishInCart.people : 1;
      
      const { error } = await supabase
        .from('user_carts')
        .insert({
          user_id: user.id,
          ingredient_id: ingredientId,
          quantity,
          dish_id: dishId,
          people: peopleCount
        });
        
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error: any) {
      console.error('Error adding ingredient to dish:', error);
      toast({
        variant: "destructive",
        title: "Failed to add ingredient",
        description: error.message,
      });
      throw error;
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartDishes,
        loading, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        addDishToCart,
        removeDishFromCart,
        updatePeopleCount,
        customizeIngredient,
        removeIngredientFromDish,
        addIngredientToDish
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
