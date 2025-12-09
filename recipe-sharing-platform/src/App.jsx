import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Navigation - Now inside Router */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-amber-600">🍳 RecipeShare</a>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-amber-600 font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Recipes</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Categories</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Submit Recipe</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">About</a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-gray-700 hover:text-amber-600">
                  🔍
                </button>
                <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-4">🍳 RecipeShare</div>
                <p className="text-gray-400">
                  A platform for food lovers to share and discover amazing recipes from around the world.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/" className="hover:text-amber-400">Home</a></li>
                  <li><a href="#" className="hover:text-amber-400">Browse Recipes</a></li>
                  <li><a href="#" className="hover:text-amber-400">Submit Recipe</a></li>
                  <li><a href="#" className="hover:text-amber-400">Community</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-amber-400">Vegetarian</a></li>
                  <li><a href="#" className="hover:text-amber-400">Desserts</a></li>
                  <li><a href="#" className="hover:text-amber-400">Quick Meals</a></li>
                  <li><a href="#" className="hover:text-amber-400">Healthy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <p className="text-gray-400 mb-4">Subscribe to get weekly recipe updates</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-lg flex-grow text-gray-900"
                  />
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>© 2024 RecipeShare. All rights reserved. | ALX Frontend Project</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
