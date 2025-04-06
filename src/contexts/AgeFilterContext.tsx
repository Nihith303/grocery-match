import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AgeFilterContextType {
  selectedAgeGroup: string | null;
  setSelectedAgeGroup: (ageGroup: string | null) => void;
  getFilteredRecipes: (recipes: any[]) => any[];
}

const AgeFilterContext = createContext<AgeFilterContextType | undefined>(undefined);

export function AgeFilterProvider({ children }: { children: ReactNode }) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);

  const getFilteredRecipes = (recipes: any[]) => {
    if (!selectedAgeGroup) return recipes;

    // This is a placeholder for actual recipe filtering logic
    // You would need to implement the actual filtering based on your recipe data structure
    return recipes.filter(recipe => {
      switch (selectedAgeGroup) {
        case 'children':
          return recipe.tags?.includes('kid-friendly') || 
                 recipe.tags?.includes('nut-free') ||
                 recipe.tags?.includes('school-lunch');
        case 'young-adults':
          return recipe.tags?.includes('quick-meal') || 
                 recipe.tags?.includes('budget-friendly') ||
                 recipe.tags?.includes('high-protein');
        case 'adults':
          return recipe.tags?.includes('family-meal') || 
                 recipe.tags?.includes('meal-prep') ||
                 recipe.tags?.includes('balanced');
        case 'older-adults':
          return recipe.tags?.includes('low-sodium') || 
                 recipe.tags?.includes('high-fiber') ||
                 recipe.tags?.includes('diabetic-friendly');
        default:
          return true;
      }
    });
  };

  return (
    <AgeFilterContext.Provider
      value={{
        selectedAgeGroup,
        setSelectedAgeGroup,
        getFilteredRecipes,
      }}
    >
      {children}
    </AgeFilterContext.Provider>
  );
}

export function useAgeFilter() {
  const context = useContext(AgeFilterContext);
  if (context === undefined) {
    throw new Error('useAgeFilter must be used within an AgeFilterProvider');
  }
  return context;
}
