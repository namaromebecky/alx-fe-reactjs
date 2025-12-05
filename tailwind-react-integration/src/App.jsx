import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Responsive UserProfile Component
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Resize your browser to see responsive design in action
        </p>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <UserProfile />
        
        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2">
            ✅ Responsive Design Implemented
          </h3>
          <p className="text-green-700 text-sm md:text-base">
            Component adapts to different screen sizes using Tailwind CSS responsive utilities.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
