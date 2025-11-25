import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>GitHub User Search</h1>
          <p>Search and discover GitHub users with advanced filters</p>
        </div>
      </header>
      <main className="App-main">
        <Search />
      </main>
      <footer className="App-footer">
        <p>Built with React and GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
