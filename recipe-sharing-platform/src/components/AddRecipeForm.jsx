import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, AlertCircle, CheckCircle } from 'lucide-react';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '4',
    difficulty: 'Medium',
    ingredients: ['', ''], // Start with two empty ingredients
    instructions: ['', '', ''], // Start with three empty instructions
    summary: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  // Handle instruction changes
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: newInstructions,
    });
  };

  // Add new ingredient field
  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ''],
    });
  };

  // Remove ingredient field
  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        ingredients: newIngredients,
      });
    }
  };

  // Add new instruction field
  const addInstructionField = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ''],
    });
  };

  // Remove instruction field
  const removeInstructionField = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        instructions: newInstructions,
      });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Preparation time is required';
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = 'Cooking time is required';
    }

    if (!formData.summary.trim() || formData.summary.length < 20) {
      newErrors.summary = 'Please provide a summary (at least 20 characters)';
    }

    // Check for empty ingredients
    const emptyIngredients = formData.ingredients.filter(ing => !ing.trim());
    if (emptyIngredients.length > 0) {
      newErrors.ingredients = 'All ingredients must be filled';
    }

    // Check for empty instructions
    const emptyInstructions = formData.instructions.filter(inst => !inst.trim());
    if (emptyInstructions.length > 0) {
      newErrors.instructions = 'All instructions must be filled';
    }

    // Check at least 2 ingredients
    const validIngredients = formData.ingredients.filter(ing => ing.trim());
    if (validIngredients.length < 2) {
      newErrors.ingredients = 'At least 2 ingredients are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare recipe data
      const recipeData = {
        id: Date.now(), // Generate unique ID
        title: formData.title,
        category: formData.category,
        prepTime: formData.prepTime,
        cookTime: formData.cookTime,
        totalTime: `${formData.prepTime} + ${formData.cookTime}`,
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients.filter(ing => ing.trim()),
        instructions: formData.instructions.filter(inst => inst.trim()),
        summary: formData.summary,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        author: 'You',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
        rating: 5.0,
        reviews: 0,
        nutrition: {
          calories: 350,
          protein: '15g',
          carbs: '45g',
          fat: '12g'
        }
      };

      console.log('Recipe submitted:', recipeData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        resetForm();
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error submitting recipe:', error);
      setErrors({
        ...errors,
        submit: 'Failed to submit recipe. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      prepTime: '',
      cookTime: '',
      servings: '4',
      difficulty: 'Medium',
      ingredients: ['', ''],
      instructions: ['', '', ''],
      summary: '',
      tags: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your Recipe
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to add your delicious recipe to our collection
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Recipe submitted successfully!</p>
              <p className="text-green-600 text-sm">Redirecting to home page...</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recipe Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipe Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Spaghetti Carbonara"
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a category</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Salad">Salad</option>
                      <option value="Soup">Soup</option>
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prep Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preparation Time *
                    </label>
                    <input
                      type="text"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.prepTime ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 20 min"
                    />
                    {errors.prepTime && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.prepTime}
                      </p>
                    )}
                  </div>

                  {/* Cook Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cooking Time *
                    </label>
                    <input
                      type="text"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.cookTime ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 30 min"
                    />
                    {errors.cookTime && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.cookTime}
                      </p>
                    )}
                  </div>

                  {/* Servings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servings
                    </label>
                    <select
                      name="servings"
                      value={formData.servings}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'serving' : 'servings'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Italian, Vegetarian, Quick"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Summary *
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.summary ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Briefly describe your recipe..."
                  />
                  {errors.summary && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.summary}
                    </p>
                  )}
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Ingredients *
                  </h2>
                  <button
                    type="button"
                    onClick={addIngredientField}
                    className="flex items-center text-amber-600 hover:text-amber-700"
                  >
                    <Plus className="w-5 h-5 mr-1" />
                    Add Ingredient
                  </button>
                </div>
                
                {errors.ingredients && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.ingredients}
                  </p>
                )}

                <div className="space-y-4">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => handleIngredientChange(index, e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                            errors.ingredients && !ingredient.trim() ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                        />
                      </div>
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredientField(index)}
                          className="mt-3 p-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Instructions *
                  </h2>
                  <button
                    type="button"
                    onClick={addInstructionField}
                    className="flex items-center text-amber-600 hover:text-amber-700"
                  >
                    <Plus className="w-5 h-5 mr-1" />
                    Add Step
                  </button>
                </div>
                
                {errors.instructions && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.instructions}
                  </p>
                )}

                <div className="space-y-6">
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          rows="3"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                            errors.instructions && !instruction.trim() ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder={`Step ${index + 1} (e.g., Preheat oven to 350°F)`}
                        />
                      </div>
                      {formData.instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInstructionField(index)}
                          className="mt-3 p-2 text-gray-400 hover:text-red-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear Form
                </button>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Recipe'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Form Tips */}
          <div className="bg-gray-50 border-t border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              💡 Tips for a Great Recipe Submission
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Be specific with measurements (e.g., "1 cup flour" not "some flour")
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Number your instructions in the order they should be followed
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Include approximate cooking times for each step if possible
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Use descriptive tags to help others find your recipe
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
