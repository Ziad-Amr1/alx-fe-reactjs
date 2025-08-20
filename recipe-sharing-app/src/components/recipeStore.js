import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Pancakes",
      description: "Fluffy homemade pancakes perfect for weekend breakfasts",
      ingredients: ["flour", "milk", "eggs", "baking powder", "sugar", "salt"],
      instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until bubbles form, then flip.",
      cookingTime: 20,
      category: "breakfast",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with savory sauce",
      ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "garlic", "ginger"],
      instructions: "Chop vegetables. Heat oil in wok. Stir fry garlic and ginger, add vegetables and sauce.",
      cookingTime: 15,
      category: "main",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
      instructions: "Cream butter and sugar. Add eggs and vanilla. Mix in dry ingredients. Bake at 350°F for 10-12 minutes.",
      cookingTime: 25,
      category: "dessert",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Beef Stew",
      description: "Hearty beef stew with vegetables",
      ingredients: ["beef", "potatoes", "carrots", "onions", "beef broth", "herbs"],
      instructions: "Brown beef. Add vegetables and broth. Simmer for 2 hours until tender.",
      cookingTime: 120,
      category: "main",
      difficulty: "hard"
    }
  ],
  
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
  }
}));

export default useRecipeStore;