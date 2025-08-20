import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h2>Shared Recipes ({recipes.length})</h2>
      
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes yet. Be the first to share one!</p>
      ) : (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-details">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  
                  <div className="ingredients-preview">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li>+{recipe.ingredients.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;