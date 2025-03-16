'use client';

import { useState, useEffect } from 'react';
import Todo from './Todo';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from the API on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError('Failed to load todos. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setIsLoading(true);
    setError(null);

    const newTodoItem: TodoItem = {
      id: Date.now(), // Temporary ID for optimistic update
      title: newTodo.trim(),
      completed: false,
    };

    // Optimistic update
    setTodos([...todos, newTodoItem]);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const savedTodo = await response.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === newTodoItem.id ? savedTodo : t))
      );
      setNewTodo('');
    } catch (err) {
      // Rollback on error
      setTodos(todos);
      setError('Failed to add todo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    // Optimistic update
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));

    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
    } catch (err) {
      // Rollback on error
      setTodos(todos);
      setError('Failed to update todo. Please try again.');
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id: number) => {
    // Optimistic update
    setTodos(todos.filter((t) => t.id !== id));

    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (err) {
      // Rollback on error
      setTodos(todos);
      setError('Failed to delete todo. Please try again.');
    }
  };

  // Function to clear completed todos
  const clearCompleted = () => {
    const completedIds = todos.filter((t) => t.completed).map((t) => t.id);
    setTodos(todos.filter((t) => !t.completed));

    // Delete completed todos from the API
    completedIds.forEach((id) => deleteTodo(id));
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>

      {/* Display error message */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* Form to add new todos */}
      <form onSubmit={addTodo} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 rounded flex-1"
          placeholder="Add a new task..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Render the list of todos */}
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>

      {/* Clear completed todos button */}
      <button
        onClick={clearCompleted}
        className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Completed
      </button>
    </div>
  );
}
