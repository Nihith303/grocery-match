import { Layout } from "@/components/layout/Layout";
import { CuisineCarousel } from "@/components/home/CuisineCarousel";
import { CuisineCategories } from "@/components/home/CuisineCategories";
import { SearchBar } from "@/components/home/SearchBar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dish } from "@/types/database.types";
import { DishCard } from "@/components/dish/DishCard";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [popularDishes, setPopularDishes] = useState<Dish[]>([]);
  const [loadingDishes, setLoadingDishes] = useState(true);

  useEffect(() => {
    fetchPopularDishes();
  }, []);

  const fetchPopularDishes = async () => {
    setLoadingDishes(true);
    try {
      // In a real app, this would fetch dishes based on popularity metrics
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .in("id", [
          "00000001-0000-0000-0000-000000000031",
          "00000001-0000-0000-0000-000000000034",
          "00000001-0000-0000-0000-000000000093",
          "00000001-0000-0000-0000-000000000070",
        ]);

      if (error) throw error;
      setPopularDishes(data || []);
    } catch (error) {
      console.error("Error fetching popular dishes:", error);
    } finally {
      setLoadingDishes(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Ingredients for Your Favorite Dishes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Search for any dish and we'll show you all the ingredients you need
            to make it. Add everything to your cart with just one click!
          </p>
          <SearchBar />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore Global Cuisines
          </h2>
          <CuisineCarousel />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular Dishes
          </h2>
          {loadingDishes ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64">
                  <Skeleton className="w-full h-full rounded-md" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse Cuisine Categories
          </h2>
          <CuisineCategories />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
