interface TodoProps {
  title: string;//task name
  completed: boolean;//indicate whether the task is completed or not
  onToggle: () => void;
  onDelete: () => void;//toggles the task's completion status
}

export default function Todo({ title, completed, onToggle }: TodoProps) {
  return (
    //use tailwind for styling flexbox layout,padding,border,rounded corners
    <div className="flex items-center gap-2 p-4 border rounded-md">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}//event triggers onToggle,updating the completion state
        className="h-4 w-4"
      />
      <span className={`${completed ? "line-through text-gray-500" : ""}`}>
        {title}
      </span>
    </div>
  );
}
