
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface RecipeResultProps {
  recipe: string;
}

export function RecipeResult({ recipe }: RecipeResultProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipe);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Recipe copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Error",
        description: "Failed to copy recipe",
        variant: "destructive",
      });
    }
  };

  const shareRecipe = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this recipe!",
          text: recipe,
        });
        toast({
          title: "Shared!",
          description: "Recipe shared successfully",
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support sharing",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="my-8 animate-fade-in">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{recipe}</ReactMarkdown>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              className="flex items-center space-x-1"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              <span>{isCopied ? "Copied" : "Copy"}</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={shareRecipe}
              className="flex items-center space-x-1"
            >
              <Share size={16} />
              <span>Share</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
