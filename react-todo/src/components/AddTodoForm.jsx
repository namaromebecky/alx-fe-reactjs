import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form 
      className="add-todo-form"
      onSubmit={handleSubmit}
      data-testid="add-todo-form"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        data-testid="todo-input"
      />
      <button 
        type="submit"
        className="add-btn"
        data-testid="add-todo-btn"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;
