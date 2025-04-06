import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, Sun, Sunset, Moon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Recipe {
  name: string;
  ingredients: string[];
}

interface MealTime {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  suggestedFor: string;
  recipes: Recipe[];
}

const mealTimes: MealTime[] = [
  {
    id: 'breakfast',
    time: '09:00',
    title: 'Start your day strong',
    description: 'Energizing breakfast options to kickstart your day',
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#E8F3FF] flex items-center justify-center">
        <Sun className="w-7 h-7 text-[#FDB813]" />
      </div>
    ),
    suggestedFor: '09:00',
    recipes: [
      {
        name: 'Colorful Fruit Parfait',
        ingredients: [
          'Greek yogurt',
          'Mixed berries',
          'Granola',
          'Honey',
          'Chia seeds'
        ]
      },
      {
        name: 'Whole Grain Pancakes',
        ingredients: [
          'Whole wheat flour',
          'Eggs',
          'Milk',
          'Maple syrup',
          'Butter'
        ]
      }
    ]
  },
  {
    id: 'lunch',
    time: '13:00',
    title: 'Lunch time boost',
    description: 'Nutritious lunch options to keep you going',
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#FFF4E6] flex items-center justify-center">
        <Sun className="w-7 h-7 text-[#FF9933]" />
      </div>
    ),
    suggestedFor: '13:00',
    recipes: [
      {
        name: 'Mediterranean Quinoa Bowl',
        ingredients: [
          'Quinoa',
          'Cherry tomatoes',
          'Cucumber',
          'Feta cheese',
          'Olive oil'
        ]
      },
      {
        name: 'Grilled Chicken Salad',
        ingredients: [
          'Chicken breast',
          'Mixed greens',
          'Avocado',
          'Red onion',
          'Balsamic dressing'
        ]
      }
    ]
  },
  {
    id: 'snack',
    time: '17:00',
    title: 'Afternoon delight',
    description: 'Healthy snacks to maintain energy levels',
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#FFF1F0] flex items-center justify-center">
        <Sunset className="w-7 h-7 text-[#FF6B6B]" />
      </div>
    ),
    suggestedFor: '17:00',
    recipes: [
      {
        name: 'Energy Bites',
        ingredients: [
          'Dates',
          'Nuts',
          'Oats',
          'Dark chocolate chips',
          'Coconut flakes'
        ]
      }
    ]
  },
  {
    id: 'dinner',
    time: '21:00',
    title: 'Evening nourishment',
    description: 'Balanced dinner options for a satisfying end to your day',
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#EBE9FF] flex items-center justify-center">
        <Moon className="w-7 h-7 text-[#6B66FF]" />
      </div>
    ),
    suggestedFor: '21:00',
    recipes: [
      {
        name: 'Baked Salmon',
        ingredients: [
          'Salmon fillet',
          'Lemon',
          'Fresh herbs',
          'Garlic',
          'Olive oil'
        ]
      }
    ]
  }
];

export const TimeBasedSuggestions = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextMeal, setNextMeal] = useState<MealTime | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateNextMeal = () => {
      const now = currentTime;
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;

      // Find the next meal time
      const next = mealTimes.find(meal => {
        const [hours, minutes] = meal.time.split(':').map(Number);
        const mealTimeInMinutes = hours * 60 + minutes;
        return mealTimeInMinutes > currentTimeInMinutes;
      }) || mealTimes[0];

      setNextMeal(next);

      // Calculate time until next meal
      const [nextHours, nextMinutes] = next.time.split(':').map(Number);
      const nextTimeInMinutes = nextHours * 60 + nextMinutes;
      let diffInMinutes = nextTimeInMinutes - currentTimeInMinutes;
      
      if (diffInMinutes < 0) {
        diffInMinutes += 24 * 60;
      }

      const hoursUntil = Math.floor(diffInMinutes / 60);
      const minutesUntil = diffInMinutes % 60;
      setTimeUntilNext(`${hoursUntil}h ${minutesUntil}m until ${next.id}`);
    };

    updateNextMeal();
  }, [currentTime]);

  const toggleRecipe = (recipeName: string) => {
    setExpandedRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeName)) {
        newSet.delete(recipeName);
      } else {
        newSet.add(recipeName);
      }
      return newSet;
    });
  };

  if (!nextMeal) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Coming up next</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-sm text-gray-500">
            {timeUntilNext}
          </span>
        </div>
      </div>

      <Card className="p-6 bg-white hover:shadow-md transition-shadow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            {nextMeal.icon}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{nextMeal.title}</h3>
              <p className="text-gray-600">{nextMeal.description}</p>
              <p className="text-sm text-gray-500 mt-1">Suggested for {nextMeal.suggestedFor}</p>
            </div>
          </div>

          <div className="space-y-4">
            {nextMeal.recipes.map((recipe) => (
              <div key={recipe.name} className="bg-gray-50 rounded-lg p-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRecipe(recipe.name)}
                >
                  <h4 className="text-lg font-medium text-gray-800">{recipe.name}</h4>
                  <Button variant="ghost" size="sm">
                    Show Ingredients <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                {expandedRecipes.has(recipe.name) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Card>
    </div>
  );
};