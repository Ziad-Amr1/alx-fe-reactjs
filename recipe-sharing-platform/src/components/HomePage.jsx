// src/components/HomePage.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipeData from '../data.json'; // Import the mock data

const HomePage = () => {
  // State to hold our recipes
  const [recipes, setRecipes] = useState([]);

  // 'Load' the data when the component mounts
  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Delicious Recipes</h1>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {/* Recipe Image */}
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-48 object-cover" 
            />
            {/* Recipe Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
              {/* Link to Detail Page (We'll add this in Task 2) */}
              <Link to={`/recipe/${recipe.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;