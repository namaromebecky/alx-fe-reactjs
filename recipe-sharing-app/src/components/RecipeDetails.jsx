import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  )

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">← Back to Recipes</Link>
      </div>
    )
  }

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-actions">
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
      
      <div className="recipe-content">
        <h3>Description</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        {/* Additional recipe details can be added here */}
        <div className="recipe-meta">
          <p><strong>Recipe ID:</strong> {recipe.id}</p>
          <p><strong>Added:</strong> {new Date(recipe.id).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails
