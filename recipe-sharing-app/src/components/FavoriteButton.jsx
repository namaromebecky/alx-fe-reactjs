import useRecipeStore from './recipeStore'

const FavoriteButton = ({ recipeId }) => {
  const isFavorite = useRecipeStore(state => state.isFavorite(recipeId))
  const addFavorite = useRecipeStore(state => state.addFavorite)
  const removeFavorite = useRecipeStore(state => state.removeFavorite)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  return (
    <button 
      onClick={handleToggleFavorite}
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">
        {isFavorite ? '♥' : '♡'}
      </span>
      <span className="favorite-text">
        {isFavorite ? 'Favorited' : 'Add to Favorites'}
      </span>
    </button>
  )
}

export default FavoriteButton
