import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertCircle, ChevronUp, ChevronDown, ShoppingCart } from 'lucide-react';
import { useAgeFilter } from '@/contexts/AgeFilterContext';
import { useToast } from '@/components/ui/use-toast';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

interface TimeBasedMeal {
  time: string;
  type: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  title: string;
  prompt: string;
  recipes: {
    Children: Recipe[];
    'Young Adults': Recipe[];
    Adults: Recipe[];
    'Older Adults': Recipe[];
  };
  icon: React.ReactNode;
}

const mealSchedule: TimeBasedMeal[] = [
  {
    time: '09:00',
    type: 'breakfast',
    title: 'Start your day strong',
    prompt: 'Energizing breakfast options to kickstart your day',
    recipes: {
      Children: [
        {
          name: 'Colorful Fruit Parfait',
          ingredients: [
            { name: 'Greek Yogurt', amount: '1', unit: 'cup' },
            { name: 'Mixed Berries', amount: '1', unit: 'cup' },
            { name: 'Granola', amount: '0.5', unit: 'cup' },
            { name: 'Honey', amount: '2', unit: 'tbsp' }
          ]
        },
        {
          name: 'Whole Grain Pancakes',
          ingredients: [
            { name: 'Whole Wheat Flour', amount: '1.5', unit: 'cups' },
            { name: 'Milk', amount: '1', unit: 'cup' },
            { name: 'Eggs', amount: '2', unit: 'pcs' },
            { name: 'Maple Syrup', amount: '0.25', unit: 'cup' }
          ]
        },
        {
          name: 'Berry Smoothie Bowl',
          ingredients: [
            { name: 'Mixed Berries', amount: '2', unit: 'cups' },
            { name: 'Banana', amount: '1', unit: 'medium' },
            { name: 'Almond Milk', amount: '1', unit: 'cup' },
            { name: 'Chia Seeds', amount: '2', unit: 'tbsp' }
          ]
        }
      ],
      'Young Adults': [/* ... breakfast recipes ... */],
      Adults: [/* ... breakfast recipes ... */],
      'Older Adults': [/* ... breakfast recipes ... */]
    },
    icon: '🌅'
  },
  {
    time: '13:00',
    type: 'lunch',
    title: 'Power through your day',
    prompt: 'Nutritious lunch options to keep you energized',
    recipes: {
      Children: [
        {
          name: 'Grilled Cheese & Tomato Soup',
          ingredients: [
            { name: 'Whole Grain Bread', amount: '2', unit: 'slices' },
            { name: 'Cheddar Cheese', amount: '2', unit: 'slices' },
            { name: 'Tomato Soup', amount: '1', unit: 'cup' },
            { name: 'Butter', amount: '1', unit: 'tbsp' }
          ]
        },
        {
          name: 'Turkey & Avocado Wrap',
          ingredients: [
            { name: 'Whole Wheat Tortilla', amount: '1', unit: 'large' },
            { name: 'Turkey Slices', amount: '3', unit: 'slices' },
            { name: 'Avocado', amount: '0.5', unit: 'medium' },
            { name: 'Lettuce', amount: '1', unit: 'cup' }
          ]
        },
        {
          name: 'Rainbow Pasta Salad',
          ingredients: [
            { name: 'Whole Grain Pasta', amount: '1', unit: 'cup' },
            { name: 'Mixed Vegetables', amount: '1', unit: 'cup' },
            { name: 'Italian Dressing', amount: '2', unit: 'tbsp' },
            { name: 'Cherry Tomatoes', amount: '0.5', unit: 'cup' }
          ]
        }
      ],
      'Young Adults': [
        {
          name: 'Quinoa Buddha Bowl',
          ingredients: [
            { name: 'Quinoa', amount: '1', unit: 'cup' },
            { name: 'Chickpeas', amount: '1', unit: 'cup' },
            { name: 'Kale', amount: '2', unit: 'cups' },
            { name: 'Tahini Dressing', amount: '2', unit: 'tbsp' }
          ]
        },
        {
          name: 'Chicken Pesto Sandwich',
          ingredients: [
            { name: 'Sourdough Bread', amount: '2', unit: 'slices' },
            { name: 'Grilled Chicken', amount: '4', unit: 'oz' },
            { name: 'Pesto', amount: '2', unit: 'tbsp' },
            { name: 'Mozzarella', amount: '2', unit: 'slices' }
          ]
        },
        {
          name: 'Asian Noodle Bowl',
          ingredients: [
            { name: 'Rice Noodles', amount: '2', unit: 'cups' },
            { name: 'Mixed Vegetables', amount: '1', unit: 'cup' },
            { name: 'Tofu', amount: '4', unit: 'oz' },
            { name: 'Soy Sauce', amount: '2', unit: 'tbsp' }
          ]
        }
      ],
      Adults: [/* ... lunch recipes ... */],
      'Older Adults': [/* ... lunch recipes ... */]
    },
    icon: '🍽️'
  },
  {
    time: '16:00',
    type: 'snacks',
    title: 'Afternoon Energy Boost',
    prompt: 'Healthy snacks to keep you going',
    recipes: {
      Children: [
        {
          name: 'Apple & Peanut Butter',
          ingredients: [
            { name: 'Apple', amount: '1', unit: 'medium' },
            { name: 'Peanut Butter', amount: '2', unit: 'tbsp' }
          ]
        },
        {
          name: 'Trail Mix',
          ingredients: [
            { name: 'Mixed Nuts', amount: '0.25', unit: 'cup' },
            { name: 'Dried Fruit', amount: '0.25', unit: 'cup' },
            { name: 'Dark Chocolate Chips', amount: '2', unit: 'tbsp' }
          ]
        },
        {
          name: 'Veggie Sticks & Hummus',
          ingredients: [
            { name: 'Carrot Sticks', amount: '0.5', unit: 'cup' },
            { name: 'Celery Sticks', amount: '0.5', unit: 'cup' },
            { name: 'Hummus', amount: '0.25', unit: 'cup' }
          ]
        }
      ],
      'Young Adults': [/* ... snack recipes ... */],
      Adults: [/* ... snack recipes ... */],
      'Older Adults': [/* ... snack recipes ... */]
    },
    icon: '🥨'
  },
  {
    time: '20:00',
    type: 'dinner',
    title: 'Evening Satisfaction',
    prompt: 'Delicious dinner options to end your day',
    recipes: {
      Children: [
        {
          name: 'Mini Pizza',
          ingredients: [
            { name: 'Pizza Base', amount: '1', unit: 'small' },
            { name: 'Tomato Sauce', amount: '0.25', unit: 'cup' },
            { name: 'Mozzarella', amount: '0.5', unit: 'cup' },
            { name: 'Mixed Vegetables', amount: '0.5', unit: 'cup' }
          ]
        },
        {
          name: 'Spaghetti & Meatballs',
          ingredients: [
            { name: 'Whole Grain Spaghetti', amount: '1', unit: 'cup' },
            { name: 'Turkey Meatballs', amount: '4', unit: 'pieces' },
            { name: 'Marinara Sauce', amount: '0.5', unit: 'cup' },
            { name: 'Parmesan', amount: '2', unit: 'tbsp' }
          ]
        },
        {
          name: 'Fish Fingers & Sweet Potato Wedges',
          ingredients: [
            { name: 'Fish Fingers', amount: '3', unit: 'pieces' },
            { name: 'Sweet Potato', amount: '1', unit: 'medium' },
            { name: 'Mixed Vegetables', amount: '1', unit: 'cup' },
            { name: 'Olive Oil', amount: '1', unit: 'tbsp' }
          ]
        }
      ],
      'Young Adults': [/* ... dinner recipes ... */],
      Adults: [/* ... dinner recipes ... */],
      'Older Adults': [/* ... dinner recipes ... */]
    },
    icon: '🍽️'
  }
];

