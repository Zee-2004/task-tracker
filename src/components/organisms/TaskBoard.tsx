import TaskCard, { Task } from "../molecules/TaskCard";

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const COLUMNS: { key: Task["status"]; label: string; dot: string }[] = [
  { key: "TODO", label: "To Do", dot: "bg-gray-400" },
  { key: "IN_PROGRESS", label: "In Progress", dot: "bg-blue-500" },
  { key: "DONE", label: "Done", dot: "bg-green-500" },
];

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        return (
          <div key={col.key} className="bg-white/60 rounded-2xl p-4 space-y-3 min-h-[160px] border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span className={"w-2 h-2 rounded-full " + col.dot} />
              {col.label}
              <span className="ml-auto text-xs bg-gray-100 rounded-full px-2 py-0.5 text-gray-500 font-medium">{colTasks.length}</span>
            </h2>
            {colTasks.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">No tasks yet</p>
            )}
            {colTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
            ))}
          </div>
        );
      })}
    </div>
  );
}