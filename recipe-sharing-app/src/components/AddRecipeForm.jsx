import React, { useState } from 'react';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
    
    addRecipe({
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      cookingTime: parseInt(cookingTime) || 0
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setCookingTime('');
    setShowForm(false);
  };

  return (
    <div className="add-recipe-form">
      {!showForm ? (
        <button 
          className="show-form-btn"
          onClick={() => setShowForm(true)}
        >
          + Share Your Recipe
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="recipe-form">
          <h2>Share a New Recipe</h2>
          
          <div className="form-group">
            <label htmlFor="title">Recipe Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Chocolate Chip Cookies"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your recipe..."
              rows="2"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients (comma separated)</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="flour, sugar, eggs, ..."
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step instructions..."
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="30"
              min="1"
              required
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Share Recipe
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddRecipeForm;