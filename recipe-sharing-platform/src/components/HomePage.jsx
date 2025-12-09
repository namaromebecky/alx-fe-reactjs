import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our collection of delicious recipes from around the world. 
            Find inspiration for your next meal!
          </p>
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full font-medium">
              {recipes.length} Recipes Available
            </span>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Recipes
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>

                {/* Recipe Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors duration-200">
                      {recipe.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {recipe.prepTime}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {recipe.summary}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/recipe/${recipe.id}`}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 font-medium"
                    >
                      View Recipe
                    </Link>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                        <span className="text-lg">❤️</span>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                        <span className="text-lg">🔗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{recipes.length}</div>
              <p className="text-amber-100">Total Recipes</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {recipes.filter(r => r.difficulty === 'Easy').length}
              </div>
              <p className="text-amber-100">Easy Recipes</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {recipes.filter(r => r.difficulty === 'Medium' || r.difficulty === 'Hard').length}
              </div>
              <p className="text-amber-100">Challenging Recipes</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to share your own recipe?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of food enthusiasts and share your culinary creations with the world.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Share Your Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
