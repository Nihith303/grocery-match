import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  // Website/Account FAQs
  {
    id: "website-1",
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign In' button in the top right corner of the navigation bar, then select 'Create an account'. Fill in your details and follow the prompts to complete registration.",
    category: "Website & Account",
  },
  {
    id: "website-2",
    question: "I forgot my password. How can I reset it?",
    answer:
      "Click on the 'Sign In' button and select 'Forgot password?' option. Enter your email address, and we'll send you instructions to reset your password.",
    category: "Website & Account",
  },
  {
    id: "website-3",
    question: "Can I use Grocery Match without creating an account?",
    answer:
      "Yes, you can browse recipes and ingredients without an account. However, to save favorites, create shopping lists, or track your cooking history, you'll need to create an account.",
    category: "Website & Account",
  },

  // Recipes & Ingredients FAQs
  {
    id: "recipes-1",
    question: "How can I find recipes based on dietary restrictions?",
    answer:
      "Use our advanced search feature to filter recipes by dietary restrictions such as vegetarian, vegan, gluten-free, dairy-free, and more. You can also specify allergens to exclude from your search results.",
    category: "Recipes & Ingredients",
  },
  {
    id: "recipes-2",
    question: "Can I adjust the serving size of recipes?",
    answer:
      "Yes, most recipes include a serving adjustment feature. Look for the serving size selector near the ingredient list and adjust it to your needs. The ingredient quantities will automatically recalculate.",
    category: "Recipes & Ingredients",
  },
  {
    id: "recipes-3",
    question: "How are recipes vetted for quality?",
    answer:
      "Our recipes come from a combination of professional chefs, tested community submissions, and partnerships with culinary experts. Each recipe undergoes testing to ensure accuracy, clarity, and delicious results.",
    category: "Recipes & Ingredients",
  },
  {
    id: "recipes-4",
    question: "What if I'm missing an ingredient?",
    answer:
      "Our recipes include a 'Substitutions' section that suggests alternatives for common ingredients. You can also use our 'What can I cook?' feature to find recipes based on ingredients you already have.",
    category: "Recipes & Ingredients",
  },
  {
    id: "recipes-5",
    question: "Can I suggest a recipe to be added to the database?",
    answer:
      "Absolutely! Registered users can submit recipes through the 'Submit a Recipe' form. Our team reviews submissions for completeness and quality before adding them to our database.",
    category: "Recipes & Ingredients",
  },

  // Shopping & Meal Planning FAQs
  {
    id: "shopping-1",
    question: "How does the shopping list feature work?",
    answer:
      "When viewing a recipe, click 'Add to Shopping List' to include all ingredients. You can manage multiple lists, edit quantities, check off items as you shop, and even share lists with family members.",
    category: "Shopping & Meal Planning",
  },
  {
    id: "shopping-2",
    question: "Can I plan meals for the entire week?",
    answer:
      "Yes, our Meal Planner feature allows you to schedule recipes for breakfast, lunch, dinner, and snacks for any date range. The planner automatically generates a consolidated shopping list for all planned meals.",
    category: "Shopping & Meal Planning",
  },
  {
    id: "shopping-3",
    question: "Does Grocery Match partner with any grocery delivery services?",
    answer:
      "We currently have partnerships with several major grocery delivery services. When you create a shopping list, you can select 'Order Ingredients' to connect with available delivery services in your area.",
    category: "Shopping & Meal Planning",
  },

  // Privacy & Security FAQs
  {
    id: "privacy-1",
    question: "How is my personal information used?",
    answer:
      "We use your personal information only for providing and improving our service. We do not sell your data to third parties. Please review our Privacy Policy for comprehensive information on how we handle user data.",
    category: "Privacy & Security",
  },
  {
    id: "privacy-2",
    question: "Can I delete my account and all associated data?",
    answer:
      "Yes. Go to 'Account Settings' and select 'Delete Account'. This will permanently remove your account and all associated data. This action cannot be undone, so please consider exporting any data you wish to keep.",
    category: "Privacy & Security",
  },

  // Technical Support FAQs
  {
    id: "support-1",
    question: "What should I do if I encounter a bug?",
    answer:
      "If you encounter a bug, please report it through the 'Report an Issue' form in our Help Center. Include as much detail as possible, including steps to reproduce the issue, your device type, and browser information.",
    category: "Technical Support",
  },
  {
    id: "support-2",
    question: "Is Grocery Match available as a mobile app?",
    answer:
      "No,Right Now Grocery Match is not available as a mobile app for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store Very Soon.",
    category: "Technical Support",
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories
  const categories = Array.from(new Set(faqItems.map((item) => item.category)));

  // Filter FAQs based on search term
  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered FAQs by category
  const groupedFAQs = categories
    .map((category) => ({
      category,
      items: filteredFAQs.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search FAQs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ content */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">
              No FAQs found matching "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {groupedFAQs.map((group) => (
              <div key={group.category} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {group.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {group.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border rounded-md p-2"
                    >
                      <AccordionTrigger className="text-left font-medium px-2">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-2 pt-2 text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default FAQ;
