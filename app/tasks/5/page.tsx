import Link from "next/link";

export default function Task5() {
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
          <h1 className="text-3xl font-bold mb-4">Task 5: Advanced Features</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md mb-6">
            <p className="font-medium">Learning Objectives:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Implementing authentication</li>
              <li>Protecting routes and API endpoints</li>
              <li>Managing global state</li>
              <li>Advanced React patterns</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="border-l-4 border-green-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Authentication Setup
            </h2>
            <p className="text-gray-600 mb-4">
              Implement authentication using NextAuth.js. Start by creating the
              necessary configuration files:
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium mb-2">Example Implementation:</p>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // This is just an example
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: "test@example.com",
            name: "Test User"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token }) {
      // Add custom session handling
      return session
    },
    async jwt({ token, user }) {
      // Add custom token handling
      return token
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`}
              </pre>
            </div>
          </section>

          {/* Step 2 */}
          <section className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Protected Routes
            </h2>
            <p className="text-gray-600 mb-4">
              Create middleware to protect routes and implement authenticated
              components:
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {`// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};

// components/AuthGuard.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return status === 'authenticated' ? <>{children}</> : null;
}`}
              </pre>
            </div>
          </section>

          {/* Step 3 */}
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Your Task</h2>
            <p className="text-gray-600 mb-4">
              Create a complete authentication system with the following
              features:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>User registration with email verification</li>
              <li>Password reset functionality</li>
              <li>OAuth integration (Google, GitHub)</li>
              <li>Protected API routes</li>
              <li>Role-based access control</li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="font-medium text-yellow-800">
                Advanced Challenges:
              </p>
              <ul className="list-disc list-inside mt-2 text-yellow-800">
                <li>Implement session management</li>
                <li>Add two-factor authentication</li>
                <li>Create an admin dashboard</li>
                <li>Add user profile management</li>
              </ul>
            </div>
          </section>

          {/* Step 4 */}
          <section className="border-l-4 border-red-500 pl-4">
            <h2 className="text-xl font-semibold mb-4">
              Step 4: Global State Management
            </h2>
            <p className="text-gray-600 mb-4">
              Implement global state management using one of the following:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Redux Toolkit</li>
              <li>Zustand</li>
              <li>Jotai</li>
              <li>Context API with reducers</li>
            </ul>
            <p className="text-gray-600">Use the chosen solution to manage:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>User authentication state</li>
              <li>Theme preferences</li>
              <li>Application settings</li>
              <li>Cached API data</li>
            </ul>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <Link href="/tasks/4" className="text-blue-500 hover:text-blue-600">
              ← Previous Task
            </Link>
            <Link
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Complete Course →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
