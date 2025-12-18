import React, { useState } from 'react';

function Todolist() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build Todo App', completed: false },
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

  return (
    <div className="todo-app">
      <h1>React Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        const text = e.target.elements.todo.value;
        if (text) {
          addTodo(text);
          e.target.elements.todo.value = '';
        }
      }}>
        <input name="todo" placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todolist;
