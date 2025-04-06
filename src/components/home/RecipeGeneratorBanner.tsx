import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function RecipeGeneratorBanner() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Card className="p-6 bg-gradient-to-br from-[#556B2F]/10 to-[#FF8C42]/10 h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-[#556B2F]" />
              <h2 className="text-2xl font-bold text-[#556B2F]">Try Our New Recipe Generator</h2>
            </div>
            
            <p className="text-gray-600 text-lg">
              Got ingredients but not sure what to cook? Our AI-powered recipe generator will help you create delicious dishes with what you have on hand!
            </p>

            <div className="flex items-center gap-2 text-[#FF8C42]">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">One free recipe per day!</span>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button
              onClick={() => navigate("/make-my-dish")}
              className="w-full bg-[#556B2F] hover:bg-[#445624] text-white text-lg py-6 button-hover-effect"
            >
              Make My Dish
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
