import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Bell } from 'lucide-react';

interface MealTime {
  time: string;
  type: string;
  message: string;
}

const mealTimes: MealTime[] = [
  { time: '09:00', type: 'breakfast', message: "Time for breakfast! Start your day with energy 🌅" },
  { time: '13:00', type: 'lunch', message: "Lunch time! Keep your energy levels up 🍱" },
  { time: '17:00', type: 'snacks', message: "Snack o'clock! How about something light? 🥨" },
  { time: '21:00', type: 'dinner', message: "Dinner time! Wind down with a healthy meal 🌙" }
];

export function MealTimeNotification() {
  const { toast } = useToast();

  useEffect(() => {
    // Check time every minute
    const timer = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours().toString().padStart(2, '0');
      const currentMinute = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHour}:${currentMinute}`;

      // Find if it's time for any meal
      const meal = mealTimes.find(m => {
        // Check 15 minutes before meal time
        const [mealHour, mealMinute] = m.time.split(':').map(Number);
        const mealDate = new Date();
        mealDate.setHours(mealHour, mealMinute - 15);
        
        return currentTime === `${mealDate.getHours().toString().padStart(2, '0')}:${mealDate.getMinutes().toString().padStart(2, '0')}`;
      });

      if (meal) {
        toast({
          title: meal.type.charAt(0).toUpperCase() + meal.type.slice(1),
          description: meal.message,
          action: (
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>View Suggestions</span>
            </div>
          ),
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(timer);
  }, [toast]);

  return null; // This is a background component, no UI needed
} 