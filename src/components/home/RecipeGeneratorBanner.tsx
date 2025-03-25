
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function RecipeGeneratorBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-16">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-primary mb-2">
            Try Our New Recipe Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Got ingredients but not sure what to cook? Our AI-powered recipe generator will help you create delicious dishes with what you have on hand!
            {!user && <span className="block mt-2 text-sm font-medium">Sign in to unlock this feature (one recipe per day).</span>}
          </p>
          <Button 
            onClick={() => navigate(user ? '/make-my-dish' : '/auth')}
            className="bg-primary hover:bg-primary/90"
          >
            {user ? 'Try Make My Dish' : 'Sign In to Try'}
          </Button>
        </div>
        <div className="flex-shrink-0">
          <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center text-6xl">
            🧪
          </div>
        </div>
      </div>
    </div>
  );
}
