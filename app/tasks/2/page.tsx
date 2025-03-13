import Link from "next/link";

export default function Task2() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
          >
            ← Back to Tasks
          </Link>
          <h1 className="text-3xl font-bold mb-4">Task 2: State and Events</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md mb-6">
            <p className="font-medium">Learning Objectives:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Understanding React's useState and useEffect hooks</li>
              <li>Managing component state effectively</li>
              <li>Handling user interactions and events</li>
              <li>Implementing controlled forms</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: State Management
            </h2>
            <p className="text-gray-600 mb-4">
              Let's enhance our TodoList component by adding proper state
              management. Create a new file at
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                app/components/EnhancedTodoList.tsx
              </code>
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Example Implementation:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`'use client';

import { useState } from 'react';
import Todo from './Todo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function EnhancedTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false
      }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>
      
      <div className="space-y-2">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="font-medium text-yellow-800">Key Concepts:</p>
              <ul className="list-disc list-inside mt-2 text-yellow-800">
                <li>Using useState for managing component state</li>
                <li>Handling form submissions</li>
                <li>Updating state immutably</li>
                <li>Event handling in React</li>
              </ul>
            </div>
          </section>

          {/* Step 2 */}
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Effects and Local Storage
            </h2>
            <p className="text-gray-600 mb-4">
              Your task is to enhance the TodoList further by:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Persisting todos in localStorage</li>
              <li>Adding the ability to delete todos</li>
              <li>Implementing a todo filter (All/Active/Completed)</li>
              <li>Adding a "Clear Completed" button</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Hint:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`// Load todos from localStorage
useEffect(() => {
  const stored = localStorage.getItem('todos');
  if (stored) {
    setTodos(JSON.parse(stored));
  }
}, []);

// Save todos to localStorage
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);`}
              </pre>
            </div>
          </section>

          {/* Step 3 */}
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Custom Hooks</h2>
            <p className="text-gray-600 mb-4">
              Create a custom hook to manage the todo logic:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                Create{" "}
                <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                  hooks/useTodos.ts
                </code>
              </li>
              <li>Move the todo management logic into the custom hook</li>
              <li>Use the hook in your EnhancedTodoList component</li>
            </ol>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Link href="/tasks/1" className="text-blue-500 hover:text-blue-600">
              ← Previous Task
            </Link>
            <Link
              href="/tasks/3"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Next Task →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
