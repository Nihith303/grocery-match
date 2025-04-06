import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Sun } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

interface WeatherRecipeProps {
  className?: string;
}

export function WeatherRecipe({ className }: WeatherRecipeProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { locationPermission, coordinates, requestLocation } = useLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        // If we don't have permission or coordinates, request them
        if (locationPermission === 'prompt' || (!coordinates && locationPermission === 'granted')) {
          await requestLocation();
          return; // The effect will run again when coordinates are updated
        }

        // If permission was denied, show default weather
        if (locationPermission === 'denied' || !coordinates) {
          setWeather({
            temperature: 20,
            condition: 'Clear',
            location: 'Loading...'
          });
          setLoading(false);
          return;
        }

        // Your Weather API Key
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        
        // Fetch weather data from your weather API
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coordinates.latitude},${coordinates.longitude}&aqi=no`
        );
        
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          location: data.location.name
        });
        
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Set default weather data in case of error
        setWeather({
          temperature: 20,
          condition: 'Clear',
          location: 'Loading...'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather data every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [locationPermission, coordinates, requestLocation]);

  const getWeatherBasedRecipe = (temperature: number) => {
    if (temperature > 25) {
      return {
        name: "Watermelon Mint Salad",
        description: "A refreshing summer treat!"
      };
    } else if (temperature > 15) {
      return {
        name: "Mediterranean Quinoa Bowl",
        description: "Perfect for mild weather!"
      };
    } else {
      return {
        name: "Hearty Vegetable Soup",
        description: "Warm up with this comforting dish!"
      };
    }
  };

  if (!weather) {
    return (
      <Card className={`p-6 ${className} bg-[#F1F5FF]`}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Weather Recipe</h2>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span>Loading...</span>
        </div>
      </Card>
    );
  }

  const recipe = getWeatherBasedRecipe(weather.temperature);

  return (
    <Card className={`p-6 ${className} bg-[#F1F5FF]`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Weather Recipe</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">{weather.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="h-6 w-6 text-yellow-500" />
          <span className="text-lg font-medium">{weather.temperature}°C</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
        <p className="text-gray-600 mt-1">{recipe.description}</p>
      </div>
    </Card>
  );
}