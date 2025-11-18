import { useState, useEffect } from 'react'
import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm)
  const [localSearchTerm, setLocalSearchTerm] = useState('')

  // Debounce the search to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [localSearchTerm, setSearchTerm])

  const handleClear = () => {
    setLocalSearchTerm('')
    setSearchTerm('')
  }

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Search recipes by title, description, or ingredients..."
          className="search-input"
        />
        {localSearchTerm && (
          <button 
            onClick={handleClear}
            className="clear-search-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <div className="search-info">
        <p>Search through recipe titles, descriptions, and ingredients</p>
      </div>
    </div>
  )
}

export default SearchBar
