
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface RecipeFormProps {
  onSubmit: (
    ingredients: string[], 
    mealType: string, 
    dietaryPreferences: string[],
    cuisine: string,
    cookingTime: string,
    skillLevel: string
  ) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function RecipeForm({ onSubmit, isLoading, disabled = false }: RecipeFormProps) {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealType, setMealType] = useState("dinner");
  const [difficulty, setDifficulty] = useState(50); // 0-100 scale
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState("any");
  const [cookingTime, setCookingTime] = useState("30min");
  const [errors, setErrors] = useState<{ingredients?: string}>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredientInput("");
      setErrors({...errors, ingredients: undefined});
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {ingredients?: string} = {};
    
    if (ingredients.length === 0) {
      newErrors.ingredients = "Please add at least one ingredient";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Get skill level text based on difficulty
    const skillLevel = difficulty < 33 ? "Beginner" : difficulty < 66 ? "Intermediate" : "Advanced";
    
    // Form is valid, submit
    onSubmit(
      ingredients, 
      mealType, 
      dietaryPreferences, 
      cuisine, 
      cookingTime, 
      skillLevel
    );
  };

  const toggleDietaryPreference = (preference: string) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };

  const isFormDisabled = isLoading || disabled;

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 bg-white p-6 rounded-lg shadow-sm border ${disabled ? 'opacity-75' : ''}`}>
      <div className="space-y-2">
        <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
        <div className="flex">
          <Input
            id="ingredients"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addIngredient}
            placeholder="Add ingredients and press Enter"
            className="flex-1"
            disabled={isFormDisabled}
          />
          <Button 
            type="button" 
            onClick={addIngredient} 
            variant="outline" 
            className="ml-2"
            disabled={!ingredientInput.trim() || isFormDisabled}
          >
            Add
          </Button>
        </div>
        {errors.ingredients && (
          <p className="text-sm text-red-500 mt-1">{errors.ingredients}</p>
        )}
        
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {ingredients.map(ingredient => (
              <div 
                key={ingredient} 
                className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {ingredient}
                <button 
                  title="Ingredients for make my dish"
                  type="button" 
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-primary/70 hover:text-primary"
                  disabled={isFormDisabled}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select 
            value={mealType} 
            onValueChange={setMealType}
            disabled={isFormDisabled}
          >
            <SelectTrigger id="meal-type">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cuisine">Cuisine Style</Label>
          <Select 
            value={cuisine} 
            onValueChange={setCuisine}
            disabled={isFormDisabled}
          >
            <SelectTrigger id="cuisine">
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Cuisine</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="asian">Asian</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cooking-time">Maximum Cooking Time</Label>
          <Select 
            value={cookingTime} 
            onValueChange={setCookingTime}
            disabled={isFormDisabled}
          >
            <SelectTrigger id="cooking-time">
              <SelectValue placeholder="Select cooking time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15min">15 minutes</SelectItem>
              <SelectItem value="30min">30 minutes</SelectItem>
              <SelectItem value="45min">45 minutes</SelectItem>
              <SelectItem value="1hour">1 hour</SelectItem>
              <SelectItem value="2hours">2 hours or more</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Dietary Preferences</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegetarian" 
                checked={dietaryPreferences.includes("vegetarian")}
                onCheckedChange={() => toggleDietaryPreference("vegetarian")}
                disabled={isFormDisabled}
              />
              <label 
                htmlFor="vegetarian" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Vegetarian
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="vegan" 
                checked={dietaryPreferences.includes("vegan")}
                onCheckedChange={() => toggleDietaryPreference("vegan")}
                disabled={isFormDisabled}
              />
              <label 
                htmlFor="vegan" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Vegan
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gluten-free" 
                checked={dietaryPreferences.includes("gluten-free")}
                onCheckedChange={() => toggleDietaryPreference("gluten-free")}
                disabled={isFormDisabled}
              />
              <label 
                htmlFor="gluten-free" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Gluten-Free
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <span className="text-sm text-gray-500">
            {difficulty < 33 ? "Beginner" : difficulty < 66 ? "Intermediate" : "Advanced"}
          </span>
        </div>
        <Slider
          id="difficulty"
          value={[difficulty]}
          min={0}
          max={66}
          step={33}
          onValueChange={(values) => setDifficulty(values[0])}
          disabled={isFormDisabled}
          className="cursor-pointer"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={ingredients.length === 0 || isFormDisabled}
      >
        {isLoading ? "Generating..." : disabled ? "Daily Limit Reached" : "Generate Recipe"}
      </Button>
      
      {disabled && (
        <p className="text-center text-sm text-amber-600">
          You've used your daily recipe generation. Try again tomorrow!
        </p>
      )}
    </form>
  );
}
