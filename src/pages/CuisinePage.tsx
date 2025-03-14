
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cuisines, dishes } from "@/data/cuisines";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Heart, Plus, Minus, List } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DishIngredient } from "@/types/database.types";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const CuisinePage = () => {
  const { cuisineId } = useParams<{ cuisineId: string }>();
  const { addDishToCart } = useCart();
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [dishIngredients, setDishIngredients] = useState<Record<string, DishIngredient[]>>({});
  const [loading, setLoading] = useState(false);
  
  const cuisine = cuisines.find(c => c.id === cuisineId);
  const cuisineDishes = cuisineId ? dishes[cuisineId as keyof typeof dishes] || [] : [];

  useEffect(() => {
    // This would normally fetch from the API, but we're using mock data for now
    // In a real app, you would fetch dish ingredients from your Supabase database
    const fetchDishIngredients = async () => {
      try {
        setLoading(true);
        if (cuisineDishes.length > 0) {
          const dishIds = cuisineDishes.map(dish => dish.id);
          
          // Fetch ingredients for all dishes in this cuisine
          const { data, error } = await supabase
            .from('dish_ingredients')
            .select(`
              *,
              ingredient:ingredients(*)
            `)
            .in('dish_id', dishIds);
            
          if (error) throw error;

          // Group ingredients by dish ID
          const ingredientsByDish: Record<string, DishIngredient[]> = {};
          data?.forEach((item) => {
            if (!ingredientsByDish[item.dish_id]) {
              ingredientsByDish[item.dish_id] = [];
            }
            ingredientsByDish[item.dish_id].push(item);
          });
          
          setDishIngredients(ingredientsByDish);
        }
      } catch (error) {
        console.error("Error fetching dish ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishIngredients();
  }, [cuisineId, cuisineDishes]);

  if (!cuisine) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold">Cuisine not found</h1>
          <p className="mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Return to home page
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = async (dishId: string) => {
    try {
      await addDishToCart(dishId);
    } catch (error) {
      console.error("Error adding dish to cart:", error);
    }
  };

  const handleToggleFavorite = async (dishId: string) => {
    if (!user) {
      toast({
        title: "Not signed in",
        description: "Please sign in to add dishes to favorites.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isFavorite(dishId)) {
        await removeFromFavorites(dishId);
      } else {
        await addToFavorites(dishId);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="relative h-80 rounded-lg overflow-hidden mb-6">
            <img
              src={cuisine.imageUrl}
              alt={cuisine.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{cuisine.name}</h1>
            </div>
          </div>
          <p className="text-lg text-gray-600">{cuisine.description}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Popular {cuisine.name} Dishes</h2>
        
        {cuisineDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisineDishes.map((dish) => (
              <Card key={dish.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardDescription>{dish.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <List className="h-4 w-4 mr-2" />
                        View Ingredients
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{dish.name} Ingredients</DialogTitle>
                        <DialogDescription>
                          Here are all the ingredients needed for this dish.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-auto">
                        {loading ? (
                          <p className="text-center py-4">Loading ingredients...</p>
                        ) : dishIngredients[dish.id]?.length > 0 ? (
                          <ul className="space-y-2 my-4">
                            {dishIngredients[dish.id].map((item) => (
                              <li key={item.id} className="flex justify-between items-center">
                                <span>{item.ingredient?.name}</span>
                                <span className="text-sm text-gray-500">
                                  {item.quantity} {item.unit || item.ingredient?.unit || ''}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center py-4">No ingredients found for this dish.</p>
                        )}
                      </div>
                      <DialogFooter className="flex justify-between sm:justify-between">
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button 
                          onClick={() => {
                            handleAddToCart(dish.id);
                          }}
                          className="flex items-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add All to Cart
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    onClick={() => handleAddToCart(dish.id)}
                    className="flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  {user && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFavorite(dish.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Heart 
                        className={`h-5 w-5 ${isFavorite(dish.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              No dishes available for this cuisine yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CuisinePage;
