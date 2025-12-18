import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todolist from '../components/Todolist';
import '@testing-library/jest-dom';

describe('Todolist Component', () => {
  test('1. Initial render shows demo todos', () => {
    render(<Todolist />);
    
    // Check if component renders
    expect(screen.getByTestId('todo-app')).toBeInTheDocument();
    
    // Check if initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if todo list is rendered
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check stats display
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
  });

  test('2. Adding a new todo works correctly', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Find the input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-btn');
    
    // Add a new todo
    await user.type(input, 'Test new todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('Test new todo')).toBeInTheDocument();
    
    // Check if stats updated
    expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
    
    // Check input is cleared after adding
    expect(input).toHaveValue('');
  });

  test('3. Toggling todo completion works', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Find a todo item
    const todoText = screen.getByText('Build a Todo App');
    
    // Initially should not be completed
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle completion
    await user.click(todoText);
    
    // Should now be completed (line-through)
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    await user.click(todoText);
    
    // Should not be completed again
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  test('4. Deleting a todo works correctly', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Check initial count
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    
    // Find delete button for first todo (Learn React)
    const deleteButtons = screen.getAllByRole('button', { name: /Delete todo/i });
    await user.click(deleteButtons[0]);
    
    // Check if todo was removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if stats updated
    expect(screen.getByText(/Total: 2/)).toBeInTheDocument();
  });

  test('5. Empty state shows message', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Delete all todos
    const deleteButtons = screen.getAllByRole('button', { name: /Delete todo/i });
    
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check if empty message appears
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    
    // Check if todo list is not present
    expect(screen.queryByTestId('todo-list')).not.toBeInTheDocument();
  });

  test('6. Form validation prevents empty todos', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Try to add empty todo
    const addButton = screen.getByTestId('add-todo-btn');
    await user.click(addButton);
    
    // Count should remain the same
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
  });

  test('7. Toggle updates stats correctly', async () => {
    render(<Todolist />);
    const user = userEvent.setup();
    
    // Initial stats: 1 completed, 2 pending
    expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Pending: 2/)).toBeInTheDocument();
    
    // Toggle a pending todo to completed
    const pendingTodo = screen.getByText('Build a Todo App');
    await user.click(pendingTodo);
    
    // Stats should update: 2 completed, 1 pending
    expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Pending: 1/)).toBeInTheDocument();
  });
});
