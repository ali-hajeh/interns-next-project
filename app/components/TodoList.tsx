'use client';

import { useState, useEffect } from "react";
import Todo from "./Todo";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const res = await fetch ('/api/todos', {cache: 'no-store'});
      if(!res.ok){
        throw new Error('Failed to fetch todos');
      }
      const data= await res.json();
      setTodos(data);

    }catch(err){
      setError( err instanceof Error ? err.message:'error');

    }finally{setIsLoading(false);}
  };
  fetchTodos();},[]);
  const handleAddTodo = async(e:React.FormEvent) => {
e.preventDefault();
if(newTodo.trim() ==='')return;
try{
  const res = await fetch('/api/todos',{
method:'Post',
headers: {
  'content-Type' : 'application/json',
},
body: JSON.stringify({title: newTodo}),
  });
  if(!res.ok){
    throw new Error ('Failed to add todo');
  }
  const newTodoTitle = await res.json();
  setTodos([...todos,newTodoTitle]);
  setNewTodo('');
}catch(err){
  setError(err instanceof Error? err.message : 'Error');
}
  };
  const handleToggleTodo = async(id : number) => {
    try{
      const todo =todos.find(t => t.id === id);
      if(!todo)return;

      const updatedTodo = {...todo, completed: !todo.completed};
      const res = await fetch('/api/todos',{
    method:'Put',
    headers: {
      'content-Type' : 'application/json',
    },
    body: JSON.stringify(updatedTodo),
      });
      if(!res.ok){
        throw new Error ('Failed to update todo');
      }
      const data = await res.json();
      setTodos(todos.map(t => (t.id === id ? data :t)));
    }catch(err){
      setError(err instanceof Error? err.message : 'Error');
    }
      };
      const handleDeleteTodo = async(id : number) => {
        try{
          const res =await fetch (`/api/todos?id=${id}`,{
            method: 'DELETE',
          });
          if(!res.ok){
            throw new Error ('Failed to delete todo');
          }
          setTodos(todos.filter(t => t.id !==id));
        }catch(err){
          setError(err instanceof Error? err.message : 'Error');
        }
          };
          const handleClearTodo = () => {
            setTodos(todos.filter(todo => !todo.completed));
          }
          const filteredTodos = todos.filter((todo) => {
            if(filter === 'active') return !todo.completed;
            if(filter === 'completed') return todo.completed;
            return true;
          });
          if(isLoading){
            return <div>Loading............</div>
          }
          if(error){
            return <div>Error:{error}</div>;
          }
          return (
            <div className="space-y-6">
              <form onSubmit={handleAddTodo} className="flex gap-4">
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
                className="p-3 flex-grow rounded-m rounded-full" placeholder="Add new Task"/>
                <button type="submit" className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-80 transition-all">ADD</button>
              </form>
              <div className="gap-2 flex" >
                <button onClick={() => setFilter('all')} className={`p-3 ${filter === 'all' ? 'bg-red text-white' : 'bg-gray-200'} rounded-md`}
                >ALL</button>
                <button onClick={() => setFilter('active')} className={`p-3 ${filter === 'active' ? 'bg-red text-white' : 'bg-gray-200'} rounded-md`}
                >Active</button>
                <button onClick={() => setFilter('completed')} className={`p-3 ${filter === 'completed' ? 'bg-red text-white' : 'bg-gray-200'} rounded-md`}
                >completed</button>
                
                
              </div>
            
               <div className="space-y-2">
                {filteredTodos.map((todo) => (
                    <div key ={todo.id} className="flex items-center gap-2">
                    <Todo
                     title={todo.title} 
                     completed={todo.completed} 
                     onToggle={() => handleToggleTodo(todo.id)}
                     onDelete={() => handleDeleteTodo(todo.id)}
                     />
                    <button
                    onClick={() => handleDeleteTodo(todo.id)} 
                    className="flex items-center gap-2">Delete</button>
                    </div>
              ))}
 </div>
<button
onClick={handleClearTodo} 
className="flex items-center gap-2 ">Clear Completed</button>
</div>

 );
}