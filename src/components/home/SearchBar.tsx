
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dish } from "@/types/database.types";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length > 1) {
      searchDishes(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const searchDishes = async (query: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name', { ascending: true })
        .limit(10);
        
      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching dishes:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDishClick = (dishId: string, cuisine: string | null) => {
    setOpen(false);
    if (cuisine) {
      navigate(`/cuisine/${cuisine}?dish=${dishId}`);
    } else {
      navigate(`/dish/${dishId}`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for your favorite dish..."
              className="pr-10 py-6 text-lg"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={() => setOpen(true)}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[30rem] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search dishes..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Searching..." : "No results found."}
              </CommandEmpty>
              <CommandGroup heading="Dishes">
                {searchResults.map((dish) => (
                  <CommandItem
                    key={dish.id}
                    value={dish.name}
                    onSelect={() => handleDishClick(dish.id, dish.cuisine)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{dish.name}</span>
                      <span className="text-sm text-muted-foreground capitalize">
                        {dish.cuisine}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
