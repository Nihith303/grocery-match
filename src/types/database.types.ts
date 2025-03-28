export type Dish = {
  id: string;
  name: string;
  description: string | null;
  cuisine: string | null;
  image_url: string | null;
  recipe: string | null;
  created_at: string;
};

export type Ingredient = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  unit?: string;
  category?: string;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_gluten_free?: boolean;
  is_dairy_free?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type DishIngredient = {
  id: string;
  dish_id: string;
  ingredient_id: string;
  quantity: number;
  unit: string | null;
  optional: boolean;
  created_at: string;
  ingredient?: Ingredient;
};

export type CartItem = {
  id: string;
  user_id: string;
  ingredient_id: string;
  quantity: number;
  added_at: string;
  dish_id?: string;
  people?: number;
  ingredient?: Ingredient;
};

export type Favorite = {
  id: string;
  user_id: string;
  dish_id: string;
  created_at: string;
  dish?: Dish;
};

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
};
