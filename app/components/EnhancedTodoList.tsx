'use client';
import { useState } from "react";
import useTodos from "../hooks/useTodos"
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default function EnhancedTodoList(){
  const { todos,addTodo,toggleTodo,deleteTodo ,clearCompleted} = useTodos();
  const [ newTodo,setNewTodo] = useState('');
  const[filter, setFilter] = useState<'all' | 'active'|'completed'>('all');

const handleAddTodo = (e:React.FormEvent)=> {
  e.preventDefault();
  if(newTodo.trim() == '') return ;
  addTodo(newTodo);
  setNewTodo('');
};
const filterTodos = todos.filter(todo => {
  if(filter === 'active') return !todo.completed;
  if(filter === 'completed') return todo.completed;
 return true;
});
return(
  <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
   <form onSubmit={handleAddTodo} className="fleax gap-2">
   <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a task..." className="w-full px-4 py-3 text-gray-9 bg-gray-200 rounded-full outline-none focus:ring-2 focus:ring-purple-500 "/>
   <button type="submit" className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-80 transition-all">ADD</button>
   </form>
   <div className="space-y-2 mt-4">
    {filterTodos.map((todo) => (
       <Todo 
       key={todo.id} 
       title={todo.title} 
       completed={todo.completed}
       onToggle={() => toggleTodo(todo.id)}
       onDelete={() => deleteTodo(todo.id)}
      />
    ))}
   </div>
<div className="flex justify-between  items-center mt-4">
 <div className="space-x-2" >
  {['all','active','completed'].map(f => (
  <button key={f}  onClick={() => setFilter(f as 'all'|'active'|'completed')}
  className={`px-4 py-2 rounded-full transition-all ${
    filter === f? 'bg-purple-500 text-white':'bg-gray-700 hover:bg-gray-600'
  }`}>
    {f.charAt(0).toUpperCase() +f.slice(1)}
  </button>
  ))}
 </div>
 <button onClick={clearCompleted} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
>Clear</button>
</div>
  </div>
);
}