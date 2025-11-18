import { useState } from 'react'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const [ingredients, setIngredients] = useState(recipe.ingredients ? recipe.ingredients.join(', ') : '')
  const [category, setCategory] = useState(recipe.category || '')
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

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

    updateRecipe(recipe.id, { 
      title: title.trim(), 
      description: description.trim(),
      ingredients: ingredientsArray,
      category: category.trim() || 'Uncategorized'
    })
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(recipe.title)
    setDescription(recipe.description)
    setIngredients(recipe.ingredients ? recipe.ingredients.join(', ') : '')
    setCategory(recipe.category || '')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)}
        className="edit-button"
      >
        Edit Recipe
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <h3>Edit Recipe</h3>
      
      <div className="form-group">
        <label htmlFor="edit-title">Recipe Title *</label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edit-category">Category</label>
        <input
          id="edit-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Italian, Dessert, Vegetarian"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edit-description">Description *</label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          className="form-textarea"
          rows="4"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="edit-ingredients">Ingredients</label>
        <textarea
          id="edit-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas"
          className="form-textarea"
          rows="3"
        />
        <small className="form-help">Separate ingredients with commas</small>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="save-button">
          Save Changes
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditRecipeForm
