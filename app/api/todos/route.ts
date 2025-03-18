import { NextResponse } from "next/server";

// In-memory storage (replace with a database in production)
let todos: Todo[] = [];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// GET: Fetch all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST: Add a new todo
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title || body.title.length > 40) {
    return NextResponse.json(
      { error: "Title is required and must be less than 40 characters" },
      { status: 400 }
    );
  }

  const newTodo: Todo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// PUT: Update a todo
export async function PUT(request: Request) {
  const body = await request.json();
  const index = todos.findIndex((t) => t.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todos[index] = { ...todos[index], ...body };
  return NextResponse.json(todos[index]);
}

// DELETE: Remove a todo
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  todos = todos.filter((t) => t.id !== Number(id));
  return NextResponse.json({ success: true });
}