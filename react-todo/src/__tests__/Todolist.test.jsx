import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todolist from '../components/Todolist';

test('renders todo list', () => {
  render(<Todolist />);
  expect(screen.getByText('Todo List')).toBeInTheDocument();
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
