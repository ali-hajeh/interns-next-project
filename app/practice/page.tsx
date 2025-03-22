"use client";

import { useState } from "react";
import Link from "next/link";
import Todo from "../components/Todo";

export default function PracticePage() {
  // Example todos for demonstration
  const exampleTodos = [
    { id: 1, title: "Learn React Components", completed: false },
    { id: 2, title: "Practice with Tailwind CSS", completed: true },
    { id: 3, title: "Build a Todo App", completed: false },
  ];

  const [activeTab, setActiveTab] = useState("example");

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
          <h1 className="text-3xl font-bold mb-4">Practice Area</h1>
          <p className="text-gray-600">
            This is your workspace to experiment with components and see them in
            action. Try out your implementations and test different features
            here.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("example")}
              className={
                activeTab === "example"
                  ? "py-4 px-1 border-b-2 border-blue-500 text-blue-600"
                  : "py-4 px-1 text-gray-500 hover:text-gray-700"
              }
            >
              Example Components
            </button>
            <button
              onClick={() => setActiveTab("your-work")}
              className={
                activeTab === "your-work"
                  ? "py-4 px-1 border-b-2 border-blue-500 text-blue-600"
                  : "py-4 px-1 text-gray-500 hover:text-gray-700"
              }
            >
              Your Components
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {activeTab === "example" ? (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Example Todo Component
                </h2>
                <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
                  {exampleTodos.map((todo) => (
                    <Todo
                      key={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      onToggle={() => {}}
                    />
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-800">
                    This is how your Todo component should look. Try
                    implementing your own version and switch to the "Your
                    Components" tab to test it.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                <div className="prose prose-blue">
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>
                      Create your components in the{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        app/components
                      </code>{" "}
                      directory
                    </li>
                    <li>Import and use them in the "Your Components" tab</li>
                    <li>Test different props and interactions</li>
                    <li>Implement the required features from each task</li>
                  </ol>
                </div>
              </section>
            </>
          ) : (
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Your Implementation
              </h2>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 text-center">
                  This is where you&apos;ll import and test your own components.
                  Edit this page to add your implementations!
                </p>
                {/* 
                  Add your components here! For example:
                  <EnhancedTodoList />
                */}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">Tips:</h3>
                <ul className="list-disc list-inside text-sm text-blue-800">
                  <li>Remember to make your components interactive</li>
                  <li>Test edge cases and error states</li>
                  <li>Try different screen sizes for responsive design</li>
                  <li>Check accessibility features</li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
    
  );
}
