import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-3 md:mb-4">
          Responsive Design with Tailwind CSS
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Making the UserProfile component responsive across all screen sizes
        </p>
      </header>
      
      <main>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 sm:mb-3 md:mb-4">
              Responsive Requirements:
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-700">Container Adjustments:</h3>
                <ul className="space-y-2">
                  {[
                    "Padding: p-4 (mobile) → p-6 (sm) → p-8 (md+)",
                    "Max width: max-w-xs (mobile/sm) → max-w-sm (md+)",
                    "Margin: my-8 (mobile) → my-12 (sm) → my-20 (md+)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-700">Typography & Image:</h3>
                <ul className="space-y-2">
                  {[
                    "Heading: text-lg (mobile/sm) → text-xl (md+)",
                    "Paragraph: text-sm (mobile/sm) → text-base (md+)",
                    "Image: w-24 h-24 (mobile) → w-28 h-28 (sm) → w-36 h-36 (md+)"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6 sm:mb-7 md:mb-8">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Responsive UserProfile Component
            </h2>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base mt-2">
              Resize your browser to see the component adapt to different screen sizes
            </p>
          </div>
          
          {/* The responsive UserProfile component */}
          <UserProfile />
          
          {/* Screen size indicators */}
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-red-700 font-medium mb-2">📱 Mobile</div>
              <div className="text-red-600 text-sm space-y-1">
                <p>Padding: p-4</p>
                <p>Image: 96×96px</p>
                <p>Text: Smaller</p>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <div className="text-yellow-700 font-medium mb-2">💻 Small Tablet</div>
              <div className="text-yellow-600 text-sm space-y-1">
                <p>Padding: p-6</p>
                <p>Image: 112×112px</p>
                <p>Text: Medium</p>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-green-700 font-medium mb-2">🖥️ Desktop</div>
              <div className="text-green-600 text-sm space-y-1">
                <p>Padding: p-8</p>
                <p>Image: 144×144px</p>
                <p>Text: Larger</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-5 md:p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg sm:text-lg md:text-xl font-semibold text-blue-800 mb-2 sm:mb-2 md:mb-3">
              ✅ Responsive Design Completed Successfully
            </h3>
            <p className="text-blue-700 text-sm sm:text-sm md:text-base">
              The UserProfile component now adapts to different screen sizes using Tailwind CSS responsive utilities (sm:, md: breakpoints).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
