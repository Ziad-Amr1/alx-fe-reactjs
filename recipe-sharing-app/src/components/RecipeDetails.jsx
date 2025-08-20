import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  const favorites = useRecipeStore(state => state.favorites);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);
  const currentUser = useRecipeStore(state => state.currentUser);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="not-found">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Recipes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-header">
        <div>
          <div className="recipe-badges">
            <span className="category-badge">{recipe.category}</span>
            <span className={`difficulty-badge ${recipe.difficulty}`}>
              {recipe.difficulty}
            </span>
          </div>
          <h1>{recipe.title}</h1>
        </div>
        <div className="recipe-actions">
          <button 
            onClick={() => toggleFavorite(recipe.id)}
            className={`favorite-btn large ${favorites.includes(recipe.id) ? 'active' : ''}`}
            disabled={!currentUser}
            title={!currentUser ? "Please log in to add favorites" : ""}
          >
            {favorites.includes(recipe.id) ? '♥ Added to Favorites' : '♡ Add to Favorites'}
          </button>
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      <div className="recipe-meta">
        <span className="cooking-time">⏱️ {recipe.cookingTime} minutes</span>
        <div className="recipe-tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="instructions-section">
          <h2>Instructions</h2>
          <div className="instructions-text">
            {recipe.instructions.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;