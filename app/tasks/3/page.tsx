import Link from "next/link";

export default function Task3() {
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
          <h1 className="text-3xl font-bold mb-4">Task 3: Data Fetching</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md mb-6">
            <p className="font-medium">Learning Objectives:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Understanding Server Components</li>
              <li>Implementing API routes</li>
              <li>Working with async data fetching</li>
              <li>Managing loading and error states</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Creating an API Route
            </h2>
            <p className="text-gray-600 mb-4">
              Create a simple API route to manage todos. Create a new file at
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                app/api/todos/route.ts
              </code>
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Example Implementation:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`import { NextResponse } from 'next/server';

// In-memory storage (replace with a database in production)
let todos: Todo[] = [];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false
  };
  
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const index = todos.findIndex(t => t.id === body.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  todos[index] = { ...todos[index], ...body };
  return NextResponse.json(todos[index]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }
  
  todos = todos.filter(t => t.id !== Number(id));
  return NextResponse.json({ success: true });
}`}
              </pre>
            </div>
          </section>

          {/* Step 2 */}
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Server Component
            </h2>
            <p className="text-gray-600 mb-4">
              Create a server component to fetch and display todos:
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`// app/components/TodoList.tsx
async function getTodos() {
  const res = await fetch('http://localhost:3000/api/todos', {
    cache: 'no-store' // Disable caching for this example
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return res.json();
}

export default async function TodoList() {
  const todos = await getTodos();
  
  return (
    <div>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </section>

          {/* Step 3 */}
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Your Task</h2>
            <p className="text-gray-600 mb-4">
              Enhance the todo application by:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Adding loading states using React Suspense</li>
              <li>Implementing error boundaries</li>
              <li>Adding optimistic updates</li>
              <li>Implementing server-side validation</li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="font-medium text-yellow-800">Bonus Challenge:</p>
              <ul className="list-disc list-inside mt-2 text-yellow-800">
                <li>Add pagination to the todos list</li>
                <li>Implement search functionality</li>
                <li>Add sorting options</li>
              </ul>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Link href="/tasks/2" className="text-blue-500 hover:text-blue-600">
              ← Previous Task
            </Link>
            <Link
              href="/tasks/4"
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
