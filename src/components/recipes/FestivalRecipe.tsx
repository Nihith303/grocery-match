import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FestivalRecipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMonth = 'April';
  const festivals = [
    {
      name: 'Easter Celebration',
      date: 'April 9',
      description: 'Traditional Easter feast recipes',
      featured: {
        name: 'Hot Cross Buns',
        description: 'Traditional spiced sweet buns with a cross on top',
        ingredients: ['Flour', 'Mixed Spices', 'Dried Fruits', 'Milk'],
        image: '/hot-cross-buns.jpg'
      }
    },
    {
      name: 'Spring Food Festival',
      date: 'April 15-20',
      description: 'Fresh spring ingredients at their peak',
      featured: {
        name: 'Spring Asparagus Tart',
        description: 'Delicate tart with fresh asparagus and goat cheese',
        ingredients: ['Asparagus', 'Goat Cheese', 'Puff Pastry', 'Herbs'],
        image: '/asparagus-tart.jpg'
      }
    },
    {
      name: 'Earth Day Special',
      date: 'April 22',
      description: 'Sustainable and plant-based dishes',
      featured: {
        name: 'Garden Buddha Bowl',
        description: 'Nourishing bowl with seasonal vegetables',
        ingredients: ['Quinoa', 'Vegetables', 'Avocado', 'Tahini'],
        image: '/buddha-bowl.jpg'
      }
    }
  ];

  const nextFestival = () => {
    setCurrentIndex((prev) => (prev + 1) % festivals.length);
  };

  const prevFestival = () => {
    setCurrentIndex((prev) => (prev - 1 + festivals.length) % festivals.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Card className="p-6 bg-gradient-to-br from-pink-50/50 to-purple-50/50 h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#556B2F]" />
            <h2 className="text-2xl font-bold text-[#556B2F]">Festival Specials</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevFestival}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextFestival}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-semibold text-[#556B2F]">
                {festivals[currentIndex].name}
              </h3>
              <span className="text-purple-600 font-medium text-sm">
                {festivals[currentIndex].date}
              </span>
            </div>
            
            <p className="text-gray-600">
              {festivals[currentIndex].description}
            </p>

            <Card className="p-4 bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-[#556B2F]">
                  Featured: {festivals[currentIndex].featured.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {festivals[currentIndex].featured.description}
                </p>
                <div>
                  <h5 className="font-medium text-[#556B2F] text-sm">Key Ingredients:</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {festivals[currentIndex].featured.ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-[#556B2F]/10 text-[#556B2F] rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#556B2F] hover:bg-[#445624] text-white transform transition-all duration-300 hover:scale-[1.02] mt-2"
                >
                  View Recipe
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-4">
          {festivals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#556B2F] w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}