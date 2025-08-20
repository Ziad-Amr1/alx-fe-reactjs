import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    setShowConfirm(false);
    navigate('/');
  };

  if (showConfirm) {
    return (
      <div className="delete-confirm">
        <p>Are you sure you want to delete this recipe?</p>
        <div className="confirm-buttons">
          <button className="confirm-delete-btn" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button className="cancel-delete-btn" onClick={() => setShowConfirm(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button 
      className="delete-btn"
      onClick={() => setShowConfirm(true)}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;