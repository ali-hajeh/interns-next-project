import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Next.js Learning Journey
        </h1>

        <p className="text-lg mb-8 text-center text-gray-600">
          Welcome to your interactive learning experience with Next.js, React,
          and Tailwind CSS!
        </p>

        <div className="grid gap-6">
          {/* Task 1 */}
          <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Task 1: Basic Components and Styling
              </h2>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                Beginner
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Learn the fundamentals of React components and Tailwind CSS
              styling. Create your first components and understand how to use
              props effectively.
            </p>
            <Link
              href="/tasks/1"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Task →
            </Link>
          </div>

          {/* Task 2 */}
          <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Task 2: State and Events
              </h2>
              <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                Intermediate
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Dive into React hooks and state management. Learn how to handle
              user interactions and maintain component state effectively.
            </p>
            <Link
              href="/tasks/2"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Task →
            </Link>
          </div>

          {/* Task 3 */}
          <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Task 3: Data Fetching</h2>
              <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                Advanced
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Explore server components and different data fetching patterns in
              Next.js. Learn how to work with API routes and handle loading
              states.
            </p>
            <Link
              href="/tasks/3"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Task →
            </Link>
          </div>

          {/* Task 4 */}
          <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Task 4: Forms and Validation
              </h2>
              <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                Advanced
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Master form handling and validation in React. Learn best practices
              for error handling and user input validation.
            </p>
            <Link
              href="/tasks/4"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Task →
            </Link>
          </div>

          {/* Task 5 */}
          <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                Task 5: Advanced Features
              </h2>
              <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                Expert
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Implement authentication, route protection, and advanced state
              management. Put everything together in a final project.
            </p>
            <Link
              href="/tasks/5"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Task →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
