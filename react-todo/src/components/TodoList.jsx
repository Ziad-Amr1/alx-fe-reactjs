import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <ul className="mt-6">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={`flex justify-between items-center p-3 mb-2 rounded ${
              todo.completed ? 'bg-green-100 line-through' : 'bg-white'
            } border`}
          >
            <span 
              onClick={() => toggleTodo(todo.id)}
              className="cursor-pointer flex-grow"
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;