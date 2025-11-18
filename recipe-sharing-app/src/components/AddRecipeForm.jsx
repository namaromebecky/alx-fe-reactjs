import { useState } from 'react'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    const ingredientsArray = ingredients
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0)

    addRecipe({ 
      id: Date.now(), 
      title: title.trim(), 
      description: description.trim(),
      ingredients: ingredientsArray,
      category: category.trim() || 'Uncategorized'
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setIngredients('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h2>Add New Recipe</h2>
      
      <div className="form-group">
        <label htmlFor="title">Recipe Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Italian, Dessert, Vegetarian"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your recipe..."
          className="form-textarea"
          rows="4"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., flour, sugar, eggs)"
          className="form-textarea"
          rows="3"
        />
        <small className="form-help">Separate ingredients with commas</small>
      </div>
      
      <button type="submit" className="submit-button">
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm
