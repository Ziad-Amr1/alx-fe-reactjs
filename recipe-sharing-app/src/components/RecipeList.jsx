import React from 'react';
import useRecipeStore from '../store/recipeStore';

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
              <h3>{recipe.title}</h3>
              <p className="recipe-description">{recipe.description}</p>
              
              <div className="recipe-details">
                <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                
                <div className="ingredients">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="instructions">
                  <h4>Instructions:</h4>
                  <p>{recipe.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;