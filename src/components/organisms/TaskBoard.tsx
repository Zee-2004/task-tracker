import TaskCard, { Task } from '../molecules/TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const COLUMNS: { key: Task['status']; label: string }[] = [
  { key: 'TODO', label: 'To Do' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'DONE', label: 'Done' },
];

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COLUMNS.map((col) => (
        <div key={col.key} className="bg-gray-50 rounded-xl p-3 space-y-3 min-h-[120px]">
          <h2 className="text-sm font-semibold text-gray-600 flex items-center justify-between">
            {col.label}
            <span className="text-xs bg-white border rounded-full px-2 py-0.5 text-gray-500">
              {tasks.filter((t) => t.status === col.key).length}
            </span>
          </h2>
          {tasks
            .filter((t) => t.status === col.key)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
        </div>
      ))}
    </div>
  );
}