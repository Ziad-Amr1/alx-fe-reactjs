import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock user data for demonstration
const MOCK_USERS = {
  'user1': { id: 'user1', name: 'Alice', preferences: ['italian', 'vegetarian'] },
  'user2': { id: 'user2', name: 'Bob', preferences: ['mexican', 'spicy'] },
  'user3': { id: 'user3', name: 'Charlie', preferences: ['dessert', 'baking'] }
};

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [
        {
          id: 1,
          title: "Classic Pancakes",
          description: "Fluffy homemade pancakes perfect for weekend breakfasts",
          ingredients: ["flour", "milk", "eggs", "baking powder", "sugar", "salt"],
          instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until bubbles form, then flip.",
          cookingTime: 20,
          category: "breakfast",
          difficulty: "easy",
          tags: ["breakfast", "vegetarian", "sweet"]
        },
        {
          id: 2,
          title: "Vegetable Stir Fry",
          description: "Quick and healthy vegetable stir fry with savory sauce",
          ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "garlic", "ginger"],
          instructions: "Chop vegetables. Heat oil in wok. Stir fry garlic and ginger, add vegetables and sauce.",
          cookingTime: 15,
          category: "main",
          difficulty: "medium",
          tags: ["vegetarian", "asian", "healthy"]
        },
        {
          id: 3,
          title: "Chocolate Chip Cookies",
          description: "Classic homemade chocolate chip cookies",
          ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
          instructions: "Cream butter and sugar. Add eggs and vanilla. Mix in dry ingredients. Bake at 350°F for 10-12 minutes.",
          cookingTime: 25,
          category: "dessert",
          difficulty: "easy",
          tags: ["dessert", "baking", "sweet"]
        },
        {
          id: 4,
          title: "Beef Stew",
          description: "Hearty beef stew with vegetables",
          ingredients: ["beef", "potatoes", "carrots", "onions", "beef broth", "herbs"],
          instructions: "Brown beef. Add vegetables and broth. Simmer for 2 hours until tender.",
          cookingTime: 120,
          category: "main",
          difficulty: "hard",
          tags: ["meat", "comfort food", "hearty"]
        },
        {
          id: 5,
          title: "Margherita Pizza",
          description: "Classic Italian pizza with tomatoes, mozzarella, and basil",
          ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
          instructions: "Roll out dough. Add toppings. Bake at 475°F for 10-12 minutes.",
          cookingTime: 30,
          category: "main",
          difficulty: "medium",
          tags: ["italian", "vegetarian", "pizza"]
        },
        {
          id: 6,
          title: "Guacamole",
          description: "Fresh and zesty Mexican guacamole",
          ingredients: ["avocados", "lime", "tomato", "onion", "cilantro", "jalapeno"],
          instructions: "Mash avocados. Mix in other ingredients. Season to taste.",
          cookingTime: 10,
          category: "appetizer",
          difficulty: "easy",
          tags: ["mexican", "spicy", "vegetarian"]
        }
      ],
      
      // User and favorites state
      currentUser: null,
      favorites: [],
      userPreferences: [],
      
      // Search and filter states
      searchTerm: '',
      selectedCategory: 'all',
      selectedDifficulty: 'all',
      maxCookingTime: 0,
      
      // Actions
      addRecipe: (newRecipe) => set((state) => ({ 
        recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
      })),
      
      updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map(recipe => 
          recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
        )
      })),
      
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id)
      })),
      
      // User actions
      setCurrentUser: (userId) => set({
        currentUser: MOCK_USERS[userId] || null,
        userPreferences: MOCK_USERS[userId]?.preferences || []
      }),
      
      logout: () => set({
        currentUser: null,
        userPreferences: []
      }),
      
      addFavorite: (recipeId) => set((state) => {
        if (!state.currentUser) return state;
        return { favorites: [...state.favorites, recipeId] };
      }),
      
      removeFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== recipeId)
      })),
      
      toggleFavorite: (recipeId) => set((state) => {
        if (!state.currentUser) return state;
        if (state.favorites.includes(recipeId)) {
          return { favorites: state.favorites.filter(id => id !== recipeId) };
        } else {
          return { favorites: [...state.favorites, recipeId] };
        }
      }),
      
      // Search and filter actions
      setSearchTerm: (term) => set({ searchTerm: term }),
      setCategory: (category) => set({ selectedCategory: category }),
      setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      setMaxCookingTime: (time) => set({ maxCookingTime: time }),
      
      // Computed filtered recipes
      get filteredRecipes() {
        const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxCookingTime } = get();
        
        return recipes.filter(recipe => {
          // Search term filter
          const matchesSearch = searchTerm === '' || 
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            recipe.tags.some(tag => 
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
          
          // Category filter
          const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
          
          // Difficulty filter
          const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
          
          // Cooking time filter
          const matchesCookingTime = maxCookingTime === 0 || recipe.cookingTime <= maxCookingTime;
          
          return matchesSearch && matchesCategory && matchesDifficulty && matchesCookingTime;
        });
      },
      
      // Get favorite recipes
      get favoriteRecipes() {
        const { recipes, favorites } = get();
        return recipes.filter(recipe => favorites.includes(recipe.id));
      },
      
      // Get recommended recipes
      get recommendedRecipes() {
        const { recipes, userPreferences, favorites } = get();
        
        if (userPreferences.length === 0) {
          // If no preferences, return popular recipes (not in favorites)
          return recipes
            .filter(recipe => !favorites.includes(recipe.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        }
        
        // Score recipes based on user preferences
        const scoredRecipes = recipes
          .filter(recipe => !favorites.includes(recipe.id)) // Exclude favorites
          .map(recipe => {
            let score = 0;
            
            // Score based on tags matching preferences
            recipe.tags.forEach(tag => {
              if (userPreferences.includes(tag)) {
                score += 2;
              }
            });
            
            // Score based on category (if it matches any preference)
            if (userPreferences.includes(recipe.category)) {
              score += 1;
            }
            
            // Add some randomness
            score += Math.random() * 0.5;
            
            return { ...recipe, score };
          })
          .filter(recipe => recipe.score > 0) // Only recipes with some match
          .sort((a, b) => b.score - a.score); // Sort by score
        
        return scoredRecipes.slice(0, 3); // Return top 3
      },
      
      // Get unique categories for filter options
      get categories() {
        const categories = [...new Set(get().recipes.map(recipe => recipe.category))];
        return ['all', ...categories];
      },
      
      // Get unique difficulties for filter options
      get difficulties() {
        const difficulties = [...new Set(get().recipes.map(recipe => recipe.difficulty))];
        return ['all', ...difficulties];
      },
      
      // Get max cooking time for slider
      get maxAvailableCookingTime() {
        const times = get().recipes.map(recipe => recipe.cookingTime);
        return Math.max(...times, 60); // Default to 60 if no recipes
      },
      
      // Get all tags for display
      get allTags() {
        const allTags = get().recipes.flatMap(recipe => recipe.tags);
        return [...new Set(allTags)];
      }
    }),
    {
      name: 'recipe-storage', // unique name
      partialize: (state) => ({ 
        favorites: state.favorites,
        userPreferences: state.userPreferences
      }),
    }
  )
);

export default useRecipeStore;