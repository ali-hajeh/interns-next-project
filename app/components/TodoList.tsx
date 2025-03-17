

'use client';

import React, { useState, useEffect } from 'react';
import Todo from './Todo';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('/api/todos', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim() === '') return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle }),
      });
      if (!res.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };

      const res = await fetch(`/api/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!res.ok) {
        throw new Error('Failed to update todo');
      }

      const data = await res.json();
      setTodos(todos.map(t => (t.id === id ? data : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
   
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="p-2 border rounded-md flex-grow"
          placeholder="Add a new todo"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Add
        </button>
      </form>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`p-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`p-2 ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-md`}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Todo
              title={todo.title}
              completed={todo.completed}
              onToggle={() => handleToggleTodo(todo.id)}
            />
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      
      <button
        onClick={handleClearCompleted}
        className="p-2 bg-red-500 text-white rounded-md"
      >
        Clear Completed
      </button>
    </div>
  );
}