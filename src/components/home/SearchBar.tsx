import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
import { motion } from "framer-motion";

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
    setSearchValue("");
    if (cuisine) {
      navigate(`/cuisine/${cuisine}?dish=${dishId}`);
    } else {
      navigate(`/dish/${dishId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto text-center space-y-6 mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold main-heading">
        Find Ingredients for Your Favorite Dishes
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
        Search for any dish and we'll show you all the ingredients you need to make it. Add everything to your cart with just one click!
      </p>
      
      <div className="relative max-w-2xl mx-auto">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for your favorite dish..."
                className="w-full pl-12 pr-4 py-6 text-lg rounded-full border-2 border-[#556B2F]/20 focus:border-[#556B2F] transition-colors"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={() => setOpen(true)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
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
    </motion.div>
  );
}
