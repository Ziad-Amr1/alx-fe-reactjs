import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeFilters = () => {
  const categories = useRecipeStore(state => state.categories);
  const difficulties = useRecipeStore(state => state.difficulties);
  const maxAvailableCookingTime = useRecipeStore(state => state.maxAvailableCookingTime);
  
  const selectedCategory = useRecipeStore(state => state.selectedCategory);
  const selectedDifficulty = useRecipeStore(state => state.selectedDifficulty);
  const maxCookingTime = useRecipeStore(state => state.maxCookingTime);
  
  const setCategory = useRecipeStore(state => state.setCategory);
  const setDifficulty = useRecipeStore(state => state.setDifficulty);
  const setMaxCookingTime = useRecipeStore(state => state.setMaxCookingTime);
  
  const clearFilters = () => {
    setCategory('all');
    setDifficulty('all');
    setMaxCookingTime(0);
  };

  return (
    <div className="recipe-filters">
      <h3>Filter Recipes</h3>
      
      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select 
          id="category-filter"
          value={selectedCategory} 
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="difficulty-filter">Difficulty</label>
        <select 
          id="difficulty-filter"
          value={selectedDifficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="filter-select"
        >
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="cooking-time-filter">
          Max Cooking Time: {maxCookingTime === 0 ? 'Any' : `${maxCookingTime} min`}
        </label>
        <input
          id="cooking-time-filter"
          type="range"
          min="0"
          max={maxAvailableCookingTime}
          step="5"
          value={maxCookingTime}
          onChange={(e) => setMaxCookingTime(parseInt(e.target.value))}
          className="filter-slider"
        />
        <div className="slider-labels">
          <span>Any</span>
          <span>{maxAvailableCookingTime} min</span>
        </div>
      </div>
      
      <button onClick={clearFilters} className="clear-filters-btn">
        Clear All Filters
      </button>
    </div>
  );
};

export default RecipeFilters;