import { useState } from 'react'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const updateRecipe = useRecipeStore(state => state.updateRecipe)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    updateRecipe(recipe.id, { 
      title: title.trim(), 
      description: description.trim() 
    })
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(recipe.title)
    setDescription(recipe.description)
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
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          className="form-textarea"
          rows="4"
        />
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
