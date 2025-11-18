import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Sharing App</h1>
        <p>Share and discover amazing recipes!</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <AddRecipeForm />
          <RecipeList />
        </div>
      </main>
    </div>
  )
}

export default App
