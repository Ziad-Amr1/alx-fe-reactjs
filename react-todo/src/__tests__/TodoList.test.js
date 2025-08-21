import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  // Test 1: Initial render with demo todos
  test('renders initial todos', () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a project')).toBeInTheDocument();
    
    // Check if there are two todo items
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });

  // Test 2: Adding a new todo
  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add a new todo
    await user.type(input, 'New test todo');
    await user.click(addButton);
    
    // Check if the new todo is added
    expect(screen.getByText('New test todo')).toBeInTheDocument();
    
    // Check if there are now three todo items
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
  });

  // Test 3: Toggling todo completion
  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find a todo item
    const todo = screen.getByText('Learn React');
    
    // Click to toggle completion
    await user.click(todo);
    
    // Check if the todo has the completed styling
    expect(todo).toHaveClass('line-through');
    expect(todo.parentElement).toHaveClass('bg-green-100');
    
    // Click again to untoggle
    await user.click(todo);
    
    // Check if the todo no longer has the completed styling
    expect(todo).not.toHaveClass('line-through');
    expect(todo.parentElement).not.toHaveClass('bg-green-100');
  });

  // Test 4: Deleting a todo
  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find all delete buttons
    const deleteButtons = screen.getAllByText('Delete');
    
    // Click the first delete button
    await user.click(deleteButtons[0]);
    
    // Check if the todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if there's only one todo item left
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(1);
  });

  // Test 5: Empty input validation
  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Try to add an empty todo
    await user.type(input, '   '); // Spaces only
    await user.click(addButton);
    
    // Check that no new todo was added
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2); // Still the initial two todos
  });

  // Test 6: Display message when no todos
  test('displays message when no todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Find all delete buttons
    const deleteButtons = screen.getAllByText('Delete');
    
    // Delete all todos
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check if the empty message is displayed
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
});