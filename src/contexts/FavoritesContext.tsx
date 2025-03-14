
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { Favorite } from "@/types/database.types";
import { toast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Favorite[];
  loading: boolean;
  addToFavorites: (dishId: string) => Promise<void>;
  removeFromFavorites: (dishId: string) => Promise<void>;
  isFavorite: (dishId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          *,
          dish:dishes(*)
        `)
        .eq('user_id', user.id);
        
      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      toast({
        variant: "destructive",
        title: "Failed to load favorites",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (dishId: string) => {
    if (!user) return;
    
    try {
      // Check if already in favorites
      if (isFavorite(dishId)) {
        toast({
          title: "Already in favorites",
          description: "This dish is already in your favorites.",
        });
        return;
      }
      
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          dish_id: dishId
        });
        
      if (error) throw error;
      
      await fetchFavorites();
      toast({
        title: "Added to favorites",
        description: "Dish has been added to your favorites.",
      });
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      toast({
        variant: "destructive",
        title: "Failed to add favorite",
        description: error.message,
      });
    }
  };

  const removeFromFavorites = async (dishId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('dish_id', dishId);
        
      if (error) throw error;
      
      setFavorites(favorites.filter(fav => fav.dish_id !== dishId));
      toast({
        title: "Removed from favorites",
        description: "Dish has been removed from your favorites.",
      });
    } catch (error: any) {
      console.error('Error removing from favorites:', error);
      toast({
        variant: "destructive",
        title: "Failed to remove favorite",
        description: error.message,
      });
    }
  };

  const isFavorite = (dishId: string): boolean => {
    return favorites.some(fav => fav.dish_id === dishId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        loading, 
        addToFavorites, 
        removeFromFavorites,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
