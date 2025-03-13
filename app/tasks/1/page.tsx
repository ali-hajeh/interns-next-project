import Link from "next/link";

export default function Task1() {
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
            Task 1: Basic Components and Styling
          </h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md mb-6">
            <p className="font-medium">Learning Objectives:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Create and structure React components</li>
              <li>Use Tailwind CSS for styling</li>
              <li>Understand and implement component props</li>
              <li>Practice component composition</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Create Your First Component
            </h2>
            <p className="text-gray-600 mb-4">
              Let's start by creating a simple Todo component. Create a new file
              at
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                app/components/Todo.tsx
              </code>
              and implement a basic todo item component.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Example Implementation:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`interface TodoProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export default function Todo({ title, completed, onToggle }: TodoProps) {
  return (
    <div className="flex items-center gap-2 p-4 border rounded-md">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-4 w-4"
      />
      <span className={\`\${completed ? 'line-through text-gray-500' : ''}\`}>
        {title}
      </span>
    </div>
  );
}`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="font-medium text-yellow-800">Key Concepts:</p>
              <ul className="list-disc list-inside mt-2 text-yellow-800">
                <li>TypeScript interfaces for prop typing</li>
                <li>Functional components with props</li>
                <li>Basic Tailwind CSS classes</li>
                <li>Conditional styling</li>
              </ul>
            </div>
          </section>

          {/* Step 2 */}
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">Step 2: Your Task</h2>
            <p className="text-gray-600 mb-4">
              Now it's your turn! Create a TodoList component that uses the Todo
              component you just created. The TodoList should:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Accept an array of todos as props</li>
              <li>Render multiple Todo components</li>
              <li>Include a form to add new todos</li>
              <li>Implement todo completion toggling</li>
            </ul>
            <p className="text-gray-600">
              Create this component in
              <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                app/components/TodoList.tsx
              </code>
            </p>
          </section>

          {/* Step 3 */}
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 3: Testing Your Implementation
            </h2>
            <p className="text-gray-600 mb-4">
              Once you've created both components, test them by:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                Creating a new page at{" "}
                <code className="bg-gray-100 px-2 py-1 rounded mx-1">
                  app/practice/page.tsx
                </code>
              </li>
              <li>Importing and using your TodoList component</li>
              <li>Adding some sample todos to test the functionality</li>
            </ol>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              ← Back to Tasks
            </Link>
            <Link
              href="/tasks/2"
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
