

'use client';

import { useState } from 'react';
import Todo from './Todo';
import { useTodos } from '../hooks/useTodos';
import TodoForm from './TodoForm';

export default function EnhancedTodoList() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();

  const handleAddTodo = (data: { title: string, description: string, dueDate: string, priority: string }) => {
    addTodo(data.title); 
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <TodoForm onSubmit={handleAddTodo} />

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

      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2">
            <Todo
              title={todo.title}
              completed={todo.completed}
              onToggle={() => toggleTodo(todo.id)}
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={clearCompleted}
        className="p-2 bg-red-500 text-white rounded-md"
      >
        Clear Completed
      </button>
    </div>
  );
}