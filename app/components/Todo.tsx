interface TodoProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export default function Todo({ title, completed, onToggle }: TodoProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-4 w-4"
      />
      <span className={`${completed ? "line-through text-gray-500" : ""}`}>
        {title}
      </span>
    </div>
  );
}