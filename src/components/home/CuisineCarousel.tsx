
import React, { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cuisines } from "@/data/cuisines";
import { useNavigate } from "react-router-dom";

export function CuisineCarousel() {
  const nextButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextButtonRef.current) {
        nextButtonRef.current.click();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCuisineClick = (cuisineId: string) => {
    navigate(`/cuisine/${cuisineId}`);
  };

  return (
    <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
      <CarouselContent>
        {cuisines.map((cuisine) => (
          <CarouselItem key={cuisine.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card 
                className="cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleCuisineClick(cuisine.id)}
              >
                <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-md">
                  <img
                    src={cuisine.imageUrl || '/placeholder.svg'}
                    alt={cuisine.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 transition-all">
                    <h3 className="text-white text-xl font-bold">{cuisine.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
      <CarouselNext
        ref={nextButtonRef}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      />
    </Carousel>
  );
}
