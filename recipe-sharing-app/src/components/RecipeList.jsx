import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  const displayRecipes = searchTerm ? filteredRecipes : recipes

  return (
    <div className="recipe-list">
      <div className="recipe-list-header">
        <h2>Recipes</h2>
        <div className="recipe-count">
          {searchTerm ? (
            <span>
              Showing {filteredRecipes.length} of {recipes.length} recipes
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          ) : (
            <span>Total recipes: {recipes.length}</span>
          )}
        </div>
      </div>

      {displayRecipes.length === 0 ? (
        <div className="no-recipes">
          {searchTerm ? (
            <>
              <h3>No recipes found</h3>
              <p>No recipes match your search for "{searchTerm}". Try different keywords or check the spelling.</p>
            </>
          ) : (
            <p>No recipes yet. Add your first recipe!</p>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                {recipe.ingredients && (
                  <div className="recipe-ingredients-preview">
                    <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </div>
                )}
                {recipe.category && (
                  <div className="recipe-category">
                    <span className="category-tag">{recipe.category}</span>
                  </div>
                )}
              </Link>
              <div className="recipe-card-actions">
                <Link 
                  to={`/recipe/${recipe.id}`} 
                  className="view-details-button"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeList
