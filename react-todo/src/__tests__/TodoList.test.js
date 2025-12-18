import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial render with demo todos
  test('renders initial todos', () => {
    render(<TodoList />);
    
    // Check if component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Adding a new todo
  test('adds a new todo', () => {
    render(<TodoList />);
    
    // Find input and button
    const input = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add Todo');
    
    // Type and submit
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion', () => {
    render(<TodoList />);
    
    // Find a todo
    const todo = screen.getByText('Learn React');
    
    // Click to toggle
    fireEvent.click(todo);
    
    // Should have line-through (completed)
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click again to untoggle
    fireEvent.click(todo);
    
    // Should not have line-through
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a todo
  test('deletes a todo', () => {
    render(<TodoList />);
    
    // Find delete button for first todo
    const deleteButtons = screen.getAllByText('Delete');
    
    // Click delete on first todo
    fireEvent.click(deleteButtons[0]);
    
    // Check todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
