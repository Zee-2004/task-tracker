import Button from "../atoms/Button";
import PriorityBadge from "./PriorityBadge";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string | null;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const PRIORITY_BAR: Record<Task["priority"], string> = {
  LOW: "border-l-green-400",
  MEDIUM: "border-l-amber-400",
  HIGH: "border-l-red-400",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const isOverdue =
    !!task.dueDate &&
    task.status !== "DONE" &&
    new Date(task.dueDate) < new Date();
  const borderColor = isOverdue ? "border-red-300" : "border-gray-100";
  const cardClasses =
    "p-3.5 rounded-xl border border-l-4 bg-white shadow-sm hover:shadow-md transition-shadow space-y-2 " +
    PRIORITY_BAR[task.priority] +
    " " +
    borderColor;
  const dueDateClasses =
    "text-xs " + (isOverdue ? "text-red-600 font-semibold" : "text-gray-400");

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-sm text-gray-900">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
      )}

      {task.dueDate && (
        <p className={dueDateClasses}>
          Due {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue ? " · Overdue" : ""}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <select
          aria-label="Task status"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <div className="flex gap-1.5">
          <Button
            variant="secondary"
            className="!px-2 !py-1 text-xs"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="!px-2 !py-1 text-xs"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
