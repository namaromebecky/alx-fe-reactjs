import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    difficulty: 'Easy',
    category: 'Main Course'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!recipe.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!recipe.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!recipe.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }
    
    if (!recipe.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }
    
    if (!recipe.cookingTime || Number(recipe.cookingTime) <= 0) {
      newErrors.cookingTime = 'Valid cooking time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Get existing recipes from localStorage or initialize empty array
    const existingRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    
    // Create new recipe object with ID
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      cookingTime: parseInt(recipe.cookingTime),
      ingredients: recipe.ingredients.split('\n').filter(ing => ing.trim()),
      createdAt: new Date().toISOString()
    };

    // Add new recipe to array
    const updatedRecipes = [...existingRecipes, newRecipe];
    
    // Save to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    
    // Reset form
    setRecipe({
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      cookingTime: '',
      difficulty: 'Easy',
      category: 'Main Course'
    });
    
    // Navigate back to recipe list
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Add New Recipe</h2>
              <p className="mt-2 text-gray-600">Fill in the details to add a new recipe to your collection.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={recipe.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter recipe title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={recipe.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the recipe"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cooking Time */}
                <div>
                  <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
                    Cooking Time (minutes) *
                  </label>
                  <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    min="1"
                    value={recipe.cookingTime}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cookingTime ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 30"
                  />
                  {errors.cookingTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.cookingTime}</p>
                  )}
                </div>

                {/* Difficulty */}
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={recipe.difficulty}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={recipe.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Salad">Salad</option>
                    <option value="Soup">Soup</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                  Ingredients * (one per line)
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  rows="4"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.ingredients ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter ingredients, one per line..."
                />
                {errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
                )}
              </div>

              {/* Instructions */}
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                  Instructions * (step by step)
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows="6"
                  value={recipe.instructions}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.instructions ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter step-by-step instructions..."
                />
                {errors.instructions && (
                  <p className="mt-1 text-sm text-red-600">{errors.instructions}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition duration-150 ease-in-out"
                >
                  Add Recipe
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/recipes')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-medium transition duration-150 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
