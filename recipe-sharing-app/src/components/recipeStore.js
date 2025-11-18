import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
  // Recipe CRUD actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id),
    favorites: state.favorites.filter(favId => favId !== id)
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    get().filterRecipes()
  },
  
  filterRecipes: () => set((state) => {
    if (!state.searchTerm.trim()) {
      return { filteredRecipes: state.recipes }
    }
    
    const searchTerm = state.searchTerm.toLowerCase()
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      (recipe.ingredients && recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm)
      )) ||
      (recipe.category && recipe.category.toLowerCase().includes(searchTerm))
    )
    
    return { filteredRecipes: filtered }
  }),
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    // Check if already in favorites to avoid duplicates
    if (state.favorites.includes(recipeId)) {
      return state
    }
    const newFavorites = [...state.favorites, recipeId]
    
    // Generate recommendations when favorites change
    setTimeout(() => get().generateRecommendations(), 0)
    
    return { favorites: newFavorites }
  }),
  
  removeFavorite: (recipeId) => set((state) => {
    const newFavorites = state.favorites.filter(id => id !== recipeId)
    
    // Generate recommendations when favorites change
    setTimeout(() => get().generateRecommendations(), 0)
    
    return { favorites: newFavorites }
  }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId)
  },
  
  // Recommendations actions
  generateRecommendations: () => set((state) => {
    const { recipes, favorites } = state
    
    if (favorites.length === 0 || recipes.length === 0) {
      // If no favorites, recommend random recipes
      const shuffled = [...recipes].sort(() => 0.5 - Math.random())
      return { recommendations: shuffled.slice(0, 3) }
    }
    
    // Get favorite recipes data
    const favoriteRecipes = favorites.map(id => 
      recipes.find(recipe => recipe.id === id)
    ).filter(Boolean)
    
    // Extract categories from favorites
    const favoriteCategories = favoriteRecipes
      .map(recipe => recipe.category)
      .filter(Boolean)
    
    // Extract common ingredients from favorites
    const favoriteIngredients = favoriteRecipes
      .flatMap(recipe => recipe.ingredients || [])
      .filter(Boolean)
    
    // Score recipes based on similarity to favorites
    const scoredRecipes = recipes
      .filter(recipe => !favorites.includes(recipe.id)) // Exclude favorites
      .map(recipe => {
        let score = 0
        
        // Score based on category match
        if (recipe.category && favoriteCategories.includes(recipe.category)) {
          score += 3
        }
        
        // Score based on ingredient overlap
        if (recipe.ingredients) {
          const commonIngredients = recipe.ingredients.filter(ingredient =>
            favoriteIngredients.some(favIngredient => 
              favIngredient.toLowerCase().includes(ingredient.toLowerCase()) ||
              ingredient.toLowerCase().includes(favIngredient.toLowerCase())
            )
          )
          score += commonIngredients.length
        }
        
        // Add some randomness for variety
        score += Math.random()
        
        return { recipe, score }
      })
      .sort((a, b) => b.score - a.score)
      .map(item => item.recipe)
      .slice(0, 6) // Top 6 recommendations
    
    return { recommendations: scoredRecipes }
  })
}))

export default useRecipeStore
