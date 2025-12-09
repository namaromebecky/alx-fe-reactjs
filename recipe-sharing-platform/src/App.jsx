function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-600 mb-4">
            🍳 Recipe Sharing Platform
          </h1>
          <p className="text-gray-600 text-lg">
            A platform to share, discover, and create delicious recipes
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-amber-500 text-3xl mb-4">📖</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Browse Recipes</h2>
              <p className="text-gray-600">
                Discover thousands of recipes from around the world, curated by food enthusiasts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-amber-500 text-3xl mb-4">➕</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Share Your Recipes</h2>
              <p className="text-gray-600">
                Share your favorite recipes with the community and get feedback from other food lovers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-amber-500 text-3xl mb-4">❤️</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Save Favorites</h2>
              <p className="text-gray-600">
                Save your favorite recipes to your personal collection for easy access anytime.
              </p>
            </div>
          </div>

          {/* Tailwind Verification Section */}
          <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              ✅ Tailwind CSS Successfully Integrated!
            </h2>
            <div className="space-y-3">
              <p className="text-green-700">
                This application uses Tailwind CSS for styling. Below are some Tailwind classes in action:
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium">
                  bg-amber-500
                </span>
                <span className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
                  bg-green-500
                </span>
                <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
                  bg-blue-500
                </span>
                <span className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium">
                  bg-red-500
                </span>
                <span className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium">
                  bg-purple-500
                </span>
              </div>
            </div>
          </div>

          {/* Project Setup Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🚀 Project Setup Complete
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Technologies Used:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• React with Vite</li>
                  <li>• Tailwind CSS</li>
                  <li>• PostCSS & Autoprefixer</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Next Steps:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Create recipe components</li>
                  <li>• Implement routing</li>
                  <li>• Add recipe form</li>
                  <li>• Build recipe details page</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>Recipe Sharing Platform • Built with React & Tailwind CSS</p>
          <p className="text-sm mt-2">ALX Frontend Specialization Project</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
