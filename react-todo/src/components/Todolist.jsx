import React, { useState } from 'react';
import Todoitem from './Todoitem';
import AddTodoForm from './AddTodoForm';

function Todolist() {
  // Initial todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-app" data-testid="todo-app">
      <h1>React Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <div className="stats">
        <p>Total: {todos.length} | Completed: {completedTodos.length} | Pending: {pendingTodos.length}</p>
      </div>
      
      {todos.length === 0 ? (
        <p className="empty-message" data-testid="empty-message">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list" data-testid="todo-list">
          {todos.map(todo => (
            <Todoitem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
      
      <div className="instructions">
        <h3>How to Use:</h3>
        <ul>
          <li>Click on a todo to toggle completion status</li>
          <li>Click the 🗑️ icon to delete a todo</li>
          <li>Use the form above to add new todos</li>
        </ul>
      </div>
    </div>
  );
}

export default Todolist;
