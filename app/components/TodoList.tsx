'use client';

import React, { useState } from 'react';
import Todo from './Todo';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[]; // Accept todos as props
}

export default function TodoList({ todos: initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Add a new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim() === '') 
      return;

    const newTodo: TodoItem = {
      id: Date.now(), 
      title: newTodoTitle,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle('');
  };

  // Toggle todo completion
  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Clear completed todos
  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

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
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md"
          disabled={newTodoTitle.trim() === ''}
        >
          Add
        </button>
      </form>

      
      <div className="flex gap-2">
        {['all', 'active', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as 'all' | 'active' | 'completed')}
            className={`p-2 ${
              filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } rounded-md`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      
      {filteredTodos.length === 0 ? (
        <div>No todos to display</div>
      ) : (
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
      )}

      
      {todos.some((todo) => todo.completed) && (
        <button
          onClick={handleClearCompleted}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}