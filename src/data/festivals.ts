interface Festival {
  name: string;
  date: string; // Format: "MM-DD"
  recipes: Array<{
    name: string;
    description: string;
  }>;
}

export const festivals: Record<string, Festival[]> = {
  "01": [ // January
    {
      name: "New Year's Day",
      date: "01-01",
      recipes: [
        {
          name: "Lucky Black-Eyed Peas",
          description: "Traditional New Year's dish for good fortune!"
        }
      ]
    }
  ],
  "02": [ // February
    {
      name: "Valentine's Day",
      date: "02-14",
      recipes: [
        {
          name: "Chocolate Covered Strawberries",
          description: "Romantic dessert perfect for sharing"
        }
      ]
    }
  ],
  "03": [ // March
    {
      name: "St. Patrick's Day",
      date: "03-17",
      recipes: [
        {
          name: "Irish Soda Bread",
          description: "Traditional Irish bread with raisins"
        }
      ]
    }
  ],
  "04": [ // April
    {
      name: "Easter",
      date: "04-09",
      recipes: [
        {
          name: "Hot Cross Buns",
          description: "Traditional spiced sweet buns perfect for Easter!"
        },
        {
          name: "Easter Roast Lamb",
          description: "Herb-crusted roasted lamb with rosemary and garlic"
        },
        {
          name: "Easter Egg Nest Cake",
          description: "Chocolate cake decorated with mini eggs and chocolate shavings"
        }
      ]
    },
    {
      name: "Earth Day",
      date: "04-22",
      recipes: [
        {
          name: "Garden Fresh Salad",
          description: "Locally sourced vegetables with herb vinaigrette"
        },
        {
          name: "Plant-Based Buddha Bowl",
          description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing"
        },
        {
          name: "Zero-Waste Vegetable Soup",
          description: "Soup using whole vegetables including stems and leaves"
        }
      ]
    },
    {
      name: "Spring Food Festival",
      date: "04-15",
      recipes: [
        {
          name: "Spring Asparagus Tart",
          description: "Light and flaky tart with fresh asparagus and goat cheese"
        },
        {
          name: "Cherry Blossom Cupcakes",
          description: "Delicate vanilla cupcakes with sakura-inspired frosting"
        },
        {
          name: "Spring Pea Risotto",
          description: "Creamy risotto with fresh spring peas and mint"
        }
      ]
    }
  ],
  "05": [ // May
    {
      name: "Cinco de Mayo",
      date: "05-05",
      recipes: [
        {
          name: "Authentic Guacamole",
          description: "Fresh avocado dip with lime and cilantro"
        }
      ]
    }
  ],
  "06": [ // June
    {
      name: "Midsummer Festival",
      date: "06-21",
      recipes: [
        {
          name: "Summer Berry Trifle",
          description: "Light and refreshing summer dessert"
        }
      ]
    }
  ],
  "07": [ // July
    {
      name: "Independence Day",
      date: "07-04",
      recipes: [
        {
          name: "All-American BBQ Ribs",
          description: "Smoky and tender barbecue ribs"
        }
      ]
    }
  ],
  "08": [ // August
    {
      name: "Summer Harvest Festival",
      date: "08-15",
      recipes: [
        {
          name: "Garden Fresh Ratatouille",
          description: "Mediterranean vegetable stew"
        }
      ]
    }
  ],
  "09": [ // September
    {
      name: "Autumn Equinox",
      date: "09-22",
      recipes: [
        {
          name: "Pumpkin Spice Latte",
          description: "Warm and cozy fall beverage"
        }
      ]
    }
  ],
  "10": [ // October
    {
      name: "Halloween",
      date: "10-31",
      recipes: [
        {
          name: "Spooky Cookie Treats",
          description: "Fun and festive Halloween cookies"
        }
      ]
    }
  ],
  "11": [ // November
    {
      name: "Thanksgiving",
      date: "11-23",
      recipes: [
        {
          name: "Classic Roast Turkey",
          description: "Traditional Thanksgiving centerpiece"
        }
      ]
    }
  ],
  "12": [ // December
    {
      name: "Christmas",
      date: "12-25",
      recipes: [
        {
          name: "Gingerbread Cookies",
          description: "Classic holiday spiced cookies"
        }
      ]
    }
  ]
};