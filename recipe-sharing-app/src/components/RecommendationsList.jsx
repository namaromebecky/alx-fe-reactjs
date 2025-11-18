import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import FavoriteButton from './FavoriteButton'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)
  const favorites = useRecipeStore(state => state.favorites)

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations, favorites.length]) // Regenerate when favorites count changes

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <div className="section-header">
          <h2>Recommended For You</h2>
        </div>
        <div className="empty-recommendations">
          <div className="empty-icon">✨</div>
          <h3>No recommendations yet</h3>
          <p>Start adding recipes to your favorites to get personalized recommendations!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="recommendations-list">
      <div className="section-header">
        <h2>Recommended For You</h2>
        <span className="recommendations-count">
          {recommendations.length} suggestions
        </span>
      </div>
      
      <div className="recommendations-info">
        <p className="recommendations-hint">
          💡 Based on your favorite recipes and preferences
        </p>
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recommendation-recipe-card">
            <div className="recommendation-badge">Recommended</div>
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
      
      <div className="recommendations-footer">
        <button 
          onClick={generateRecommendations}
          className="refresh-recommendations-button"
        >
          🔄 Refresh Recommendations
        </button>
      </div>
    </div>
  )
}

export default RecommendationsList
