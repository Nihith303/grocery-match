
import { Layout } from "@/components/layout/Layout";
import { CuisineCarousel } from "@/components/home/CuisineCarousel";
import { CuisineCategories } from "@/components/home/CuisineCategories";
import { SearchBar } from "@/components/home/SearchBar";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Ingredients for Your Favorite Dishes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Search for any dish and we'll show you all the ingredients you need to make it. 
            Add everything to your cart with just one click!
          </p>
          <SearchBar />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Global Cuisines</h2>
          <CuisineCarousel />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Cuisine Categories</h2>
          <CuisineCategories />
        </section>
      </div>
    </Layout>
  );
}

export default Index;
