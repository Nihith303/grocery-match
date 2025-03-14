
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cuisines } from "@/data/cuisines";

export function CuisineCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cuisines.map((cuisine) => (
        <div 
          key={cuisine.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={cuisine.imageUrl || '/placeholder.svg'}
              alt={cuisine.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{cuisine.name}</h3>
            <Button asChild className="w-full">
              <Link to={`/cuisine/${cuisine.id}`}>Explore</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
