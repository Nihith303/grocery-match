
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChefHat, Star, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  tags: string[];
  ageGroups: string[];
}

const demoRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Rainbow Veggie Pasta',
    description: 'A colorful and nutritious pasta dish packed with vegetables',
    image: '/recipes/rainbow-pasta.jpg',
    cookingTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    tags: ['kid-friendly', 'vegetarian', 'healthy'],
    ageGroups: ['Children']
  },
  {
    id: '2',
    title: 'Protein Power Bowl',
    description: 'High-protein bowl with quinoa, chickpeas, and grilled chicken',
    image: '/recipes/protein-bowl.jpg',
    cookingTime: '25 mins',
    servings: 2,
    difficulty: 'Medium',
    rating: 4.9,
    tags: ['high-protein', 'meal-prep', 'healthy'],
    ageGroups: ['Young Adults']
  },
  {
    id: '3',
    title: 'Mediterranean Salad',
    description: 'Heart-healthy salad with fresh vegetables and olive oil dressing',
    image: '/recipes/med-salad.jpg',
    cookingTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    rating: 4.7,
    tags: ['heart-healthy', 'low-sodium', 'quick'],
    ageGroups: ['Adults']
  },
  {
    id: '4',
    title: 'Gentle Digestion Soup',
    description: 'Easy-to-digest vegetable soup with healing herbs',
    image: '/recipes/digestion-soup.jpg',
    cookingTime: '45 mins',
    servings: 6,
    difficulty: 'Easy',
    rating: 4.6,
    tags: ['easy-digest', 'low-sodium', 'healthy'],
    ageGroups: ['Older Adults']
  }
];

interface FeaturedRecipesProps {
  selectedAgeGroup?: string;
}

export function FeaturedRecipes({ selectedAgeGroup }: FeaturedRecipesProps) {
  const isMobile = useIsMobile();
  const filteredRecipes = selectedAgeGroup
    ? demoRecipes.filter(recipe => 
        recipe.ageGroups.some(group => 
          group.toLowerCase() === selectedAgeGroup.toLowerCase()
        )
      )
    : demoRecipes;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {filteredRecipes.map((recipe) => (
        <motion.div key={recipe.id} variants={item}>
          <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                {recipe.rating}
              </div>
            </div>

            <div className="p-3 md:p-4">
              <h3 className="text-base md:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {recipe.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{recipe.description}</p>

              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  {recipe.cookingTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  {recipe.servings} serv
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="h-3 w-3 md:h-4 md:w-4" />
                  {recipe.difficulty}
                </div>
              </div>

              <Button className="w-full text-sm group-hover:bg-primary/90 transition-colors">
                <Plus className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
