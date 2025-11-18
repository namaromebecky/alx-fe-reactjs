import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'
import FavoriteButton from './FavoriteButton'

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
        <div className="recipe-title-section">
          <h1>{recipe.title}</h1>
          {recipe.category && (
            <span className="recipe-category-badge">{recipe.category}</span>
          )}
        </div>
        <div className="recipe-actions">
          <FavoriteButton recipeId={recipe.id} />
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
      
      <div className="recipe-content">
        <section className="recipe-section">
          <h3>Description</h3>
          <p className="recipe-description">{recipe.description}</p>
        </section>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <section className="recipe-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className="recipe-section">
          <h3>Recipe Information</h3>
          <div className="recipe-meta">
            <p><strong>Recipe ID:</strong> {recipe.id}</p>
            <p><strong>Added:</strong> {new Date(recipe.id).toLocaleDateString()}</p>
            {recipe.category && <p><strong>Category:</strong> {recipe.category}</p>}
            {recipe.ingredients && (
              <p><strong>Ingredients Count:</strong> {recipe.ingredients.length}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default RecipeDetails
