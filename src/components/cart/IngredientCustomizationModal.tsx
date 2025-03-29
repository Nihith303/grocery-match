
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Minus, AlertCircle } from "lucide-react";
import { CartItem, Ingredient, Dish } from "@/types/database.types";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IngredientCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  dish: Dish;
  ingredients: CartItem[];
  people: number;
  onUpdateIngredient: (ingredientId: string, quantity: number) => Promise<void>;
  onRemoveIngredient: (ingredientId: string) => Promise<void>;
  onAddIngredient: (ingredientId: string, quantity: number) => Promise<void>;
}

export const IngredientCustomizationModal: React.FC<IngredientCustomizationModalProps> = ({
  isOpen,
  onClose,
  dish,
  ingredients,
  people,
  onUpdateIngredient,
  onRemoveIngredient,
  onAddIngredient
}) => {
  const [loading, setLoading] = useState(false);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIngredients, setCurrentIngredients] = useState<CartItem[]>([]);

  useEffect(() => {
    setCurrentIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    const fetchAvailableIngredients = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('ingredients')
          .select('*')
          .order('name');
          
        if (error) throw error;
        
        setAvailableIngredients(data || []);
      } catch (error: any) {
        console.error('Error fetching available ingredients:', error);
        toast({
          variant: "destructive",
          title: "Failed to load ingredients",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchAvailableIngredients();
    }
  }, [isOpen]);

  const calculateUpdatedTotal = () => {
    return currentIngredients.reduce((total, item) => {
      return total + (item.quantity * 10) * people;
    }, 0);
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      await onUpdateIngredient(itemId, quantity);
      
      setCurrentIngredients(prevIngredients => 
        prevIngredients.map(ing => 
          ing.id === itemId ? { ...ing, quantity } : ing
        )
      );
      
      toast({
        title: "Ingredient updated",
        description: "The ingredient quantity has been updated.",
      });
    } catch (error: any) {
      console.error('Error updating ingredient:', error);
      toast({
        variant: "destructive",
        title: "Failed to update ingredient",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveIngredient = async (ingredientId: string) => {
    try {
      setLoading(true);
      await onRemoveIngredient(ingredientId);
      
      setCurrentIngredients(prevIngredients => 
        prevIngredients.filter(ing => ing.ingredient_id !== ingredientId)
      );
      
      toast({
        title: "Ingredient removed",
        description: "The ingredient has been removed from your dish.",
      });
    } catch (error: any) {
      console.error('Error removing ingredient:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove ingredient",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = async (ingredientId: string) => {
    try {
      setLoading(true);
      await onAddIngredient(ingredientId, 1);
      
      // Refetch current ingredients to get the updated list
      const updatedIngredients = [...currentIngredients];
      const newIngredient = availableIngredients.find(ing => ing.id === ingredientId);
      
      if (newIngredient) {
        const newCartItem: CartItem = {
          id: Date.now().toString(), // Temporary ID until refetch
          user_id: "temp",
          ingredient_id: newIngredient.id,
          quantity: 1,
          added_at: new Date().toISOString(),
          dish_id: dish.id,
          people: people,
          ingredient: newIngredient
        };
        
        updatedIngredients.push(newCartItem);
        setCurrentIngredients(updatedIngredients);
      }
      
      toast({
        title: "Ingredient added",
        description: "The ingredient has been added to your dish.",
      });
    } catch (error: any) {
      console.error('Error adding ingredient:', error);
      toast({
        variant: "destructive",
        title: "Failed to add ingredient",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredIngredients = availableIngredients.filter(ing => 
    ing.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !currentIngredients.some(current => current.ingredient_id === ing.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-olive-600">Customize Ingredients for {dish.name}</DialogTitle>
          <DialogDescription>
            Add, remove or adjust ingredients for {people} {people === 1 ? 'person' : 'people'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current ingredients section */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-olive-600">Current Ingredients</h3>
            {currentIngredients.length === 0 ? (
              <p className="text-muted-foreground">No ingredients in this dish.</p>
            ) : (
              <div className="space-y-3">
                {currentIngredients.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="font-medium">{item.ingredient?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.ingredient?.category}
                        {item.ingredient?.category && item.ingredient?.unit && " • "}
                        {item.ingredient?.unit}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                          disabled={loading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={loading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveIngredient(item.ingredient_id)}
                        disabled={loading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price calculation */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Updated Price:</span>
              <span>₹ {calculateUpdatedTotal().toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground flex gap-2 items-center">
              <AlertCircle className="h-4 w-4" /> 
              Price estimates are based on ingredient quantities and number of people.
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={onClose} disabled={loading}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
