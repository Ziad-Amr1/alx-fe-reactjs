import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import SearchBar from './SearchBar';
import RecipeFilters from './RecipeFilters';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const selectedCategory = useRecipeStore(state => state.selectedCategory);
  const selectedDifficulty = useRecipeStore(state => state.selectedDifficulty);
  const maxCookingTime = useRecipeStore(state => state.maxCookingTime);
  const favorites = useRecipeStore(state => state.favorites);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);
  const currentUser = useRecipeStore(state => state.currentUser);

  // Check if any filters are active
  const isFiltered = searchTerm !== '' || 
                    selectedCategory !== 'all' || 
                    selectedDifficulty !== 'all' || 
                    maxCookingTime !== 0;

  return (
    <div className="recipe-list">
      <div className="search-filters-container">
        <SearchBar />
        <RecipeFilters />
      </div>
      
      <div className="results-header">
        <h2>
          {isFiltered ? 'Filtered Recipes' : 'All Recipes'} 
          <span className="results-count"> ({filteredRecipes.length})</span>
        </h2>
        
        {isFiltered && (
          <div className="active-filters">
            {searchTerm && (
              <span className="active-filter">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="active-filter">
                Category: {selectedCategory}
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span className="active-filter">
                Difficulty: {selectedDifficulty}
              </span>
            )}
            {maxCookingTime !== 0 && (
              <span className="active-filter">
                Max Time: {maxCookingTime}min
              </span>
            )}
          </div>
        )}
      </div>
      
      {filteredRecipes.length === 0 ? (
        <div className="no-results">
          <h3>No recipes found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="recipes-container">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="recipe-badges">
                  <span className="category-badge">{recipe.category}</span>
                  <span className={`difficulty-badge ${recipe.difficulty}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                
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
              
              <button 
                onClick={() => toggleFavorite(recipe.id)}
                className={`favorite-btn ${favorites.includes(recipe.id) ? 'active' : ''}`}
                disabled={!currentUser}
                aria-label={favorites.includes(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                title={!currentUser ? "Please log in to add favorites" : ""}
              >
                {favorites.includes(recipe.id) ? '♥' : '♡'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;