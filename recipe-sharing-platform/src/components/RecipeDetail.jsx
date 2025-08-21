// src/components/RecipeDetail.jsx
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  
  // Find the recipe with the matching ID
  const recipe = recipeData.find(recipe => recipe.id === parseInt(id));

  // If recipe is not found, display a message
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Recipe not found!</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back to homepage</Link>
      </div>
    );
  }

  // If recipe is found, display its details
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Recipes</Link>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>
      
      <div className="bg-gray-100 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {/* You would add real ingredients here from your data */}
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          <li>Ingredient 3</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3">
          {/* You would add real instructions here from your data */}
          <li>Step 1: Do this first...</li>
          <li>Step 2: Then do this...</li>
          <li>Step 3: Finally, enjoy!</li>
          {/* useEffect */}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;