import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sun, Cloud, CloudRain, Snowflake, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation } from '@/contexts/LocationContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface WeatherData {
  condition: string;
  temperature: number;
  location: string;
}

interface WeatherRecipe {
  condition: string;
  recipe: string;
  description: string;
  minTemp?: number;
  maxTemp?: number;
}

interface Festival {
  name: string;
  recipe: string;
  description: string;
  month: number;
  day: number;
}

const weatherRecipes: WeatherRecipe[] = [
  {
    condition: 'sunny',
    recipe: 'Watermelon Mint Salad',
    description: 'A refreshing summer treat!',
    minTemp: 25
  },
  {
    condition: 'cloudy',
    recipe: 'Warm Mushroom Soup',
    description: 'Perfect for a cozy cloudy day',
    maxTemp: 20
  },
  {
    condition: 'rainy',
    recipe: 'Hot Chocolate',
    description: 'Comfort in a cup for rainy weather'
  },
  {
    condition: 'cold',
    recipe: 'Hearty Beef Stew',
    description: 'Warm up with this winter favorite',
    maxTemp: 10
  }
];

const allFestivals: Festival[] = [
  {
    name: 'New Year',
    recipe: 'Black-Eyed Peas and Cornbread',
    description: 'Traditional New Year\'s good luck meal',
    month: 1,
    day: 1
  },
  {
    name: 'Valentine\'s Day',
    recipe: 'Chocolate Covered Strawberries',
    description: 'Sweet treats for your sweetheart',
    month: 2,
    day: 14
  },
  {
    name: 'St. Patrick\'s Day',
    recipe: 'Irish Soda Bread',
    description: 'Traditional Irish celebration bread',
    month: 3,
    day: 17
  },
  {
    name: 'Easter',
    recipe: 'Hot Cross Buns',
    description: 'Traditional spiced sweet buns!',
    month: 4,
    day: 9
  },
  {
    name: 'Earth Day',
    recipe: 'Plant-Based Buddha Bowl',
    description: 'Sustainable and healthy bowl',
    month: 4,
    day: 22
  },
  {
    name: 'Cinco de Mayo',
    recipe: 'Homemade Guacamole',
    description: 'Fresh and zesty Mexican dip',
    month: 5,
    day: 5
  },
  {
    name: 'Summer Solstice',
    recipe: 'Summer Berry Trifle',
    description: 'Light and refreshing summer dessert',
    month: 6,
    day: 21
  },
  {
    name: 'Independence Day',
    recipe: 'All-American BBQ Ribs',
    description: 'Classic Fourth of July favorite',
    month: 7,
    day: 4
  },
  {
    name: 'Summer Harvest',
    recipe: 'Garden Fresh Ratatouille',
    description: 'Celebration of summer vegetables',
    month: 8,
    day: 15
  },
  {
    name: 'Labor Day',
    recipe: 'Grilled Corn on the Cob',
    description: 'End-of-summer cookout classic',
    month: 9,
    day: 4
  },
  {
    name: 'Halloween',
    recipe: 'Pumpkin Spice Cookies',
    description: 'Spooky sweet treats',
    month: 10,
    day: 31
  },
  {
    name: 'Thanksgiving',
    recipe: 'Pumpkin Pie',
    description: 'A must-have festive dessert',
    month: 11,
    day: 23
  },
  {
    name: 'Christmas',
    recipe: 'Gingerbread Cookies',
    description: 'Classic holiday treats',
    month: 12,
    day: 25
  }
];

export function WeatherAndFestivalHighlights() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    condition: 'sunny',
    temperature: 20,
    location: 'Loading...'
  });
  const [currentFestivalIndex, setCurrentFestivalIndex] = useState(0);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const { locationPermission, coordinates, requestLocation } = useLocation();
  const [currentMonthFestivals, setCurrentMonthFestivals] = useState<Festival[]>([]);

  useEffect(() => {
    if (locationPermission === 'prompt') {
      setIsLocationDialogOpen(true);
    } else if (coordinates) {
      fetchWeatherData(coordinates.latitude, coordinates.longitude);
    }
  }, [locationPermission, coordinates]);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const festivals = allFestivals.filter(festival => festival.month === currentMonth)
      .sort((a, b) => a.day - b.day);
    setCurrentMonthFestivals(festivals);
  }, []);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      const data = await response.json();
      
      const condition = getWeatherCondition(data.current.condition.text, data.current.temp_c);
      setWeatherData({
        condition,
        temperature: Math.round(data.current.temp_c),
        location: data.location.name
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const getWeatherCondition = (apiCondition: string, temperature: number): string => {
    if (temperature < 5) return 'cold';
    const condition = apiCondition.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) return 'sunny';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    return 'sunny';
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'cold':
        return <Snowflake className="h-8 w-8 text-blue-300" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const currentWeatherRecipe = weatherRecipes.find(
    (recipe) => {
      if (recipe.minTemp && weatherData.temperature < recipe.minTemp) return false;
      if (recipe.maxTemp && weatherData.temperature > recipe.maxTemp) return false;
      return recipe.condition === weatherData.condition;
    }
  ) || weatherRecipes[0];

  const nextFestival = () => {
    setCurrentFestivalIndex((prev) => (prev + 1) % currentMonthFestivals.length);
  };

  const prevFestival = () => {
    setCurrentFestivalIndex((prev) => (prev - 1 + currentMonthFestivals.length) % currentMonthFestivals.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Weather Recipe</h2>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{weatherData.location}</span>
                <span className="ml-2 font-semibold">{weatherData.temperature}°C</span>
              </div>
            </div>
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">{currentWeatherRecipe.recipe}</h3>
            <p className="text-gray-600 dark:text-gray-300">{currentWeatherRecipe.description}</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-950 relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-200">
                {new Date().toLocaleString('default', { month: 'long' })} Festivals
              </h2>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-1" />
                {currentMonthFestivals.length > 0 ? (
                  <span>Day {currentMonthFestivals[currentFestivalIndex].day}</span>
                ) : (
                  <span>No festivals this month</span>
                )}
              </div>
            </div>
          </div>
          {currentMonthFestivals.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-xl font-medium">
                {currentMonthFestivals[currentFestivalIndex].name}
              </h3>
              <p className="font-medium text-purple-600 dark:text-purple-300">
                Featured Recipe: {currentMonthFestivals[currentFestivalIndex].recipe}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {currentMonthFestivals[currentFestivalIndex].description}
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              Check back next month for more festive recipes!
            </div>
          )}
          {currentMonthFestivals.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={prevFestival}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0"
                  onClick={nextFestival}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Access Required</DialogTitle>
            <DialogDescription>
              To provide you with weather-based recipe suggestions, we need your location. 
              Would you like to share your location?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsLocationDialogOpen(false)}>
              Not Now
            </Button>
            <Button onClick={() => {
              requestLocation();
              setIsLocationDialogOpen(false);
            }}>
              Share Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}