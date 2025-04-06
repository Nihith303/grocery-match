import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  locationPermission: 'granted' | 'denied' | 'prompt';
  coordinates: { latitude: number; longitude: number } | null;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Check if we have stored permission in localStorage
    const storedPermission = localStorage.getItem('locationPermission');
    if (storedPermission) {
      setLocationPermission(storedPermission as 'granted' | 'denied' | 'prompt');
    }

    // Check if we have stored coordinates
    const storedCoordinates = localStorage.getItem('userCoordinates');
    if (storedCoordinates) {
      setCoordinates(JSON.parse(storedCoordinates));
    }
  }, []);

  const requestLocation = async () => {
    try {
      // If permission is already granted and we have coordinates, don't request again
      if (locationPermission === 'granted' && coordinates) {
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const newCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      // Store coordinates and permission in localStorage
      localStorage.setItem('userCoordinates', JSON.stringify(newCoordinates));
      localStorage.setItem('locationPermission', 'granted');

      setCoordinates(newCoordinates);
      setLocationPermission('granted');
    } catch (error) {
      console.error('Error getting location:', error);
      localStorage.setItem('locationPermission', 'denied');
      setLocationPermission('denied');
    }
  };

  return (
    <LocationContext.Provider value={{ locationPermission, coordinates, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}