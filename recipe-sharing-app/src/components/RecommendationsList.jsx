import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendedRecipes = useRecipeStore(state => state.recommendedRecipes);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);
  const favorites = useRecipeStore(state => state.favorites);
  const currentUser = useRecipeStore(state => state.currentUser);
  const userPreferences = useRecipeStore(state => state.userPreferences);

  if (!currentUser) {
    return (
      <div className="recommendations-list">
        <h2>Personalized Recommendations</h2>
        <div className="login-prompt">
          <p>Please log in to get personalized recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <h2>Recommended For You</h2>
      <p className="recommendations-subtitle">
        Based on your preferences: {userPreferences.join(', ')}
      </p>
      
      {recommendedRecipes.length === 0 ? (
        <div className="no-recommendations">
          <p>We need more information about your preferences to make recommendations.</p>
          <p>Start favoriting recipes to get better suggestions!</p>
        </div>
      ) : (
        <div className="recommendations-container">
          {recommendedRecipes.map((recipe) => (
            <div key={recipe.id} className="recommendation-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-details">
                  <span className="cooking-time">⏱️ {recipe.cookingTime} min</span>
                  <span className="category-badge">{recipe.category}</span>
                </div>
                
                <div className="recipe-tags">
                  {recipe.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Link>
              
              <button 
                onClick={() => toggleFavorite(recipe.id)}
                className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
                aria-label={favorites.includes(recipe.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {favorites.includes(recipe.id) ? '♡' : '♡'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;