interface TodoProps {
  title: string; // The title of the todo
  completed: boolean; // Whether the todo is completed
  onToggle: () => void; // Function to toggle the completion status
  onDelete: () => void; // Function to delete the todo
}

export default function Todo({
  title,
  completed,
  onToggle,
  onDelete,
}: TodoProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div className="flex items-center gap-2">
        {/* Checkbox to toggle completion status */}
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="h-4 w-4"
        />
        {/* Todo title with conditional styling */}
        <span className={`${completed ? 'line-through text-gray-500' : ''}`}>
          {title}
        </span>
      </div>
      {/* Delete button */}
      <button
        onClick={onDelete}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
