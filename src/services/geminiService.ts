
import { GoogleGenerativeAI } from "@google/generative-ai";

// We'll get the API key from the environment variable or prompt the user to set it
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(apiKey);

export interface RecipePromptData {
  ingredients: string[];
  mealType: string;
  dietaryPreferences: string[];
  cuisine: string;
  cookingTime: string;
  skillLevel: string;
}

export const generateRecipe = async (data: RecipePromptData): Promise<string> => {
  if (!apiKey) {
    throw new Error("Gemini API key is not set. Please set the VITE_GEMINI_API_KEY environment variable.");
  }

  try {
    // Construct a detailed prompt with all the recipe requirements
    const dietaryString = data.dietaryPreferences.length > 0 
      ? `Dietary needs: ${data.dietaryPreferences.join(", ")}` 
      : "No specific dietary restrictions";
    
    const prompt = `Generate a detailed recipe with these requirements:
- Main ingredients: ${data.ingredients.join(", ")}
- ${dietaryString}
- Meal type: ${data.mealType}
- Cuisine style: ${data.cuisine !== "any" ? data.cuisine : "any style"}
- Maximum cooking time: ${data.cookingTime}
- Skill level: ${data.skillLevel}

Structure the response with Markdown formatting for:
1. Recipe title (## header)
2. Brief description (2-3 sentences)
3. Preparation time and cooking time
4. Ingredients list (bullet points)
5. Step-by-step instructions (numbered list)
6. Optional tips section
7. Nutrition information (estimated)

The recipe should serve 2-4 people.`;

    // Initialize the generative model (Gemini 1.5 Pro)
    // Using the latest model version supported by the API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Return the generated recipe text
    return response.text();
  } catch (error) {
    console.error("Error generating recipe with Gemini:", error);
    throw new Error("Failed to generate recipe. Please try again later.");
  }
};
