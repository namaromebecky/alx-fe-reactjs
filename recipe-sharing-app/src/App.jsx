import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Recipe Sharing App</h1>
          <p>Share and discover amazing recipes!</p>
        </header>
        
        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <>
                  <div className="app-controls">
                    <AddRecipeForm />
                    <div className="search-section">
                      <SearchBar />
                    </div>
                  </div>
                  <RecipeList />
                </>
              } />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
