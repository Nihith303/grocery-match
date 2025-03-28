
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
import { Lock, AlertTriangle } from "lucide-react";
import { generateRecipe, RecipePromptData } from "@/services/geminiService";

export default function MakeMyDish() {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingUsage, setCheckingUsage] = useState(true);
  const [hasUsedToday, setHasUsedToday] = useState(false);
  const [timeUntilNextRecipe, setTimeUntilNextRecipe] = useState<number | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if Gemini API key is set
  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setApiKeyMissing(true);
    }
  }, []);

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

  const handleGenerateRecipe = async (
    ingredients: string[], 
    mealType: string, 
    dietaryPreferences: string[],
    cuisine: string,
    cookingTime: string,
    skillLevel: string
  ) => {
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

    if (apiKeyMissing) {
      toast({
        title: "API Key Missing",
        description: "The Gemini API key is not configured. Please contact the administrator.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRecipe(null);
    
    try {
      // Create the recipe prompt data
      const promptData: RecipePromptData = {
        ingredients,
        mealType,
        dietaryPreferences,
        cuisine,
        cookingTime,
        skillLevel
      };
      
      // Generate recipe with Gemini
      const generatedRecipe = await generateRecipe(promptData);
      setRecipe(generatedRecipe);
      
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
    } catch (error: any) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate recipe. Please try again later.",
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
        
        {apiKeyMissing && (
          <Alert className="mb-6 bg-amber-50 border border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-800" />
            <AlertTitle className="text-amber-800 font-medium">API Key Not Configured</AlertTitle>
            <AlertDescription className="text-amber-700">
              The Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable.
            </AlertDescription>
          </Alert>
        )}
        
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
            disabled={hasUsedToday || apiKeyMissing}
          />
        )}
        
        {isLoading && (
          <div className="my-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Crafting your recipe with AI...</p>
            </div>
          </div>
        )}
        
        {recipe && !isLoading && <RecipeResult recipe={recipe} />}
      </div>
    </Layout>
  );
}
