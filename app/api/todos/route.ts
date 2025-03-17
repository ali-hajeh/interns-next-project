// app/api/todos/route.ts

import { NextResponse } from 'next/server';

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
}