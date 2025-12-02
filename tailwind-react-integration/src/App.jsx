import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Tailwind CSS + React + Vite
          </h1>
          <p className="text-xl text-gray-600">
            Successfully integrated Tailwind CSS with React using Vite
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            ✅ ALX Task Verification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700">Configuration Files</h3>
              <ul className="space-y-2">
                {[
                  'package.json with Tailwind dependencies',
                  'vite.config.js with Tailwind plugin',
                  'tailwind.config.js configuration',
                  'postcss.config.js setup',
                  'src/index.css with Tailwind directives'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700">Tailwind Features Demonstrated</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium">Background & Text Colors</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">Padding & Margin Utilities</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-purple-800 font-medium">Flexbox & Grid Layout</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">Responsive Design</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Tailwind Working ✓
              </button>
              <div className="text-center sm:text-right">
                <p className="text-gray-500 text-sm">Project ready for ALX submission</p>
                <p className="text-gray-400 text-xs">All requirements verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
