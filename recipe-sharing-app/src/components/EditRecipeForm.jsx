import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [isEditing, setIsEditing] = useState(false);
  
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
    
    updateRecipe(recipe.id, {
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      cookingTime: parseInt(cookingTime) || 0
    });
    
    setIsEditing(false);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (onClose) onClose();
  };

  if (!isEditing) {
    return (
      <button 
        className="edit-btn"
        onClick={() => setIsEditing(true)}
      >
        Edit Recipe
      </button>
    );
  }

  return (
    <div className="edit-modal">
      <div className="modal-content">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="edit-title">Recipe Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Chocolate Chip Cookies"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your recipe..."
              rows="2"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-ingredients">Ingredients (comma separated)</label>
            <textarea
              id="edit-ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="flour, sugar, eggs, ..."
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-instructions">Instructions</label>
            <textarea
              id="edit-instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step instructions..."
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="edit-cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="30"
              min="1"
              required
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeForm;