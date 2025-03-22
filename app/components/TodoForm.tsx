'use client';

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
}