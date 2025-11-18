import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/') // Redirect to home after deletion
  }

  if (!showConfirm) {
    return (
      <button 
        onClick={() => setShowConfirm(true)}
        className="delete-button"
      >
        Delete Recipe
      </button>
    )
  }

  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this recipe?</p>
      <div className="confirmation-actions">
        <button 
          onClick={handleDelete}
          className="confirm-delete-button"
        >
          Yes, Delete
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          className="cancel-delete-button"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteRecipeButton
