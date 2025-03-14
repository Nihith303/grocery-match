
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { dishes, cuisines } from "@/data/cuisines";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Array<{ id: string; name: string; cuisineId: string }>>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const matches: Array<{ id: string; name: string; cuisineId: string }> = [];

    // Search through all cuisines and their dishes
    Object.entries(dishes).forEach(([cuisineId, cuisineDishes]) => {
      cuisineDishes.forEach(dish => {
        if (dish.name.toLowerCase().includes(term) || 
            dish.description?.toLowerCase().includes(term)) {
          matches.push({
            id: dish.id,
            name: dish.name,
            cuisineId
          });
        }
      });
    });

    setResults(matches);
  }, [searchTerm]);

  const handleResultClick = (cuisineId: string) => {
    navigate(`/cuisine/${cuisineId}`);
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex">
        <Input
          type="text"
          placeholder="Search for your favorite dish..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="flex-grow"
        />
        <Button type="submit" className="ml-2">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          <ul className="py-1">
            {results.map((result) => {
              const cuisine = cuisines.find(c => c.id === result.cuisineId);
              return (
                <li 
                  key={result.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultClick(result.cuisineId)}
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-gray-500">{cuisine?.name}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
