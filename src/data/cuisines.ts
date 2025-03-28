export interface Cuisine {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  youtubeVideoId?: string;
  recipeUrl?: string;
}

export const cuisines: Cuisine[] = [
  {
    id: "italian",
    name: "Italian Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Traditional dishes from Italy, known for pasta, pizza, and rich flavors.",
  },
  {
    id: "japanese",
    name: "Japanese Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW5lc2UlMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description:
      "Japanese culinary traditions, featuring sushi, ramen, and seasonal ingredients.",
  },
  {
    id: "mexican",
    name: "Mexican Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWV4aWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Vibrant Mexican dishes with bold flavors, featuring tacos, enchiladas, and mole.",
  },
  {
    id: "indian",
    name: "Indian Cuisine",
    imageUrl:
      "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg",
    description:
      "Aromatic Indian dishes with complex spice blends, featuring curries and tandoori specialties.",
  },
  {
    id: "french",
    name: "French Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Refined French culinary arts, known for sophisticated techniques and rich flavors.",
  },
  {
    id: "thai",
    name: "Thai Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGhhaSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Thai dishes balancing sweet, sour, salty, and spicy flavors, featuring pad thai and curries.",
  },
  {
    id: "chinese",
    name: "Chinese Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Diverse Chinese dishes with regional specialties, featuring dim sum and stir-fries.",
  },
  {
    id: "greek",
    name: "Greek Cuisine",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/09/06/14/23/authentic-greek-1649223_1280.jpg",
    description:
      "Mediterranean Greek food featuring olive oil, fresh vegetables, and seafood.",
  },
  {
    id: "korean",
    name: "Korean Cuisine",
    imageUrl:
      "https://images.unsplash.com/photo-1617692855027-33b14f061079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      "Flavorful Korean dishes featuring kimchi, barbecue, and fermented ingredients.",
  },
  {
    id: "lebanese",
    name: "Lebanese Cuisine",
    imageUrl:
      "https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg",
    description:
      "Lebanese culinary traditions with mezze dishes, hummus, and fresh ingredients.",
  },
];

