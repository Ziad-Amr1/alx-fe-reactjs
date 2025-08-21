const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
require('@testing-library/jest-dom'); 
const TodoList = require('../components/TodoList');

describe('TodoList Component', function() {
  it('renders initial todos', function() {
    render(React.createElement(TodoList, null));
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo List')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  it('adds a new todo', function() {
    render(React.createElement(TodoList, null));
    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('toggles a todo', function() {
    render(React.createElement(TodoList, null));
    const todoItem = screen.getByText('Learn React');

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  it('deletes a todo', function() {
    render(React.createElement(TodoList, null));
    const deleteButton = screen.getByText('Learn React').nextSibling;

    fireEvent.click(deleteButton);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});