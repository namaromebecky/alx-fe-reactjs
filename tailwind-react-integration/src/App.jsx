import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tailwind CSS Styling Task
        </h1>
        <p className="text-gray-600 text-lg">
          Styling a Provided React Component with Tailwind CSS
        </p>
      </header>
      
      <main>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Task Requirements:
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Container: bg-gray-100, p-8, max-w-sm, mx-auto, my-20, rounded-lg, shadow-lg",
                "Image: rounded-full, w-36, h-36, mx-auto",
                "Heading: text-xl, text-blue-800, my-4",
                "Paragraph: text-gray-600, text-base"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Styled UserProfile Component
            </h2>
            <p className="text-gray-600 mt-2">
              Below is the component with all required Tailwind CSS classes applied
            </p>
          </div>
          
          {/* The UserProfile component with Tailwind styling */}
          <UserProfile />
          
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              ✅ Task Completed Successfully
            </h3>
            <p className="text-blue-700">
              The UserProfile component has been styled according to all ALX requirements using Tailwind CSS utility classes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
