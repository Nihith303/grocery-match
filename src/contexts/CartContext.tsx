
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { CartItem, Ingredient } from "@/types/database.types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (ingredientId: string, quantity: number) => Promise<void>;
  removeFromCart: (ingredientId: string) => Promise<void>;
  updateQuantity: (ingredientId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  addDishToCart: (dishId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    if (!user) {
      setCartItems([]);
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
      setCartItems(data || []);
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

  const addToCart = async (ingredientId: string, quantity: number) => {
    if (!user) return;
    
    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.ingredient_id === ingredientId);
      
      if (existingItem) {
        // Update quantity if already in cart
        const newQuantity = existingItem.quantity + quantity;
        await updateQuantity(ingredientId, newQuantity);
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('user_carts')
          .insert({
            user_id: user.id,
            ingredient_id: ingredientId,
            quantity
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
      
      setCartItems(cartItems.filter(item => item.ingredient_id !== ingredientId));
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

  const updateQuantity = async (ingredientId: string, quantity: number) => {
    if (!user) return;
    
    try {
      if (quantity <= 0) {
        await removeFromCart(ingredientId);
        return;
      }
      
      const { error } = await supabase
        .from('user_carts')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('ingredient_id', ingredientId);
        
      if (error) throw error;
      
      setCartItems(cartItems.map(item => 
        item.ingredient_id === ingredientId 
          ? { ...item, quantity } 
          : item
      ));
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
      // Get all ingredients for the dish
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
      
      // Add all ingredients to cart
      const promises = dishIngredients.map(async (item) => {
        await addToCart(item.ingredient_id, item.quantity);
      });
      
      await Promise.all(promises);
      
      const { data: dishData } = await supabase
        .from('dishes')
        .select('name')
        .eq('id', dishId)
        .single();
      
      toast({
        title: "Added to cart",
        description: `All ingredients for ${dishData?.name || 'the dish'} have been added to your cart.`,
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

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        loading, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        addDishToCart
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
