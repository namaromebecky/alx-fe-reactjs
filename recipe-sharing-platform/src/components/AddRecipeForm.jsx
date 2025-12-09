import React, { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    steps: '' // Adding the missing steps field
  });

  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.steps.trim()) newErrors.steps = 'Steps are required';
    if (!formData.prepTime || Number(formData.prepTime) <= 0) newErrors.prepTime = 'Valid prep time is required';
    if (!formData.cookTime || Number(formData.cookTime) <= 0) newErrors.cookTime = 'Valid cook time is required';
    if (!formData.servings || Number(formData.servings) <= 0) newErrors.servings = 'Valid servings count is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Format ingredients and steps as arrays
    const recipeToAdd = {
      ...formData,
      ingredients: formData.ingredients.split('\n').filter(item => item.trim()),
      steps: formData.steps.split('\n').filter(step => step.trim()),
      prepTime: Number(formData.prepTime),
      cookTime: Number(formData.cookTime),
      servings: Number(formData.servings)
    };
    
    onAddRecipe(recipeToAdd);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      steps: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Add New Recipe</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to add your delicious recipe</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Recipe Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="Enter recipe title"
              />
              {errors.title && <p className="mt-2 text-red-600 text-sm">{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="Brief description of the recipe"
              />
              {errors.description && <p className="mt-2 text-red-600 text-sm">{errors.description}</p>}
            </div>

            {/* Time and Servings - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Prep Time (min) *</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.prepTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="e.g., 15"
                />
                {errors.prepTime && <p className="mt-2 text-red-600 text-sm">{errors.prepTime}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Cook Time (min) *</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.cookTime ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="e.g., 30"
                />
                {errors.cookTime && <p className="mt-2 text-red-600 text-sm">{errors.cookTime}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Servings *</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.servings ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                  placeholder="e.g., 4"
                />
                {errors.servings && <p className="mt-2 text-red-600 text-sm">{errors.servings}</p>}
              </div>
            </div>

            {/* Ingredients Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ingredients *</label>
              <p className="text-gray-500 text-sm mb-2">Enter each ingredient on a new line</p>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-3 rounded-lg border ${errors.ingredients ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
              />
              {errors.ingredients && <p className="mt-2 text-red-600 text-sm">{errors.ingredients}</p>}
            </div>

            {/* Steps Field - This was missing! */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Instructions (Steps) *</label>
              <p className="text-gray-500 text-sm mb-2">Enter each step on a new line</p>
              <textarea
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border ${errors.steps ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="Step 1: Preheat oven to 350°F&#10;Step 2: Mix dry ingredients..."
              />
              {errors.steps && <p className="mt-2 text-red-600 text-sm">{errors.steps}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition duration-300"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
