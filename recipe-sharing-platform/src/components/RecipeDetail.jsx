import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, ChefHat } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const foundRecipe = data.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading recipe details...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
        <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Recipes
            </button>
            <div className="text-2xl font-bold text-amber-600">🍳 RecipeShare</div>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-2">
                {recipe.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {recipe.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(recipe.rating)}</div>
              <span className="text-gray-600">({recipe.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-500" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-500" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-amber-500" />
              <span>Serves: {recipe.servings}</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-amber-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {recipe.difficulty}
              </span>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
            <img
              src={recipe.authorAvatar}
              alt={recipe.author}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium text-gray-900">By {recipe.author}</p>
              <p className="text-gray-500 text-sm">Food Enthusiast & Recipe Creator</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recipe Image & Tags */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Recipe Description */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Recipe</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {recipe.summary} This recipe has been perfected over time and is loved by home cooks worldwide. 
                Follow the instructions carefully for the best results.
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-700">{step}</p>
                      {index < recipe.instructions.length - 1 && (
                        <div className="border-l-2 border-amber-200 h-6 ml-5 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Ingredients & Nutrition */}
          <div className="space-y-8">
            {/* Ingredients Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              {/* Servings Adjuster */}
              <div className="mt-8 p-4 bg-amber-50 rounded-lg">
                <p className="text-gray-700 font-medium mb-2">Adjust Servings:</p>
                <div className="flex items-center space-x-4">
                  <button className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600">
                    -
                  </button>
                  <span className="text-lg font-bold">{recipe.servings} servings</span>
                  <button className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Nutrition Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Calories</span>
                  <span className="text-xl font-bold text-gray-900">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Protein</span>
                  <span className="text-lg font-medium text-gray-900">{recipe.nutrition.protein}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Carbohydrates</span>
                  <span className="text-lg font-medium text-gray-900">{recipe.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fat</span>
                  <span className="text-lg font-medium text-gray-900">{recipe.nutrition.fat}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">*Per serving</p>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Love this recipe?</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  ❤️ Save to Favorites
                </button>
                <button className="w-full py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  📝 Add Notes
                </button>
                <button className="w-full py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  📤 Share Recipe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Recipes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((suggestedId) => {
              const suggestedRecipe = recipe.id === suggestedId 
                ? recipe 
                : { id: suggestedId, title: `Suggested Recipe ${suggestedId}`, image: recipe.image };
              
              return (
                <div
                  key={suggestedId}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => navigate(`/recipe/${suggestedId}`)}
                >
                  <img
                    src={suggestedRecipe.image}
                    alt={suggestedRecipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{suggestedRecipe.title}</h3>
                    <p className="text-gray-600 text-sm">A delicious recipe you'll love</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
