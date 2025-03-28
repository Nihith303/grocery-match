Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Setting up Google Gemini API

This project uses Google Gemini API for generating recipes. Follow these steps to set it up:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and create an account if you don't have one
2. Create a new API key
3. Copy the `.env.example` file to a new file named `.env`
4. Add your Gemini API key to the `.env` file: `VITE_GEMINI_API_KEY=your_key_here`
5. Restart your development server

Note: The recipe generation feature is limited to 3 requests per user per day to prevent API abuse.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Gemini API for AI recipe generation
- Supabase for authentication and data storage

