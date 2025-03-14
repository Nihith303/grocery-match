
export interface Cuisine {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export const cuisines: Cuisine[] = [
  {
    id: "italian",
    name: "Italian Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "Traditional dishes from Italy, known for pasta, pizza, and rich flavors."
  },
  {
    id: "japanese",
    name: "Japanese Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW5lc2UlMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "Japanese culinary traditions, featuring sushi, ramen, and seasonal ingredients."
  },
  {
    id: "mexican",
    name: "Mexican Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWV4aWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "Vibrant Mexican dishes with bold flavors, featuring tacos, enchiladas, and mole."
  },
  {
    id: "indian",
    name: "Indian Cuisine",
    imageUrl: "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg",
    description: "Aromatic Indian dishes with complex spice blends, featuring curries and tandoori specialties."
  },
  {
    id: "french",
    name: "French Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Refined French culinary arts, known for sophisticated techniques and rich flavors."
  },
  {
    id: "thai",
    name: "Thai Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGhhaSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "Thai dishes balancing sweet, sour, salty, and spicy flavors, featuring pad thai and curries."
  },
  {
    id: "chinese",
    name: "Chinese Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    description: "Diverse Chinese dishes with regional specialties, featuring dim sum and stir-fries."
  },
  {
    id: "greek",
    name: "Greek Cuisine",
    imageUrl: "https://cdn.pixabay.com/photo/2016/09/06/14/23/authentic-greek-1649223_1280.jpg",
    description: "Mediterranean Greek food featuring olive oil, fresh vegetables, and seafood."
  },
  {
    id: "korean",
    name: "Korean Cuisine",
    imageUrl: "https://images.unsplash.com/photo-1617692855027-33b14f061079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Flavorful Korean dishes featuring kimchi, barbecue, and fermented ingredients."
  },
  {
    id: "lebanese",
    name: "Lebanese Cuisine",
    imageUrl: "https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg",
    description: "Lebanese culinary traditions with mezze dishes, hummus, and fresh ingredients."
  }
];

export const dishes = {
  italian: [
    { id: "1", name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella, and basil" },
    { id: "2", name: "Spaghetti Carbonara", description: "Pasta with eggs, cheese, pancetta, and pepper" },
    { id: "3", name: "Lasagna", description: "Layered pasta with meat sauce, béchamel, and cheese" },
    { id: "4", name: "Risotto alla Milanese", description: "Creamy rice dish with saffron and parmesan" },
    { id: "5", name: "Gnocchi", description: "Soft dough dumplings made from potatoes" },
    { id: "6", name: "Tiramisu", description: "Coffee-flavored dessert with mascarpone and cocoa" },
    { id: "7", name: "Focaccia", description: "Oven-baked flatbread with olive oil and herbs" },
    { id: "8", name: "Caprese Salad", description: "Simple salad with tomatoes, mozzarella, and basil" },
    { id: "9", name: "Ossobuco", description: "Braised veal shanks with vegetables and broth" },
    { id: "10", name: "Panettone", description: "Sweet bread loaf enjoyed during holidays" }
  ],
  japanese: [
    { id: "11", name: "Sushi", description: "Vinegared rice with various toppings or fillings" },
    { id: "12", name: "Sashimi", description: "Thinly sliced raw fish or meat" },
    { id: "13", name: "Ramen", description: "Noodle soup with meat, vegetables, and broth" },
    { id: "14", name: "Tempura", description: "Battered and deep-fried seafood or vegetables" },
    { id: "15", name: "Okonomiyaki", description: "Savory pancake with various ingredients" },
    { id: "16", name: "Takoyaki", description: "Ball-shaped snack filled with octopus" },
    { id: "17", name: "Udon", description: "Thick wheat flour noodles in broth" },
    { id: "18", name: "Miso Soup", description: "Traditional soup with dashi stock and miso paste" },
    { id: "19", name: "Tonkatsu", description: "Breaded, deep-fried pork cutlet" },
    { id: "20", name: "Mochi", description: "Sweet rice cake made of mochigome rice" }
  ],
  mexican: [
    { id: "21", name: "Tacos al Pastor", description: "Marinated pork tacos with pineapple" },
    { id: "22", name: "Enchiladas", description: "Corn tortillas rolled around fillings and covered with sauce" },
    { id: "23", name: "Chiles Rellenos", description: "Stuffed and fried poblano peppers" },
    { id: "24", name: "Guacamole", description: "Avocado-based dip with lime and herbs" },
    { id: "25", name: "Quesadillas", description: "Tortillas filled with cheese and other ingredients" },
    { id: "26", name: "Tamales", description: "Corn-based dough filled with meats or fruits" },
    { id: "27", name: "Pozole", description: "Traditional soup with hominy and meat" },
    { id: "28", name: "Mole Poblano", description: "Rich sauce with chocolate and chili peppers" },
    { id: "29", name: "Sopa de Lima", description: "Lime soup with chicken and tortilla strips" },
    { id: "30", name: "Flan Mexicano", description: "Creamy caramel custard dessert" }
  ],
  indian: [
    { id: "31", name: "Chicken Biryani", description: "Aromatic rice dish cooked with spices and marinated chicken" },
    { id: "32", name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken pieces" },
    { id: "33", name: "Chicken Curry", description: "Traditional curry with chicken, spices, and a flavorful gravy" },
    { id: "34", name: "Paneer Butter Masala", description: "Rich and creamy curry made with paneer and butter" },
    { id: "35", name: "Rogan Josh", description: "Spicy lamb curry from Kashmir with a red chili base" },
    { id: "36", name: "Chole Bhature", description: "Spiced chickpeas served with deep-fried bread" },
    { id: "37", name: "Palak Paneer", description: "Cottage cheese cooked in a spinach-based gravy" },
    { id: "38", name: "Tandoori Chicken", description: "Chicken marinated in yogurt and spices, cooked in a tandoor" },
    { id: "39", name: "Gulab Jamun", description: "Deep-fried milk solids soaked in sugar syrup" },
    { id: "40", name: "Jalebi", description: "Deep-fried sweet soaked in saffron-flavored sugar syrup" }
  ],
  french: [
    { id: "41", name: "Croissants", description: "Buttery, flaky pastry perfect for breakfast" },
    { id: "42", name: "Baguette", description: "Long, thin loaf of French bread with a crispy crust" },
    { id: "43", name: "Ratatouille", description: "Stewed vegetable dish made with eggplant, zucchini, and peppers" },
    { id: "44", name: "Coq au Vin", description: "Chicken braised in red wine with mushrooms and onions" },
    { id: "45", name: "Bouillabaisse", description: "Traditional Provençal fish stew with saffron and herbs" },
    { id: "46", name: "Quiche Lorraine", description: "Savory pie with bacon, cheese, and custard filling" },
    { id: "47", name: "Crêpes Suzette", description: "Thin pancakes flambéed with orange liqueur sauce" },
    { id: "48", name: "Escargots de Bourgogne", description: "Snails baked with garlic butter and parsley" },
    { id: "49", name: "Duck Confit", description: "Slow-cooked duck leg preserved in its own fat" },
    { id: "50", name: "Crème Brûlée", description: "Rich custard topped with a layer of caramelized sugar" }
  ],
  thai: [
    { id: "51", name: "Pad Thai", description: "Stir-fried rice noodles with eggs, tofu, shrimp, and peanuts" },
    { id: "52", name: "Green Curry (Gaeng Keow Wan)", description: "Spicy Thai curry with green chilies, coconut milk, and meat" },
    { id: "53", name: "Tom Yum Goong", description: "Spicy and sour shrimp soup with lemongrass and lime" },
    { id: "54", name: "Som Tum", description: "Spicy green papaya salad with chili, lime, and peanuts" },
    { id: "55", name: "Massaman Curry", description: "Mild Thai curry with meat, potatoes, and peanuts" },
    { id: "56", name: "Pad Krapow Moo Saap", description: "Stir-fried minced pork with basil and chili" },
    { id: "57", name: "Khao Pad", description: "Thai-style fried rice with vegetables and meat" },
    { id: "58", name: "Satay", description: "Grilled meat skewers served with peanut sauce" },
    { id: "59", name: "Mango Sticky Rice", description: "Sweet sticky rice served with ripe mango and coconut milk" },
    { id: "60", name: "Larb", description: "Spicy minced meat salad with herbs and lime juice" }
  ],
  chinese: [
    { id: "61", name: "Dumplings (Jiaozi)", description: "Boiled or pan-fried dough filled with meat and vegetables" },
    { id: "62", name: "Peking Duck", description: "Crispy roasted duck served with pancakes and hoisin sauce" },
    { id: "63", name: "Kung Pao Chicken", description: "Spicy stir-fry with chicken, peanuts, and chili peppers" },
    { id: "64", name: "Sweet and Sour Pork", description: "Pork in a tangy sauce with pineapple and bell peppers" },
    { id: "65", name: "Mapo Tofu", description: "Spicy Sichuan dish with tofu and minced pork in chili bean sauce" },
    { id: "66", name: "Chow Mein", description: "Stir-fried noodles with vegetables and meat" },
    { id: "67", name: "Spring Rolls", description: "Crispy rolls filled with vegetables and sometimes meat" },
    { id: "68", name: "Hot Pot", description: "Simmering pot of broth to cook meats, seafood, and vegetables" },
    { id: "69", name: "Char Siu", description: "Cantonese-style barbecued pork with a sweet glaze" },
    { id: "70", name: "Egg Fried Rice", description: "Stir-fried rice with eggs, vegetables, and soy sauce" }
  ],
  greek: [
    { id: "71", name: "Moussaka", description: "Baked dish with layers of eggplant, meat, and béchamel sauce" },
    { id: "72", name: "Souvlaki", description: "Grilled skewers of meat served with pita and sauces" },
    { id: "73", name: "Tzatziki", description: "Yogurt dip with cucumber, garlic, and dill" },
    { id: "74", name: "Spanakopita", description: "Spinach and feta cheese pie in flaky pastry" },
    { id: "75", name: "Dolmades", description: "Stuffed grape leaves with rice and herbs" },
    { id: "76", name: "Greek Salad (Horiatiki)", description: "Salad with tomatoes, cucumber, feta, and olives" },
    { id: "77", name: "Kleftiko", description: "Slow-cooked lamb with garlic and herbs" },
    { id: "78", name: "Baklava", description: "Sweet pastry with layers of filo, nuts, and honey syrup" },
    { id: "79", name: "Loukoumades", description: "Honey-soaked dough balls sprinkled with cinnamon" },
    { id: "80", name: "Fasolada", description: "Traditional Greek bean soup with tomatoes and vegetables" }
  ],
  korean: [
    { id: "81", name: "Kimchi", description: "Fermented vegetables, usually napa cabbage and radish" },
    { id: "82", name: "Bibimbap", description: "Mixed rice with vegetables, meat, and spicy gochujang sauce" },
    { id: "83", name: "Bulgogi", description: "Marinated and grilled slices of beef" },
    { id: "84", name: "Samgyeopsal", description: "Grilled pork belly served with dipping sauces and lettuce" },
    { id: "85", name: "Japchae", description: "Stir-fried glass noodles with vegetables and meat" },
    { id: "86", name: "Tteokbokki", description: "Spicy stir-fried rice cakes in a sweet chili sauce" },
    { id: "87", name: "Sundubu-jjigae", description: "Spicy soft tofu stew with seafood or meat" },
    { id: "88", name: "Kimchi Jjigae", description: "Stew made with aged kimchi, pork, and tofu" },
    { id: "89", name: "Haemul Pajeon", description: "Savory Korean pancake with seafood and green onions" },
    { id: "90", name: "Bingsu", description: "Shaved ice dessert topped with sweet red beans and fruit" }
  ],
  lebanese: [
    { id: "91", name: "Hummus", description: "Creamy dip made from blended chickpeas, tahini, and lemon" },
    { id: "92", name: "Falafel", description: "Deep-fried patties made from ground chickpeas or fava beans" },
    { id: "93", name: "Shawarma", description: "Spit-roasted meat served in pita with garlic sauce and veggies" },
    { id: "94", name: "Tabbouleh", description: "Fresh salad with parsley, bulgur, tomatoes, and lemon juice" },
    { id: "95", name: "Baba Ganoush", description: "Smoky eggplant dip blended with tahini and garlic" },
    { id: "96", name: "Kibbeh", description: "Deep-fried bulgur shells stuffed with minced meat and pine nuts" },
    { id: "97", name: "Fattoush", description: "Salad with crispy pita chips, fresh vegetables, and sumac" },
    { id: "98", name: "Manakish", description: "Flatbread topped with za'atar, cheese, or minced meat" },
    { id: "99", name: "Kafta", description: "Grilled meat skewers made from minced lamb or beef with spices" },
    { id: "100", name: "Maamoul", description: "Stuffed semolina cookies filled with dates, nuts, or figs" }
  ]
};
