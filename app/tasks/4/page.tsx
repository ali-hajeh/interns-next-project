import Link from "next/link";

export default function Task4() {
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
          <h1 className="text-3xl font-bold mb-4">
            Task 4: Forms and Validation
          </h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md mb-6">
            <p className="font-medium">Learning Objectives:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Building complex forms with React</li>
              <li>Implementing form validation</li>
              <li>Using React Hook Form</li>
              <li>Handling form submission and errors</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Advanced Todo Form
            </h2>
            <p className="text-gray-600 mb-4">
              Create an enhanced todo form with additional fields and
              validation. Create a new file at
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                app/components/TodoForm.tsx
              </code>
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Example Implementation:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const todoSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be less than 200 characters'),
  dueDate: z.string()
    .refine(date => !isNaN(Date.parse(date)), {
      message: 'Please enter a valid date'
    }),
  priority: z.enum(['low', 'medium', 'high'])
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function TodoForm({ onSubmit }: { onSubmit: (data: TodoFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema)
  });

  const onSubmitForm = (data: TodoFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter todo title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register('description')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter todo description"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          {...register('dueDate')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          {...register('priority')}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
}`}
              </pre>
            </div>
          </section>

          {/* Step 2 */}
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">Step 2: Your Task</h2>
            <p className="text-gray-600 mb-4">
              Create a user registration form with the following requirements:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Email validation</li>
              <li>Password strength requirements</li>
              <li>Password confirmation</li>
              <li>Username availability check</li>
              <li>Terms and conditions acceptance</li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="font-medium text-yellow-800">Validation Rules:</p>
              <ul className="list-disc list-inside mt-2 text-yellow-800">
                <li>Password must be at least 8 characters</li>
                <li>Password must include numbers and special characters</li>
                <li>Email must be properly formatted</li>
                <li>Username must be 3-20 characters</li>
              </ul>
            </div>
          </section>

          {/* Step 3 */}
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 3: Advanced Features
            </h2>
            <p className="text-gray-600 mb-4">
              Enhance your registration form with:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Real-time validation feedback</li>
              <li>Password strength indicator</li>
              <li>Form persistence (save draft)</li>
              <li>Multi-step form process</li>
              <li>Accessibility features</li>
            </ol>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Link href="/tasks/3" className="text-blue-500 hover:text-blue-600">
              ← Previous Task
            </Link>
            <Link
              href="/tasks/5"
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
