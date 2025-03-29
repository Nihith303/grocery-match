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
      description: "https://www.fifteenspatulas.com/homemade-sushi/",
      youtubeVideoId: "nIoOv6lWYnk",
      recipeUrl: "https://en.wikipedia.org/wiki/Sushi",
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
      youtubeVideoId: "oLPMy-GmNtw",
      recipeUrl: "https://tastesbetterfromscratch.com/tacos-al-pastor/",
    },
    {
      id: "00000001-0000-0000-0000-000000000022",
      name: "Enchiladas",
      description: "Corn tortillas rolled around fillings and covered with sauce",
      youtubeVideoId: "qGPsT5jzjqM",
      recipeUrl: "https://www.loveandlemons.com/enchiladas-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000023",
      name: "Chiles Rellenos",
      description: "Stuffed and fried poblano peppers",
      youtubeVideoId: "Cy1yilIIBB0",
      recipeUrl: "https://www.isabeleats.com/chile-relleno-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000024",
      name: "Guacamole",
      description: "Avocado-based dip with lime and herbs",
      youtubeVideoId: "tHVzFLtvbGQ",
      recipeUrl: "https://www.loveandlemons.com/guacamole-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000025",
      name: "Quesadillas",
      description: "Tortillas filled with cheese and other ingredients",
      youtubeVideoId: "mUA5m-113HQ",
      recipeUrl: "https://www.loveandlemons.com/quesadilla/",
    },
    {
      id: "00000001-0000-0000-0000-000000000026",
      name: "Tamales",
      description: "Corn-based dough filled with meats or fruits",
      youtubeVideoId: "36IicNJ5FNc",
      recipeUrl: "https://www.gimmesomeoven.com/how-to-make-tamales/",
    },
    {
      id: "00000001-0000-0000-0000-000000000027",
      name: "Pozole",
      description: "Traditional soup with hominy and meat",
      youtubeVideoId: "Icf1f1laB50",
      recipeUrl: "https://www.simplyrecipes.com/recipes/posole_rojo/",
    },
    {
      id: "00000001-0000-0000-0000-000000000028",
      name: "Mole Poblano",
      description: "Rich sauce with chocolate and chili peppers",
      youtubeVideoId: "bFrysZWH5Oc",
      recipeUrl: "https://www.seriouseats.com/mole-poblano-recipe-how-to-make-mole",
    },
    {
      id: "00000001-0000-0000-0000-000000000029",
      name: "Sopa de Lima",
      description: "Lime soup with chicken and tortilla strips",
      youtubeVideoId: "qsFGuUQQj_k",
      recipeUrl: "https://www.seriouseats.com/sopa-de-lima-yucatan-mexican-lime-soup-recipe",
    },
    {
      id: "00000001-0000-0000-0000-000000000030",
      name: "Flan Mexicano",
      description: "Creamy caramel custard dessert",
      youtubeVideoId: "F3mKooWttpw",
      recipeUrl: "https://www.allrecipes.com/recipe/214091/flan-mexicano-mexican-flan/",
    },
  ],
  indian: [
    {
      id: "00000001-0000-0000-0000-000000000031",
      name: "Chicken Biryani",
      description:
        "Aromatic rice dish cooked with spices and marinated chicken",
      youtubeVideoId: "6XlMguO9r-M",
      recipeUrl: "https://www.indianhealthyrecipes.com/chicken-biryani-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000032",
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      youtubeVideoId: "a03U45jFxOI",
      recipeUrl: "https://www.indianhealthyrecipes.com/butter-chicken/",
    },
    {
      id: "00000001-0000-0000-0000-000000000033",
      name: "Chicken Curry",
      description:
        "Traditional curry with chicken, spices, and a flavorful gravy",
      youtubeVideoId: "XmQ8mZFqczw",
      recipeUrl: "https://www.indianhealthyrecipes.com/chicken-curry/",
    },
    {
      id: "00000001-0000-0000-0000-000000000034",
      name: "Paneer Butter Masala",
      description: "Rich and creamy curry made with paneer and butter",
      youtubeVideoId: "U1LVDFwi8qI",
      recipeUrl: "https://www.indianhealthyrecipes.com/paneer-butter-masala-restaurant-style/",
    },
    {
      id: "00000001-0000-0000-0000-000000000035",
      name: "Rogan Josh",
      description: "Spicy lamb curry from Kashmir with a red chili base",
      youtubeVideoId: "cXjTFJOpkDk",
      recipeUrl: "https://www.indianhealthyrecipes.com/rogan-josh/",
    },
    {
      id: "00000001-0000-0000-0000-000000000036",
      name: "Chole Bhature",
      description: "Spiced chickpeas served with deep-fried bread",
      youtubeVideoId: "Bb4hoRIZ42s",
      recipeUrl: "https://www.vegrecipesofindia.com/chole-bhature/",
    },
    {
      id: "00000001-0000-0000-0000-000000000037",
      name: "Palak Paneer",
      description: "Cottage cheese cooked in a spinach-based gravy",
      youtubeVideoId: "ffZ3JjiCN8k",
      recipeUrl: "https://www.indianhealthyrecipes.com/palak-paneer-recipe-easy-paneer-recipes-step-by-step-pics/",
    },
    {
      id: "00000001-0000-0000-0000-000000000038",
      name: "Tandoori Chicken",
      description:
        "Chicken marinated in yogurt and spices, cooked in a tandoor",
      youtubeVideoId: "D1oS5Evs10I",
      recipeUrl: "https://www.indianhealthyrecipes.com/tandoori-chicken-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000039",
      name: "Gulab Jamun",
      description: "Deep-fried milk solids soaked in sugar syrup",
      youtubeVideoId: "J3O0ZEJYLFQ",
      recipeUrl: "https://www.indianhealthyrecipes.com/gulab-jamun-recipe-using-milk-powder/",
    },
    {
      id: "00000001-0000-0000-0000-000000000040",
      name: "Jalebi",
      description: "Deep-fried sweet soaked in saffron-flavored sugar syrup",
      youtubeVideoId: "CS9CaBrXTRM",
      recipeUrl: "https://www.indianhealthyrecipes.com/jalebi-recipe/",
    },
  ],
  french: [
    {
      id: "00000001-0000-0000-0000-000000000041",
      name: "Croissants",
      description: "Buttery, flaky pastry perfect for breakfast",
      youtubeVideoId: "djnNkLi_K6E",
      recipeUrl: "https://sallysbakingaddiction.com/homemade-croissants/",
    },
    {
      id: "00000001-0000-0000-0000-000000000042",
      name: "Baguette",
      description: "Long, thin loaf of French bread with a crispy crust",
      youtubeVideoId: "5FR__Gt0CSo",
      recipeUrl: "https://tasteofartisan.com/french-baguette-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000043",
      name: "Ratatouille",
      description:
        "Stewed vegetable dish made with eggplant, zucchini, and peppers",
      youtubeVideoId: "RQlp-p_Qcsw",
      recipeUrl: "https://www.loveandlemons.com/ratatouille-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000044",
      name: "Coq au Vin",
      description: "Chicken braised in red wine with mushrooms and onions",
      youtubeVideoId: "lESyM-fdgfE",
      recipeUrl: "https://www.recipetineats.com/coq-au-vin/",
    },
    {
      id: "00000001-0000-0000-0000-000000000045",
      name: "Bouillabaisse",
      description: "Traditional Provençal fish stew with saffron and herbs",
      youtubeVideoId: "d7yDx8WM2Q8",
      recipeUrl: "https://www.simplyrecipes.com/recipes/bouillabaisse/",
    },
    {
      id: "00000001-0000-0000-0000-000000000046",
      name: "Quiche Lorraine",
      description: "Savory pie with bacon, cheese, and custard filling",
      youtubeVideoId: "kLzDztWY9HQ",
      recipeUrl: "https://www.onceuponachef.com/recipes/quiche-lorraine.html",
    },
    {
      id: "00000001-0000-0000-0000-000000000047",
      name: "Crêpes Suzette",
      description: "Thin pancakes flambéed with orange liqueur sauce",
      youtubeVideoId: "XiG5Dvn0U3A",
      recipeUrl: "https://www.foodandwine.com/recipes/crepes-suzette",
    },
    {
      id: "00000001-0000-0000-0000-000000000048",
      name: "Escargots de Bourgogne",
      description: "Snails baked with garlic butter and parsley",
      youtubeVideoId: "3Kh2R8tULas",
      recipeUrl: "https://www.epicurious.com/recipes/food/views/escargots-a-la-bourguignonne-233523",
    },
    {
      id: "00000001-0000-0000-0000-000000000049",
      name: "Duck Confit",
      description: "Slow-cooked duck leg preserved in its own fat",
      youtubeVideoId: "UhwKM3DzT_Q",
      recipeUrl: "https://www.recipetineats.com/duck-confit/",
    },
    {
      id: "00000001-0000-0000-0000-000000000050",
      name: "Crème Brûlée",
      description: "Rich custard topped with a layer of caramelized sugar",
      youtubeVideoId: "6tSdlo0r0Io",
      recipeUrl: "https://sallysbakingaddiction.com/creme-brulee/",
    },
  ],
  thai: [
    {
      id: "00000001-0000-0000-0000-000000000051",
      name: "Pad Thai",
      description:
        "Stir-fried rice noodles with eggs, tofu, shrimp, and peanuts",
      youtubeVideoId: "b7YnoRFuZ9o",
      recipeUrl: "https://tastesbetterfromscratch.com/pad-thai/",
    },
    {
      id: "00000001-0000-0000-0000-000000000052",
      name: "Green Curry (Gaeng Keow Wan)",
      description:
        "Spicy Thai curry with green chilies, coconut milk, and meat",
      youtubeVideoId: "rTK8MWYYLko",
      recipeUrl: "https://rachelcooksthai.com/green-curry-with-chicken-and-eggplant/",
    },
    {
      id: "00000001-0000-0000-0000-000000000053",
      name: "Tom Yum Goong",
      description: "Spicy and sour shrimp soup with lemongrass and lime",
      youtubeVideoId: "hhcYNjeQ_XY",
      recipeUrl: "https://hot-thai-kitchen.com/tom-yum-goong/",
    },
    {
      id: "00000001-0000-0000-0000-000000000054",
      name: "Som Tum",
      description: "Spicy green papaya salad with chili, lime, and peanuts",
      youtubeVideoId: "Wvv0dqZ_xa4",
      recipeUrl: "https://hot-thai-kitchen.com/papaya-salad-v3/",
    },
    {
      id: "00000001-0000-0000-0000-000000000055",
      name: "Massaman Curry",
      description: "Mild Thai curry with meat, potatoes, and peanuts",
      youtubeVideoId: "Z5v8F_zhwF8",
      recipeUrl: "https://hot-thai-kitchen.com/massaman-curry/",
    },
    {
      id: "00000001-0000-0000-0000-000000000056",
      name: "Pad Krapow Moo Saap",
      description: "Stir-fried minced pork with basil and chili",
      youtubeVideoId: "zorBeRe2rsE",
      recipeUrl: "https://rachelcooksthai.com/pad-kaprow-moo/",
    },
    {
      id: "00000001-0000-0000-0000-000000000057",
      name: "Khao Pad",
      description: "Thai-style fried rice with vegetables and meat",
      youtubeVideoId: "mV3m2svj3XE",
      recipeUrl: "https://khinskitchen.com/khao-pad/",
    },
    {
      id: "00000001-0000-0000-0000-000000000058",
      name: "Satay",
      description: "Grilled meat skewers served with peanut sauce",
      youtubeVideoId: "ThrMvNpQBM8",
      recipeUrl: "https://hot-thai-kitchen.com/chicken-satay/",
    },
    {
      id: "00000001-0000-0000-0000-000000000059",
      name: "Mango Sticky Rice",
      description: "Sweet sticky rice served with ripe mango and coconut milk",
      youtubeVideoId: "NUbM8-0zr8U",
      recipeUrl: "https://www.allrecipes.com/recipe/150313/thai-sweet-sticky-rice-with-mango-khao-neeo-mamuang/",
    },
    {
      id: "00000001-0000-0000-0000-000000000060",
      name: "Larb",
      description: "Spicy minced meat salad with herbs and lime juice",
      youtubeVideoId: "elcphgkyYLY",
      recipeUrl: "https://hot-thai-kitchen.com/laab-moo/",
    },
  ],
  chinese: [
    {
      id: "00000001-0000-0000-0000-000000000061",
      name: "Dumplings (Jiaozi)",
      description: "Boiled or pan-fried dough filled with meat and vegetables",
      youtubeVideoId: "VWm53wI_734",
      recipeUrl: "https://redhousespice.com/dumpling-guide/",
    },
    {
      id: "00000001-0000-0000-0000-000000000062",
      name: "Peking Duck",
      description: "Crispy roasted duck served with pancakes and hoisin sauce",
      youtubeVideoId: "KnJ3abXjgME",
      recipeUrl: "https://redhousespice.com/peking-duck/",
    },
    {
      id: "00000001-0000-0000-0000-000000000063",
      name: "Kung Pao Chicken",
      description: "Spicy stir-fry with chicken, peanuts, and chili peppers",
      youtubeVideoId: "YT8oN4U7Vm8",
      recipeUrl: "https://www.recipetineats.com/kung-pao-chicken/",
    },
    {
      id: "00000001-0000-0000-0000-000000000064",
      name: "Sweet and Sour Pork",
      description: "Pork in a tangy sauce with pineapple and bell peppers",
      youtubeVideoId: "6xgapMla7LQ",
      recipeUrl: "https://www.allrecipes.com/recipe/31144/sweet-and-sour-pork-iii/",
    },
    {
      id: "00000001-0000-0000-0000-000000000065",
      name: "Mapo Tofu",
      description:
        "Spicy Sichuan dish with tofu and minced pork in chili bean sauce",
      youtubeVideoId: "ZfsZwwrTFD4",
      recipeUrl: "https://thewoksoflife.com/ma-po-tofu-real-deal/",
    },
    {
      id: "00000001-0000-0000-0000-000000000066",
      name: "Chow Mein",
      description: "Stir-fried noodles with vegetables and meat",
      youtubeVideoId: "oVpmW-xuYis",
      recipeUrl: "https://www.vegrecipesofindia.com/veg-chow-mein-noodles-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000067",
      name: "Spring Rolls",
      description: "Crispy rolls filled with vegetables and sometimes meat",
      youtubeVideoId: "Eeuo9iWH9DU",
      recipeUrl: "https://www.indianhealthyrecipes.com/baked-vegetable-spring-rolls-recipe-crusty-oven-baked-vegetable-spring-rolls/",
    },
    {
      id: "00000001-0000-0000-0000-000000000068",
      name: "Hot Pot",
      description:
        "Simmering pot of broth to cook meats, seafood, and vegetables",
      youtubeVideoId: "EApkyOBewEw",
      recipeUrl: "https://thewoksoflife.com/chinese-hot-pot-at-home/",
    },
    {
      id: "00000001-0000-0000-0000-000000000069",
      name: "Char Siu",
      description: "Cantonese-style barbecued pork with a sweet glaze",
      youtubeVideoId: "_6GsSRmnads",
      recipeUrl: "https://thewoksoflife.com/chinese-bbq-pork-cha-siu/",
    },
    {
      id: "00000001-0000-0000-0000-000000000070",
      name: "Egg Fried Rice",
      description: "Stir-fried rice with eggs, vegetables, and soy sauce",
      youtubeVideoId: "WYh2Ju4MfYE",
      recipeUrl: "https://www.indianhealthyrecipes.com/egg-fried-rice/",
    },
  ],
  greek: [
    {
      id: "00000001-0000-0000-0000-000000000071",
      name: "Moussaka",
      description:
        "Baked dish with layers of eggplant, meat, and béchamel sauce",
      youtubeVideoId: "Z_GcsR7Q99s",
      recipeUrl: "https://www.recipetineats.com/moussaka-greek-eggplant-beef-bake/",
    },
    {
      id: "00000001-0000-0000-0000-000000000072",
      name: "Souvlaki",
      description: "Grilled skewers of meat served with pita and sauces",
      youtubeVideoId: "jeCk5e0YsF0",
      recipeUrl: "https://www.themediterraneandish.com/greek-chicken-souvlaki-recipe-tzatziki/",
    },
    {
      id: "00000001-0000-0000-0000-000000000073",
      name: "Tzatziki",
      description: "Yogurt dip with cucumber, garlic, and dill",
      youtubeVideoId: "9bkxEymRTyA",
      recipeUrl: "https://www.loveandlemons.com/tzatziki-sauce/",
    },
    {
      id: "00000001-0000-0000-0000-000000000074",
      name: "Spanakopita",
      description: "Spinach and feta cheese pie in flaky pastry",
      youtubeVideoId: "B788qsWT-Wg",
      recipeUrl: "https://www.themediterraneandish.com/spanakopita-recipe-greek-spinach-pie/",
    },
    {
      id: "00000001-0000-0000-0000-000000000075",
      name: "Dolmades",
      description: "Stuffed grape leaves with rice and herbs",
      youtubeVideoId: "G7OLFDL63J4",
      recipeUrl: "https://www.lazycatkitchen.com/dolmades-greek-stuffed-vine-leaves/",
    },
    {
      id: "00000001-0000-0000-0000-000000000076",
      name: "Greek Salad (Horiatiki)",
      description: "Salad with tomatoes, cucumber, feta, and olives",
      youtubeVideoId: "J3hrMqM3N00",
      recipeUrl: "https://www.themediterraneandish.com/traditional-greek-salad-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000077",
      name: "Kleftiko",
      description: "Slow-cooked lamb with garlic and herbs",
      youtubeVideoId: "ayGNdsRLR5E",
      recipeUrl: "https://www.themediterraneandish.com/kleftiko-greek-lamb-in-parchment/",
    },
    {
      id: "00000001-0000-0000-0000-000000000078",
      name: "Baklava",
      description: "Sweet pastry with layers of filo, nuts, and honey syrup",
      youtubeVideoId: "8IIjVmMf5Nw",
      recipeUrl: "https://www.themediterraneandish.com/how-to-make-baklava/",
    },
    {
      id: "00000001-0000-0000-0000-000000000079",
      name: "Loukoumades",
      description: "Honey-soaked dough balls sprinkled with cinnamon",
      youtubeVideoId: "xoe7iTm4iYQ",
      recipeUrl: "https://www.lazycatkitchen.com/loukoumades-greek-doughnuts/",
    },
    {
      id: "00000001-0000-0000-0000-000000000080",
      name: "Fasolada",
      description: "Traditional Greek bean soup with tomatoes and vegetables",
      youtubeVideoId: "1s22lUYEOQI",
      recipeUrl: "https://www.foodbymaria.com/fasolada/",
    },
  ],
  korean: [
    {
      id: "00000001-0000-0000-0000-000000000081",
      name: "Kimchi",
      description: "Fermented vegetables, usually napa cabbage and radish",
      youtubeVideoId: "aXhJcdXPyYI",
      recipeUrl: "https://www.maangchi.com/recipe/tongbaechu-kimchi",
    },
    {
      id: "00000001-0000-0000-0000-000000000082",
      name: "Bibimbap",
      description:
        "Mixed rice with vegetables, meat, and spicy gochujang sauce",
      youtubeVideoId: "L_sDgKqIXbY",
      recipeUrl: "https://mykoreankitchen.com/bibimbap-korean-mixed-rice-with-meat-and-assorted-vegetables/",
    },
    {
      id: "00000001-0000-0000-0000-000000000083",
      name: "Bulgogi",
      description: "Marinated and grilled slices of beef",
      youtubeVideoId: "djM3z5VHSAY",
      recipeUrl: "https://damndelicious.net/2019/04/21/korean-beef-bulgogi/",
    },
    {
      id: "00000001-0000-0000-0000-000000000084",
      name: "Samgyeopsal",
      description: "Grilled pork belly served with dipping sauces and lettuce",
      youtubeVideoId: "KGRNy38n5Us",
      recipeUrl: "https://mykoreankitchen.com/pork-belly-bbq-samgyeopsal-gui/",
    },
    {
      id: "00000001-0000-0000-0000-000000000085",
      name: "Japchae",
      description: "Stir-fried glass noodles with vegetables and meat",
      youtubeVideoId: "q6Of4d-Keks",
      recipeUrl: "https://www.recipetineats.com/japchae-korean-noodles/",
    },
    {
      id: "00000001-0000-0000-0000-000000000086",
      name: "Tteokbokki",
      description: "Spicy stir-fried rice cakes in a sweet chili sauce",
      youtubeVideoId: "N1ZRz5WDt1I",
      recipeUrl: "https://mykoreankitchen.com/tteokbokki-spicy-rice-cakes/",
    },
    {
      id: "00000001-0000-0000-0000-000000000087",
      name: "Sundubu-jjigae",
      description: "Spicy soft tofu stew with seafood or meat",
      youtubeVideoId: "ZhQ5F_cLsaQ",
      recipeUrl: "https://mykoreankitchen.com/sundubu-jjigae/",
    },
    {
      id: "00000001-0000-0000-0000-000000000088",
      name: "Kimchi Jjigae",
      description: "Stew made with aged kimchi, pork, and tofu",
      youtubeVideoId: "IEldUkfl3-s",
      recipeUrl: "https://mykoreankitchen.com/kimchi-jjigae/",
    },
    {
      id: "00000001-0000-0000-0000-000000000089",
      name: "Haemul Pajeon",
      description: "Savory Korean pancake with seafood and green onions",
      youtubeVideoId: "bnYr77vOyM0",
      recipeUrl: "https://mykoreankitchen.com/korean-seafood-and-green-onion-pancakes-haemul-pajeon/",
    },
    {
      id: "00000001-0000-0000-0000-000000000090",
      name: "Bingsu",
      description: "Shaved ice dessert topped with sweet red beans and fruit",
      youtubeVideoId: "RMudtHk4_Kk",
      recipeUrl: "https://www.dumplingconnection.com/recipes/bingsu-korean-shaved-ice-recipe/",
    },
  ],
  lebanese: [
    {
      id: "00000001-0000-0000-0000-000000000091",
      name: "Hummus",
      description: "Creamy dip made from blended chickpeas, tahini, and lemon",
      youtubeVideoId: "AmxtJG-XvIY",
      recipeUrl: "https://www.inspiredtaste.net/15938/easy-and-smooth-hummus-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000092",
      name: "Falafel",
      description:
        "Deep-fried patties made from ground chickpeas or fava beans",
      youtubeVideoId: "NZcWedPKysk",
      recipeUrl: "https://www.themediterraneandish.com/how-to-make-falafel/",
    },
    {
      id: "00000001-0000-0000-0000-000000000093",
      name: "Shawarma",
      description:
        "Spit-roasted meat served in pita with garlic sauce and veggies",
      youtubeVideoId: "9QAg7Zqi56c",
      recipeUrl: "https://www.recipetineats.com/chicken-sharwama-middle-eastern/",
    },
    {
      id: "00000001-0000-0000-0000-000000000094",
      name: "Tabbouleh",
      description:
        "Fresh salad with parsley, bulgur, tomatoes, and lemon juice",
      youtubeVideoId: "d5GN_4yJW8c",
      recipeUrl: "https://www.loveandlemons.com/tabbouleh/",
    },
    {
      id: "00000001-0000-0000-0000-000000000095",
      name: "Baba Ganoush",
      description: "Smoky eggplant dip blended with tahini and garlic",
      youtubeVideoId: "qf0fO68_4N8",
      recipeUrl: "https://cookieandkate.com/epic-baba-ganoush-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000096",
      name: "Kibbeh",
      description:
        "Deep-fried bulgur shells stuffed with minced meat and pine nuts",
      youtubeVideoId: "0Yk6ffx_TU8",
      recipeUrl: "https://www.themediterraneandish.com/kibbeh-recipe/",
    },
    {
      id: "00000001-0000-0000-0000-000000000097",
      name: "Fattoush",
      description: "Salad with crispy pita chips, fresh vegetables, and sumac",
      youtubeVideoId: "2VwJwYxK5IM",
      recipeUrl: "https://www.allrecipes.com/recipe/223439/arabic-fattoush-salad/",
    },
    {
      id: "00000001-0000-0000-0000-000000000098",
      name: "Manakish",
      description: "Flatbread topped with za'atar, cheese, or minced meat",
      youtubeVideoId: "XEIJ7IZh1Sc",
      recipeUrl: "https://www.hungrypaprikas.com/manakish/",
    },
    {
      id: "00000001-0000-0000-0000-000000000099",
      name: "Kafta",
      description:
        "Grilled meat skewers made from minced lamb or beef with spices",
      youtubeVideoId: "EVDxpYm6Q_E",
      recipeUrl: "https://feelgoodfoodie.net/recipe/beef-kafta/",
    },
    {
      id: "00000001-0000-0000-0000-0000000000100",
      name: "Maamoul",
      description: "Stuffed semolina cookies filled with dates, nuts, or figs",
      youtubeVideoId: "ZYZpu9zEvY8",
      recipeUrl: "https://amiraspantry.com/maamoul/",
    },
  ],
};