import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todolist from '../components/Todolist';

test('renders todo list', () => {
  render(<Todolist />);
  expect(screen.getByText('React Todo List')).toBeInTheDocument();
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});

test('adds new todo', () => {
  render(<Todolist />);
  expect(screen.getByText('Build Todo App')).toBeInTheDocument();
});
