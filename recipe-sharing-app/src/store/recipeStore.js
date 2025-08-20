import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Pancakes",
      description: "Fluffy homemade pancakes perfect for weekend breakfasts",
      ingredients: ["flour", "milk", "eggs", "baking powder", "sugar", "salt"],
      instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until bubbles form, then flip.",
      cookingTime: 20
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy vegetable stir fry with savory sauce",
      ingredients: ["broccoli", "carrots", "bell peppers", "soy sauce", "garlic", "ginger"],
      instructions: "Chop vegetables. Heat oil in wok. Stir fry garlic and ginger, add vegetables and sauce.",
      cookingTime: 15
    }
  ],
  
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
  })),
  
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore;