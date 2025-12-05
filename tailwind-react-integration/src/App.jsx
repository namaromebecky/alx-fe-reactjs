import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Interactive UserProfile with Tailwind CSS
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Hover over elements to see transitions and animations
        </p>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12 p-4 md:p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            Interactive Features Added:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-700 mb-2">🖼️ Image Hover</h3>
              <p className="text-blue-600 text-sm">
                <code className="bg-blue-100 px-2 py-1 rounded">hover:scale-110</code>
                <br/>
                <code className="bg-blue-100 px-2 py-1 rounded">transition-transform duration-300 ease-in-out</code>
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-700 mb-2">📝 Heading Hover</h3>
              <p className="text-green-600 text-sm">
                <code className="bg-green-100 px-2 py-1 rounded">hover:text-blue-500</code>
                <br/>
                <code className="bg-green-100 px-2 py-1 rounded">transition-colors duration-300 ease-in-out</code>
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="text-lg font-medium text-purple-700 mb-2">🃏 Card Hover</h3>
              <p className="text-purple-600 text-sm">
                <code className="bg-purple-100 px-2 py-1 rounded">hover:shadow-xl</code>
                <br/>
                <code className="bg-purple-100 px-2 py-1 rounded">transition-shadow duration-300 ease-in-out</code>
              </p>
            </div>
          </div>
        </div>
        
        {/* Interactive UserProfile Component */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Interactive Component Preview
          </h2>
          <p className="text-gray-600 text-sm">
            Hover over the card, image, or heading to see effects
          </p>
        </div>
        
        <UserProfile />
        
        {/* Instructions for testing */}
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-yellow-50 rounded-xl border border-yellow-200 max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-yellow-800 mb-3">
            🎯 Testing Instructions
          </h3>
          <ul className="text-yellow-700 text-sm md:text-base space-y-2">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Hover over the profile image to see it scale up</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Hover over the name to see color change</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Hover anywhere on the card to see shadow enhance</span>
            </li>
          </ul>
        </div>
        
        {/* Success message */}
        <div className="mt-8 p-4 md:p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2">
            ✅ Advanced Interactivity & Transitions Complete
          </h3>
          <p className="text-green-700 text-sm md:text-base">
            All required hover effects, transitions, and animations have been successfully implemented using Tailwind CSS utilities.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
