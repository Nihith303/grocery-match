
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dish, DishIngredient } from "@/types/database.types";
import {
  Utensils,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DishCardProps {
  dish: Dish;
  showIngredients?: boolean;
}

export const DishCard = ({ dish, showIngredients = false }: DishCardProps) => {
  const { user } = useAuth();
  const { addDishToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [ingredients, setIngredients] = useState<DishIngredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [showIngredientsPanel, setShowIngredientsPanel] =
    useState(showIngredients);
  const isFavorited = isFavorite(dish.id);

  const toggleIngredients = async () => {
    if (!showIngredientsPanel && ingredients.length === 0) {
      await fetchIngredients();
    }
    setShowIngredientsPanel(!showIngredientsPanel);
  };

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("dish_ingredients")
        .select(
          `
          *,
          ingredient:ingredients(*)
        `
        )
        .eq("dish_id", dish.id)
        .order('optional', { ascending: true });

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast({
        variant: "destructive",
        title: "Failed to load ingredients",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart.",
      });
      return;
    }

    try {
      await addDishToCart(dish.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save favorites.",
      });
      return;
    }

    try {
      if (isFavorited) {
        await removeFromFavorites(dish.id);
      } else {
        await addToFavorites(dish.id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-olive-600">{dish.name}</CardTitle>
          <Badge variant="outline" className="capitalize">
            {dish.cuisine}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{dish.description}</p>

        <div className="flex items-center justify-between mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleIngredients}
            className="flex items-center gap-1"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Utensils className="h-4 w-4 mr-1" />
            )}
            {showIngredientsPanel ? "Hide Ingredients" : "Show Ingredients"}
            {!loading && (
              showIngredientsPanel ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )
            )}
          </Button>
        </div>

        {showIngredientsPanel && (
          <div className="mt-3 border rounded-md p-3">
            <h4 className="font-medium mb-2 text-olive-600">Ingredients:</h4>
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            ) : ingredients.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 max-h-48 overflow-y-auto">
                {ingredients.map((item) => (
                  <li key={item.id} className="text-sm">
                    <span className="font-medium">{item.ingredient?.name}</span>{" "}
                    <span className="text-gray-600">
                      ({item.quantity} {item.unit || item.ingredient?.unit || ''})
                    </span>
                    {item.optional && (
                      <span className="text-gray-500 italic ml-1">(optional)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">
                No ingredients found for this dish.
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={isFavorited ? "default" : "outline"}
          size="sm"
          onClick={handleToggleFavorite}
          className="flex items-center gap-1"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
          {isFavorited ? "Saved" : "Save"}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddToCart}
          className="flex items-center gap-1"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
