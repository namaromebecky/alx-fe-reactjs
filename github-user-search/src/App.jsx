import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">GitHub User Search</h1>
            </div>
            <div className="text-sm text-gray-500">
              Search and discover GitHub users with advanced filters
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <Search />
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-center text-gray-500 text-sm">
            Built with React, Tailwind CSS, and GitHub API
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
