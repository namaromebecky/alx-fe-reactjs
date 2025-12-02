function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ✅ Tailwind CSS is Working! 🎉
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Successfully integrated Tailwind CSS with React + Vite
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            ALX Task Completed
          </h2>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              React app created with Vite
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tailwind CSS v4 installed
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Vite plugin configured
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tailwind imported in CSS
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Utility classes working
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
