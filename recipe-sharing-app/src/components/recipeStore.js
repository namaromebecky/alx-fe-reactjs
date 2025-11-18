import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
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
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filter actions
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    // Automatically filter recipes when search term changes
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
  })
}))

export default useRecipeStore
