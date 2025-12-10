import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  
  // Form state - exactly as required: title, ingredients, preparation steps
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
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

  // Validation function - exactly as specified
  const validateForm = () => {
    const newErrors = {};

    // Check if title is empty
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    // Check if ingredients is empty
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      // Check that ingredients list includes at least two items
      const ingredientLines = formData.ingredients.split('\n').filter(line => line.trim());
      if (ingredientLines.length < 2) {
        newErrors.ingredients = 'Please include at least two ingredients';
      }
    }

    // Check if preparation steps is empty
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare recipe data
      const recipeData = {
        title: formData.title,
        ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
        steps: formData.steps.split('\n').filter(line => line.trim()),
        id: Date.now(), // Generate unique ID
        summary: 'A delicious recipe submitted by our community',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        prepTime: '30 min',
        difficulty: 'Medium',
        category: 'User Submitted',
        author: 'You',
        rating: 5.0
      };

      console.log('Recipe submitted:', recipeData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
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
      ingredients: '',
      steps: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your delicious recipe with our community
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Recipe submitted successfully! Redirecting to home page...
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter recipe title (e.g., Chocolate Chip Cookies)"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Ingredients - Textarea as specified */}
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients *
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                  errors.ingredients ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter ingredients, one per line:
• 2 cups all-purpose flour
• 1 cup chocolate chips
• 1 cup butter
• 1 cup sugar
• 2 eggs"
              />
              {errors.ingredients && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.ingredients}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Enter each ingredient on a new line. At least two ingredients are required.
              </p>
            </div>

            {/* Preparation Steps - Textarea as specified */}
            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Steps *
              </label>
              <textarea
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleInputChange}
                rows="8"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                  errors.steps ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter preparation steps, one per line:
1. Preheat oven to 350°F (175°C)
2. Cream together butter and sugar
3. Beat in eggs one at a time
4. Mix in flour and chocolate chips
5. Bake for 10-12 minutes"
              />
              {errors.steps && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.steps}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Enter each step on a new line. Number the steps for clarity.
              </p>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
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
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
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
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            📝 Form Requirements
          </h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span><strong>Recipe Title:</strong> Required field</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span><strong>Ingredients:</strong> Textarea field with at least 2 items</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span><strong>Preparation Steps:</strong> Textarea field with step-by-step instructions</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <span><strong>Validation:</strong> All fields must be filled before submission</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
