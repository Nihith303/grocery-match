import { CuisineCarousel } from "@/components/home/CuisineCarousel";
import { CuisineCategories } from "@/components/home/CuisineCategories";
import { SearchBar } from "@/components/home/SearchBar";
import { RecipeGeneratorBanner } from "@/components/home/RecipeGeneratorBanner";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dish } from "@/types/database.types";
import { DishCard } from "@/components/dish/DishCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from 'react';
import { AgeFilter } from '@/components/filters/AgeFilter';
import { useAgeFilter } from '@/contexts/AgeFilterContext';
import { FeaturedRecipes } from '@/components/recipes/FeaturedRecipes';
import { FestivalRecipe } from '@/components/recipes/FestivalRecipe';
import { TimeBasedSuggestions } from '@/components/recipes/TimeBasedSuggestions';

export default function Index() {
  const [popularDishes, setPopularDishes] = useState<Dish[]>([]);
  const [loadingDishes, setLoadingDishes] = useState(true);
  const { selectedAgeGroup } = useAgeFilter();

  useEffect(() => {
    fetchPopularDishes();
  }, []);

  const fetchPopularDishes = async () => {
    setLoadingDishes(true);
    try {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .in("id", [
          "00000001-0000-0000-0000-000000000031",
          "00000001-0000-0000-0000-000000000034",
          "00000001-0000-0000-0000-000000000093",
          "00000001-0000-0000-0000-000000000070",
        ]);

      if (error) throw error;
      setPopularDishes(data || []);
    } catch (error) {
      console.error("Error fetching popular dishes:", error);
    } finally {
      setLoadingDishes(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <SearchBar />
        
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FestivalRecipe />
            <RecipeGeneratorBanner />
          </div>

          <div className="space-y-12">
            <CuisineCarousel />
            <CuisineCategories />
            <AgeFilter />
            <TimeBasedSuggestions />
            <FeaturedRecipes />
          </div>
        </div>
      </div>
    </div>
  );
}
