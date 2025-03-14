
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Trash, List } from "lucide-react";
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

const Favorites = () => {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const { addDishToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dishIngredients, setDishIngredients] = useState<Record<string, DishIngredient[]>>({});
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const handleAddToCart = async (dishId: string) => {
    try {
      await addDishToCart(dishId);
    } catch (error) {
      console.error("Error adding dish to cart:", error);
    }
  };

  const redirectToLogin = () => {
    toast({
      title: "Please sign in",
      description: "You need to be signed in to view your favorites",
      variant: "destructive",
    });
    navigate("/auth");
  };

  useEffect(() => {
    if (!loading && !user) {
      redirectToLogin();
    }
  }, [loading, user]);

  useEffect(() => {
    const fetchDishIngredients = async () => {
      if (!favorites.length) return;

      try {
        setLoadingIngredients(true);
        const dishIds = favorites.map(fav => fav.dish_id);
        
        // Fetch ingredients for all favorited dishes
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
      } catch (error) {
        console.error("Error fetching dish ingredients:", error);
      } finally {
        setLoadingIngredients(false);
      }
    };

    if (favorites.length > 0) {
      fetchDishIngredients();
    }
  }, [favorites]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading favorites...
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Favorite Dishes</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-10">
            <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">
              Save your favorite dishes for quick access in the future.
            </p>
            <Button onClick={() => navigate("/")}>
              Browse Dishes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div 
                key={favorite.id} 
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{favorite.dish?.name}</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromFavorites(favorite.dish_id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">{favorite.dish?.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {favorite.dish?.cuisine && `Cuisine: ${favorite.dish.cuisine}`}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <List className="h-4 w-4 mr-2" />
                          View Ingredients
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{favorite.dish?.name} Ingredients</DialogTitle>
                          <DialogDescription>
                            Here are all the ingredients needed for this dish.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[60vh] overflow-auto">
                          {loadingIngredients ? (
                            <p className="text-center py-4">Loading ingredients...</p>
                          ) : dishIngredients[favorite.dish_id]?.length > 0 ? (
                            <ul className="space-y-2 my-4">
                              {dishIngredients[favorite.dish_id].map((item) => (
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
                              handleAddToCart(favorite.dish_id);
                            }}
                            className="flex items-center"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add All to Cart
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      onClick={() => handleAddToCart(favorite.dish_id)}
                      className="flex items-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add Ingredients to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