export const dishes = {
  italian: [
    {
      id: "00000001-0000-0000-0000-000000000001",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      youtubeVideoId: "1-SJGQ2HLp8",
      recipeUrl: "https://www.vegrecipesofindia.com/margherita-pizza-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000002",
      name: "Spaghetti Carbonara",
      description: "Pasta with eggs, cheese, pancetta, and pepper",
      youtubeVideoId: "D_2DBLAt57c",
      recipeUrl: "https://anitalianinmykitchen.com/spaghetti-carbonara/",
    },
    {
      id: "00000001-0000-0000-0000-000000000003",
      name: "Lasagna",
      description: "Layered pasta with meat sauce, béchamel, and cheese",
      youtubeVideoId: "XjozbaVFTS4",
      recipeUrl: "https://www.simplyrecipes.com/recipes/lasagna/",
    },
    {
      id: "00000001-0000-0000-0000-000000000004",
      name: "Risotto alla Milanese",
      description: "Creamy rice dish with saffron and parmesan",
      youtubeVideoId: "AHxjvgEsTFk",
      recipeUrl: "https://thisitaliankitchen.com/risotto-alla-milanese/",
    },
    {
      id: "00000001-0000-0000-0000-000000000005",
      name: "Gnocchi",
      description: "Soft dough dumplings made from potatoes",
      youtubeVideoId: "9YzEsPuQ5Gc",
      recipeUrl: "https://anitalianinmykitchen.com/gnocchi/",
    },
    {
      id: "00000001-0000-0000-0000-000000000006",
      name: "Tiramisu",
      description: "Coffee-flavored dessert with mascarpone and cocoa",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000007",
      name: "Focaccia",
      description: "Oven-baked flatbread with olive oil and herbs",
      youtubeVideoId: "-DmVedGWAnU",
      recipeUrl: "https://www.loveandlemons.com/focaccia/",
    },
    {
      id: "00000001-0000-0000-0000-000000000008",
      name: "Caprese Salad",
      description: "Simple salad with tomatoes, mozzarella, and basil",
      youtubeVideoId: "ta62syygWO8",
      recipeUrl: "https://www.loveandlemons.com/caprese-salad/",
    },
    {
      id: "00000001-0000-0000-0000-000000000009",
      name: "Ossobuco",
      description: "Braised veal shanks with vegetables and broth",
      youtubeVideoId: "f1ydTuESo7g",
      recipeUrl: "https://www.simplyrecipes.com/recipes/osso_buco/",
    },
    {
      id: "00000001-0000-0000-0000-000000000010",
      name: "Panettone",
      description: "Sweet bread loaf enjoyed during holidays",
      youtubeVideoId: "Vdl1xudUdzo",
      recipeUrl: "https://www.simplyrecipes.com/recipes/panettone/",
    },
  ],
  japanese: [
    {
      id: "00000001-0000-0000-0000-000000000011",
      name: "Sushi",
      description: "Vinegared rice with various toppings or fillings",
      youtubeVideoId: "nIoOv6lWYnk",
      recipeUrl: "https://chefling.in/blogs/recipes/how-to-make-sushi-at-home-a-step-by-step-guide?srsltid=AfmBOoq1wyvW-TNMXY1GHZy7YbueionpBlvdSwTcvHcNb-0ulHz_s16W",
    },
    {
      id: "00000001-0000-0000-0000-000000000012",
      name: "Sashimi",
      description: "Thinly sliced raw fish or meat",
      youtubeVideoId: "6xy8bc5BG9k",
      recipeUrl: "https://cookwithdana.com/how-to-make-salmon-sashimi/",
    },
    {
      id: "00000001-0000-0000-0000-000000000013",
      name: "Ramen",
      description: "Noodle soup with meat, vegetables, and broth",
      youtubeVideoId: "r3_tcQiyGG8",
      recipeUrl: "https://pinchofyum.com/quick-homemade-ramen",
    },
    {
      id: "00000001-0000-0000-0000-000000000014",
      name: "Tempura",
      description: "Battered and deep-fried seafood or vegetables",
      youtubeVideoId: "q3Uspw2Yll4",
      recipeUrl: "https://www.justonecookbook.com/vegetable-tempura/",
    },
    {
      id: "00000001-0000-0000-0000-000000000015",
      name: "Okonomiyaki",
      description: "Savory pancake with various ingredients",
      youtubeVideoId: "S3TG5eLB-rw",
      recipeUrl: "https://www.loveandlemons.com/okonomiyaki/",
    },
    {
      id: "00000001-0000-0000-0000-000000000016",
      name: "Takoyaki",
      description: "Ball-shaped snack filled with octopus",
      youtubeVideoId: "eK6YSiQaz4w",
      recipeUrl: "https://iamafoodblog.com/takoyaki-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000017",
      name: "Udon",
      description: "Thick wheat flour noodles in broth",
      youtubeVideoId: "ZupVqKSOZN8",
      recipeUrl: "https://www.justonecookbook.com/udon-noodles/",
    },
    {
      id: "00000001-0000-0000-0000-000000000018",
      name: "Miso Soup",
      description: "Traditional soup with dashi stock and miso paste",
      youtubeVideoId: "hJ5-UmLCdvs",
      recipeUrl: "https://minimalistbaker.com/15-minute-miso-soup-with-greens-and-tofu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000019",
      name: "Tonkatsu",
      description: "Breaded, deep-fried pork cutlet",
      youtubeVideoId: "yWraluf_Gfs",
      recipeUrl: "https://www.justonecookbook.com/tonkatsu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000020",
      name: "Mochi",
      description: "Sweet rice cake made of mochigome rice",
      youtubeVideoId: "EmwGaqjMJkM&t=30s",
      recipeUrl: "https://tastesbetterfromscratch.com/mochi-ice-cream/",
    },
  ],
  mexican: [
    {
      id: "00000001-0000-0000-0000-000000000021",
      name: "Tacos al Pastor",
      description: "Marinated pork tacos with pineapple",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000022",
      name: "Enchiladas",
      description: "Corn tortillas rolled around fillings and covered with sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000023",
      name: "Chiles Rellenos",
      description: "Stuffed and fried poblano peppers",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000024",
      name: "Guacamole",
      description: "Avocado-based dip with lime and herbs",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000025",
      name: "Quesadillas",
      description: "Tortillas filled with cheese and other ingredients",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000026",
      name: "Tamales",
      description: "Corn-based dough filled with meats or fruits",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000027",
      name: "Pozole",
      description: "Traditional soup with hominy and meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000028",
      name: "Mole Poblano",
      description: "Rich sauce with chocolate and chili peppers",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000029",
      name: "Sopa de Lima",
      description: "Lime soup with chicken and tortilla strips",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000030",
      name: "Flan Mexicano",
      description: "Creamy caramel custard dessert",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  indian: [
    {
      id: "00000001-0000-0000-0000-000000000031",
      name: "Chicken Biryani",
      description:
        "Aromatic rice dish cooked with spices and marinated chicken",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000032",
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000033",
      name: "Chicken Curry",
      description:
        "Traditional curry with chicken, spices, and a flavorful gravy",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000034",
      name: "Paneer Butter Masala",
      description: "Rich and creamy curry made with paneer and butter",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000035",
      name: "Rogan Josh",
      description: "Spicy lamb curry from Kashmir with a red chili base",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000036",
      name: "Chole Bhature",
      description: "Spiced chickpeas served with deep-fried bread",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000037",
      name: "Palak Paneer",
      description: "Cottage cheese cooked in a spinach-based gravy",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000038",
      name: "Tandoori Chicken",
      description:
        "Chicken marinated in yogurt and spices, cooked in a tandoor",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000039",
      name: "Gulab Jamun",
      description: "Deep-fried milk solids soaked in sugar syrup",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000040",
      name: "Jalebi",
      description: "Deep-fried sweet soaked in saffron-flavored sugar syrup",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  french: [
    {
      id: "00000001-0000-0000-0000-000000000041",
      name: "Croissants",
      description: "Buttery, flaky pastry perfect for breakfast",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000042",
      name: "Baguette",
      description: "Long, thin loaf of French bread with a crispy crust",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000043",
      name: "Ratatouille",
      description:
        "Stewed vegetable dish made with eggplant, zucchini, and peppers",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000044",
      name: "Coq au Vin",
      description: "Chicken braised in red wine with mushrooms and onions",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000045",
      name: "Bouillabaisse",
      description: "Traditional Provençal fish stew with saffron and herbs",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000046",
      name: "Quiche Lorraine",
      description: "Savory pie with bacon, cheese, and custard filling",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000047",
      name: "Crêpes Suzette",
      description: "Thin pancakes flambéed with orange liqueur sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000048",
      name: "Escargots de Bourgogne",
      description: "Snails baked with garlic butter and parsley",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000049",
      name: "Duck Confit",
      description: "Slow-cooked duck leg preserved in its own fat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000050",
      name: "Crème Brûlée",
      description: "Rich custard topped with a layer of caramelized sugar",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  thai: [
    {
      id: "00000001-0000-0000-0000-000000000051",
      name: "Pad Thai",
      description:
        "Stir-fried rice noodles with eggs, tofu, shrimp, and peanuts",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000052",
      name: "Green Curry (Gaeng Keow Wan)",
      description:
        "Spicy Thai curry with green chilies, coconut milk, and meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000053",
      name: "Tom Yum Goong",
      description: "Spicy and sour shrimp soup with lemongrass and lime",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000054",
      name: "Som Tum",
      description: "Spicy green papaya salad with chili, lime, and peanuts",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000055",
      name: "Massaman Curry",
      description: "Mild Thai curry with meat, potatoes, and peanuts",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000056",
      name: "Pad Krapow Moo Saap",
      description: "Stir-fried minced pork with basil and chili",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000057",
      name: "Khao Pad",
      description: "Thai-style fried rice with vegetables and meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000058",
      name: "Satay",
      description: "Grilled meat skewers served with peanut sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000059",
      name: "Mango Sticky Rice",
      description: "Sweet sticky rice served with ripe mango and coconut milk",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000060",
      name: "Larb",
      description: "Spicy minced meat salad with herbs and lime juice",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  chinese: [
    {
      id: "00000001-0000-0000-0000-000000000061",
      name: "Dumplings (Jiaozi)",
      description: "Boiled or pan-fried dough filled with meat and vegetables",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000062",
      name: "Peking Duck",
      description: "Crispy roasted duck served with pancakes and hoisin sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000063",
      name: "Kung Pao Chicken",
      description: "Spicy stir-fry with chicken, peanuts, and chili peppers",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000064",
      name: "Sweet and Sour Pork",
      description: "Pork in a tangy sauce with pineapple and bell peppers",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000065",
      name: "Mapo Tofu",
      description:
        "Spicy Sichuan dish with tofu and minced pork in chili bean sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000066",
      name: "Chow Mein",
      description: "Stir-fried noodles with vegetables and meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000067",
      name: "Spring Rolls",
      description: "Crispy rolls filled with vegetables and sometimes meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000068",
      name: "Hot Pot",
      description:
        "Simmering pot of broth to cook meats, seafood, and vegetables",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000069",
      name: "Char Siu",
      description: "Cantonese-style barbecued pork with a sweet glaze",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000070",
      name: "Egg Fried Rice",
      description: "Stir-fried rice with eggs, vegetables, and soy sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  greek: [
    {
      id: "00000001-0000-0000-0000-000000000071",
      name: "Moussaka",
      description:
        "Baked dish with layers of eggplant, meat, and béchamel sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000072",
      name: "Souvlaki",
      description: "Grilled skewers of meat served with pita and sauces",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000073",
      name: "Tzatziki",
      description: "Yogurt dip with cucumber, garlic, and dill",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000074",
      name: "Spanakopita",
      description: "Spinach and feta cheese pie in flaky pastry",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000075",
      name: "Dolmades",
      description: "Stuffed grape leaves with rice and herbs",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000076",
      name: "Greek Salad (Horiatiki)",
      description: "Salad with tomatoes, cucumber, feta, and olives",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000077",
      name: "Kleftiko",
      description: "Slow-cooked lamb with garlic and herbs",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000078",
      name: "Baklava",
      description: "Sweet pastry with layers of filo, nuts, and honey syrup",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000079",
      name: "Loukoumades",
      description: "Honey-soaked dough balls sprinkled with cinnamon",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000080",
      name: "Fasolada",
      description: "Traditional Greek bean soup with tomatoes and vegetables",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  korean: [
    {
      id: "00000001-0000-0000-0000-000000000081",
      name: "Kimchi",
      description: "Fermented vegetables, usually napa cabbage and radish",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000082",
      name: "Bibimbap",
      description:
        "Mixed rice with vegetables, meat, and spicy gochujang sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000083",
      name: "Bulgogi",
      description: "Marinated and grilled slices of beef",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000084",
      name: "Samgyeopsal",
      description: "Grilled pork belly served with dipping sauces and lettuce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000085",
      name: "Japchae",
      description: "Stir-fried glass noodles with vegetables and meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000086",
      name: "Tteokbokki",
      description: "Spicy stir-fried rice cakes in a sweet chili sauce",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000087",
      name: "Sundubu-jjigae",
      description: "Spicy soft tofu stew with seafood or meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000088",
      name: "Kimchi Jjigae",
      description: "Stew made with aged kimchi, pork, and tofu",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000089",
      name: "Haemul Pajeon",
      description: "Savory Korean pancake with seafood and green onions",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000090",
      name: "Bingsu",
      description: "Shaved ice dessert topped with sweet red beans and fruit",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
  lebanese: [
    {
      id: "00000001-0000-0000-0000-000000000091",
      name: "Hummus",
      description: "Creamy dip made from blended chickpeas, tahini, and lemon",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000092",
      name: "Falafel",
      description:
        "Deep-fried patties made from ground chickpeas or fava beans",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000093",
      name: "Shawarma",
      description:
        "Spit-roasted meat served in pita with garlic sauce and veggies",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000094",
      name: "Tabbouleh",
      description:
        "Fresh salad with parsley, bulgur, tomatoes, and lemon juice",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000095",
      name: "Baba Ganoush",
      description: "Smoky eggplant dip blended with tahini and garlic",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000096",
      name: "Kibbeh",
      description:
        "Deep-fried bulgur shells stuffed with minced meat and pine nuts",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000097",
      name: "Fattoush",
      description: "Salad with crispy pita chips, fresh vegetables, and sumac",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000098",
      name: "Manakish",
      description: "Flatbread topped with za'atar, cheese, or minced meat",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000099",
      name: "Kafta",
      description:
        "Grilled meat skewers made from minced lamb or beef with spices",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
    {
      id: "00000001-0000-0000-0000-0000000000100",
      name: "Maamoul",
      description: "Stuffed semolina cookies filled with dates, nuts, or figs",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.simplyrecipes.com/recipes/how_to_make_classic_tiramisu/",
    },
  ],
};