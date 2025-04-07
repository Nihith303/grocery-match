
import React from 'react';
import { Apple, GraduationCap, Users, Heart, ChevronDown, X } from 'lucide-react';
import { useAgeFilter } from '@/contexts/AgeFilterContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgeGroup {
  id: string;
  title: string;
  range: string;
  icon: React.ReactNode;
  nutritionalFocus: string[];
  recipeSuggestions: string[];
  healthBenefits: string[];
}

const ageGroups: AgeGroup[] = [
  {
    id: "Children",
    title: "Children",
    range: "1-14 years",
    icon: <Apple className="w-6 h-6 text-emerald-500" />,
    nutritionalFocus: [
      "Balanced nutrients for growth",
      "Essential vitamins and minerals",
      "Healthy brain development",
      "Strong bone formation",
      "Energy for activities"
    ],
    recipeSuggestions: [
      "Rainbow Veggie Pasta",
      "Fun Fruit Smoothies",
      "Baked Chicken Tenders",
      "Whole Grain Mini Pizzas",
      "Yogurt Parfait"
    ],
    healthBenefits: [
      "Supports growth and development",
      "Boosts immune system",
      "Enhances cognitive function",
      "Promotes healthy habits"
    ]
  },
  {
    id: "Young Adults",
    title: "Young Adults",
    range: "15-30 years",
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    nutritionalFocus: [
      "High protein for muscle maintenance",
      "Complex carbohydrates",
      "Healthy fats",
      "Iron-rich foods",
      "Calcium sources"
    ],
    recipeSuggestions: [
      "Protein Power Bowl",
      "Energy Boost Smoothie",
      "Quick Quinoa Stir-fry",
      "Greek Yogurt Parfait",
      "Avocado Toast"
    ],
    healthBenefits: [
      "Maintains energy levels",
      "Supports active lifestyle",
      "Promotes mental clarity",
      "Builds strong muscles"
    ]
  },
  {
    id: "Adults",
    title: "Adults",
    range: "30-45 years",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    nutritionalFocus: [
      "Balanced macronutrients",
      "Antioxidant-rich foods",
      "Fiber-rich options",
      "Heart-healthy choices",
      "Stress-reducing nutrients"
    ],
    recipeSuggestions: [
      "Mediterranean Salad",
      "Grilled Fish Tacos",
      "Buddha Bowl",
      "Green Smoothie",
      "Quinoa Power Bowl"
    ],
    healthBenefits: [
      "Maintains metabolism",
      "Supports heart health",
      "Reduces stress",
      "Boosts immunity"
    ]
  },
  {
    id: "Older Adults",
    title: "Older Adults",
    range: "45-60 years",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    nutritionalFocus: [
      "Low sodium, heart-healthy options",
      "High fiber for digestive health",
      "Joint & bone supporting nutrients",
      "Easy-to-digest proteins",
      "Anti-aging antioxidants"
    ],
    recipeSuggestions: [
      "Heart-Healthy Salmon Bowl",
      "Gentle Digestion Soup",
      "Low-Sodium Stir-Fry",
      "Calcium-Rich Smoothie",
      "Anti-Inflammatory Meals"
    ],
    healthBenefits: [
      "Supports heart health",
      "Promotes bone strength",
      "Aids digestive health",
      "Maintains muscle mass"
    ]
  }
];

export const AgeFilter = () => {
  const { selectedAgeGroup, setSelectedAgeGroup } = useAgeFilter();
  const isMobile = useIsMobile();

  const clearFilter = () => {
    setSelectedAgeGroup(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
          Filter by Age Group
        </h2>
        {selectedAgeGroup && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
            Clear Filter
          </Button>
        )}
      </div>
      
      {/* Mobile and desktop responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedAgeGroup(group.id)}
            className={`p-3 md:p-4 rounded-lg flex flex-col md:flex-row items-center md:items-center gap-2 transition-all relative group ${
              selectedAgeGroup === group.id
                ? 'ring-2 ring-green-500 bg-green-50'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className={`rounded-full p-2 ${
              group.id === 'Children' ? 'bg-emerald-100' :
              group.id === 'Young Adults' ? 'bg-blue-100' :
              group.id === 'Adults' ? 'bg-purple-100' :
              'bg-pink-100'
            }`}>
              {group.icon}
            </div>
            <div className="text-center md:text-left">
              <div className="font-semibold text-sm md:text-base text-gray-900">{group.title}</div>
              <div className="text-xs md:text-sm text-gray-500">{group.range}</div>
            </div>
            <ChevronDown className={`hidden md:block w-4 h-4 ml-auto transition-transform ${
              selectedAgeGroup === group.id ? 'rotate-180' : ''
            }`} />
          </button>
        ))}
      </div>

      {selectedAgeGroup && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          {ageGroups.map((group) => group.id === selectedAgeGroup && (
            <div key={group.id} className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  Nutritional Focus
                </h3>
                <ul className="list-disc pl-5 text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.nutritionalFocus.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recipe Suggestions
                </h3>
                <ul className="list-disc pl-5 text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.recipeSuggestions.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Health Benefits
                </h3>
                <ul className="list-disc pl-5 text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {group.healthBenefits.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
