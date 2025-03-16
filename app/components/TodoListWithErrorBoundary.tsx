'use client';

import { ErrorBoundary } from 'react-error-boundary';
import TodoList from './TodoList';

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
    </div>
  );
}

// TodoListWithErrorBoundary component
export default function TodoListWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TodoList />
    </ErrorBoundary>
  );
}
