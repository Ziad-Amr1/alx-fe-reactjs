// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipeData from '../data.json'; // Import the mock data

// ... existing imports ...
import AddRecipeForm from './AddRecipeForm'; // Import the form

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  // Function to handle adding a new recipe
  const handleAddRecipe = (newRecipe) => {
    // Update the state with the new recipe
    setRecipes([newRecipe, ...recipes]); // Adds new recipe to the top of the list
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Add the form at the top */}
      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Delicious Recipes</h1>
      {/* ... rest of the homepage JSX (the grid) ... */}
    </div>
  );
};
// ... export ...

export default HomePage;