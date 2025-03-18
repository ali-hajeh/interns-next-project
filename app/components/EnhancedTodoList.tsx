"use client";

import { useState } from "react";
import Todo from "./Todo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number; // Add a timestamp for sorting by date added
}

export default function EnhancedTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "date">("date"); // Sort by title or date

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || newTodo.length > 20) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
        createdAt: Date.now(), // Add a timestamp
      },
    ]);
    setNewTodo("");
  };

  // Toggle todo completion
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter todos based on the selected filter and search query
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort todos
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title); // Alphabetical order
    return b.createdAt - a.createdAt; // Sort by date added (newest first)
  });

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      {/* Add Todo Form and Clear Completed Button */}
      <div className="flex gap-2">
        <form onSubmit={addTodo} className="flex-1 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo (max 20 )"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={20}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
        <button
          onClick={clearCompleted}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Clear Completed
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todos..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        <label className="flex items-center gap-2">
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "title" | "date")}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Alphabetical</option>
            <option value="date">Date Added</option>
          </select>
        </label>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between gap-4 p-2 border rounded-md"
          >
            <Todo
              title={todo.title}
              completed={todo.completed}
              onToggle={() => toggleTodo(todo.id)}
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}