export function TimeBasedRecipes() {
  const { selectedAgeGroup } = useAgeFilter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextMeal, setNextMeal] = useState<TimeBasedMeal | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Find the next meal time
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinutes;

      // Define meal times in minutes for easier comparison
      const mealTimes = [
        { time: 9 * 60, meal: mealSchedule[0] },  // Breakfast at 9:00
        { time: 13 * 60, meal: mealSchedule[1] }, // Lunch at 13:00
        { time: 16 * 60, meal: mealSchedule[2] }, // Snacks at 16:00
        { time: 20 * 60, meal: mealSchedule[3] }  // Dinner at 20:00
      ];

      // Find the next meal
      let nextMealTime;
      if (currentTimeInMinutes < mealTimes[0].time) {
        // Before first meal of the day
        nextMealTime = mealTimes[0].meal;
      } else if (currentTimeInMinutes >= mealTimes[mealTimes.length - 1].time) {
        // After last meal of the day, show next day's breakfast
        nextMealTime = mealTimes[0].meal;
      } else {
        // Find the next meal time
        const nextMeal = mealTimes.find(mt => mt.time > currentTimeInMinutes);
        nextMealTime = nextMeal ? nextMeal.meal : mealTimes[0].meal;
      }

      setNextMeal(nextMealTime);

      // Calculate time until next meal
      const [nextHours, nextMinutes] = nextMealTime.time.split(':').map(Number);
      const nextTimeInMinutes = nextHours * 60 + nextMinutes;
      let minutesUntilNext = nextTimeInMinutes - currentTimeInMinutes;
      
      if (minutesUntilNext < 0) {
        minutesUntilNext += 24 * 60; // Add 24 hours if next meal is tomorrow
      }

      const hoursUntilNext = Math.floor(minutesUntilNext / 60);
      const remainingMinutes = minutesUntilNext % 60;
      
      setTimeUntilNext(`${hoursUntilNext}h ${remainingMinutes}m until ${nextMealTime.type}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const toggleRecipe = (recipeName: string) => {
    const newExpanded = new Set(expandedRecipes);
    if (newExpanded.has(recipeName)) {
      newExpanded.delete(recipeName);
    } else {
      newExpanded.add(recipeName);
    }
    setExpandedRecipes(newExpanded);
  };

  const handleAddToCart = (recipe: Recipe) => {
    // Add the recipe ingredients to cart
    toast({
      title: "Added to Cart",
      description: `${recipe.name} ingredients have been added to your cart.`,
      duration: 3000,
    });
  };

  if (!nextMeal) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Coming up next
        </h2>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {timeUntilNext}
          </div>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{nextMeal.icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{nextMeal.title}</h3>
            <p className="text-sm text-gray-600">{nextMeal.prompt}</p>
            <p className="text-sm font-medium text-primary mt-1">
              Suggested for {nextMeal.time}
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {selectedAgeGroup ? (
            nextMeal.recipes[selectedAgeGroup as keyof typeof nextMeal.recipes].map((recipe) => (
              <motion.div key={recipe.name} variants={item}>
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{recipe.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRecipe(recipe.name)}
                        className="flex items-center gap-2"
                      >
                        {expandedRecipes.has(recipe.name) ? (
                          <>Hide Ingredients <ChevronUp className="h-4 w-4" /></>
                        ) : (
                          <>Show Ingredients <ChevronDown className="h-4 w-4" /></>
                        )}
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
                        <h4 className="font-medium text-sm mb-2">Ingredients:</h4>
                        <ul className="space-y-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              {ingredient.name} ({ingredient.amount} {ingredient.unit})
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleAddToCart(recipe)}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-4">
              Select an age group to see personalized meal suggestions
            </p>
          )}
        </motion.div>
      </Card>
    </div>
  );
}