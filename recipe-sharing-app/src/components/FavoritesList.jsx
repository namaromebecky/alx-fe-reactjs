import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import FavoriteButton from './FavoriteButton'

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
      .filter(Boolean) // Remove any undefined recipes
  )

  if (favorites.length === 0) {
    return (
      <div className="favorites-list">
        <div className="section-header">
          <h2>My Favorite Recipes</h2>
          <span className="favorites-count">0 recipes</span>
        </div>
        <div className="empty-favorites">
          <div className="empty-icon">♡</div>
          <h3>No favorites yet</h3>
          <p>Start adding recipes to your favorites to see them here!</p>
          <p className="empty-hint">
            Click the "Add to Favorites" button on any recipe to add it to your collection.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-list">
      <div className="section-header">
        <h2>My Favorite Recipes</h2>
        <span className="favorites-count">{favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'}</span>
      </div>
      
      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="favorite-recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {recipe.ingredients && (
                <div className="recipe-ingredients-preview">
                  <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 2).join(', ')}
                  {recipe.ingredients.length > 2 && '...'}
                </div>
              )}
              {recipe.category && (
                <div className="recipe-category">
                  <span className="category-tag">{recipe.category}</span>
                </div>
              )}
            </Link>
            <div className="recipe-card-actions">
              <FavoriteButton recipeId={recipe.id} />
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
    </div>
  )
}

export default FavoritesList
