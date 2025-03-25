
import React, { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipe/RecipeForm";
import { RecipeResult } from "@/components/recipe/RecipeResult";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function MakeMyDish() {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingUsage, setCheckingUsage] = useState(true);
  const [hasUsedToday, setHasUsedToday] = useState(false);
  const [timeUntilNextRecipe, setTimeUntilNextRecipe] = useState<number | null>(null);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated and has used the feature today
  useEffect(() => {
    if (loading) return;

    if (!user) {
      setCheckingUsage(false);
      return;
    }

    const checkDailyUsage = async () => {
      try {
        setCheckingUsage(true);
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        
        const { data, error } = await supabase
          .from('recipe_generation_usage')
          .select('*')
          .eq('user_id', user.id)
          .eq('usage_date', today);
          
        if (error) throw error;
        
        const hasUsed = data && data.length > 0;
        setHasUsedToday(hasUsed);
        
        if (hasUsed) {
          calculateTimeUntilMidnight();
        }
      } catch (error) {
        console.error("Error checking usage:", error);
        toast({
          title: "Error",
          description: "Failed to check usage limit. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setCheckingUsage(false);
      }
    };

    checkDailyUsage();
  }, [user, loading, toast]);

  // Calculate time until midnight for countdown
  const calculateTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    
    const timeDiff = midnight.getTime() - now.getTime();
    const minutesRemaining = Math.ceil(timeDiff / (1000 * 60));
    setTimeUntilNextRecipe(minutesRemaining);
    
    // Set up interval to update countdown
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      calculateTimeUntilMidnight();
    }, 60000); // Update every minute
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleGenerateRecipe = async (ingredients: string[], mealType: string, dietaryPreferences: string[]) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use this feature.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (hasUsedToday) {
      toast({
        title: "Daily Limit Reached",
        description: `You've already used this feature today. Try again tomorrow.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecipe(null);
    
    try {
      // In a real app, this would be an API call to a proxy server that calls Google Gemini
      // For now, we'll simulate the API call with a timeout
      
      const dietaryString = dietaryPreferences.length > 0 
        ? ` that is ${dietaryPreferences.join(", ")}` 
        : "";
      
      const prompt = `Generate a detailed recipe for ${mealType} using ${ingredients.join(", ")} that serves 2-4 people${dietaryString}. Include preparation time, cooking instructions in numbered steps, and optional substitute suggestions. Format in markdown with clear sections.`;
      
      // Mock API call with timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response
      const mockRecipe = `# ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Recipe with ${ingredients[0]} and ${ingredients.length > 1 ? ingredients[1] : "other ingredients"}

## Ingredients
${ingredients.map(ingredient => `- ${ingredient}`).join('\n')}

## Preparation Time
30 minutes

## Cooking Time
45 minutes

## Instructions
1. Prepare all the ingredients by washing and chopping as needed.
2. Heat a large pan over medium heat.
3. Add the first few ingredients and sauté for 5 minutes.
4. Add remaining ingredients and cook for another 10-15 minutes.
5. Serve hot and enjoy!

## Substitutions
- If you don't have ${ingredients[0]}, you can substitute with similar ingredients.
- For a spicier version, add some chili flakes.

## Nutrition Information (Estimated)
- Calories: 350-450 per serving
- Protein: 15-20g
- Carbs: 30-40g
- Fat: 15-20g

Enjoy your meal!`;
      
      setRecipe(mockRecipe);
      
      // Record usage in Supabase
      await supabase
        .from('recipe_generation_usage')
        .insert([{ 
          user_id: user.id, 
          usage_date: new Date().toISOString().split('T')[0] // Today's date
        }]);
      
      setHasUsedToday(true);
      calculateTimeUntilMidnight();
      
      toast({
        title: "Recipe Generated!",
        description: "Enjoy your custom recipe. You can generate another one tomorrow.",
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not logged in, show auth requirement
  if (!loading && !user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Alert className="mb-8 bg-primary/5 border-primary/20">
            <Lock className="h-5 w-5 text-primary" />
            <AlertTitle className="text-xl font-bold mb-2">Authentication Required</AlertTitle>
            <AlertDescription className="text-gray-600 mb-4">
              This feature is available only for logged in users. Please sign in to create custom recipes.
            </AlertDescription>
            <Button onClick={() => navigate("/auth")} className="mt-2">
              Sign In
            </Button>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Make My Dish</h1>
          <p className="text-gray-600">
            Enter ingredients you have on hand, and we'll generate a delicious recipe for you!
          </p>
        </div>
        
        {!loading && hasUsedToday && timeUntilNextRecipe !== null && (
          <Alert className="mb-6 bg-amber-50 border border-amber-200">
            <AlertTitle className="text-amber-800 font-medium">Daily Limit Reached</AlertTitle>
            <AlertDescription className="text-amber-700">
              You've already used this feature today. Next recipe available in: {Math.floor(timeUntilNextRecipe / 60)} hours and {timeUntilNextRecipe % 60} minutes.
            </AlertDescription>
          </Alert>
        )}
        
        {checkingUsage ? (
          <div className="my-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Checking your usage...</p>
            </div>
          </div>
        ) : (
          <RecipeForm 
            onSubmit={handleGenerateRecipe} 
            isLoading={isLoading} 
            disabled={hasUsedToday}
          />
        )}
        
        {isLoading && (
          <div className="my-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Crafting your recipe...</p>
            </div>
          </div>
        )}
        
        {recipe && !isLoading && <RecipeResult recipe={recipe} />}
      </div>
    </Layout>
  );
}
