import { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState(''); // Added steps state

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Simple validation
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required.';
    if (!summary) newErrors.summary = 'Summary is required.';
    if (!steps) newErrors.steps = 'Preparation steps are required.'; // Added validation for steps

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    // Clear errors if validation passes
    setErrors({});

    // Create a new recipe object
    const newRecipe = {
      id: Math.floor(Math.random() * 10000),
      title,
      image: image || 'https://via.placeholder.com/150',
      summary,
      ingredients: ingredients.split(',').map(item => item.trim()),
      steps: steps.split('\n').filter(step => step.trim() !== ''), // Added steps processing
    };

    // Call the function passed from the parent (HomePage) to add the new recipe
    onAddRecipe(newRecipe);

    // Reset the form fields
    setTitle('');
    setImage('');
    setSummary('');
    setIngredients('');
    setSteps(''); // Reset steps field
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Image Input */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Summary Textarea */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            rows="3"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary}</p>}
        </div>

        {/* Ingredients Textarea */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
          <textarea
            id="ingredients"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Flour, Sugar, Eggs..."
          ></textarea>
        </div>

        {/* Steps Textarea - ADDED THIS FIELD */}
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Preparation Steps (one per line)</label>
          <textarea
            id="steps"
            rows="5"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="1. Preheat oven to 350°F...
2. Mix dry ingredients...
3. Add wet ingredients..."
          ></textarea>
          {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;