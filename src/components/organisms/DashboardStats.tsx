import { Task } from '../molecules/TaskCard';

interface DashboardStatsProps {
  tasks: Task[];
}

export default function DashboardStats({ tasks }: DashboardStatsProps) {
  const todoCount = tasks.filter((t) => t.status === 'TODO').length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const doneCount = tasks.filter((t) => t.status === 'DONE').length;

  const overdueCount = tasks.filter((t) => {
    if (!t.dueDate) return false;
    if (t.status === 'DONE') return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-white border rounded-xl p-4">
        <p className="text-xs text-gray-500">To Do</p>
        <p className="text-2xl font-semibold text-gray-900">{todoCount}</p>
      </div>
      <div className="bg-white border rounded-xl p-4">
        <p className="text-xs text-gray-500">In Progress</p>
        <p className="text-2xl font-semibold text-gray-900">{inProgressCount}</p>
      </div>
      <div className="bg-white border rounded-xl p-4">
        <p className="text-xs text-gray-500">Done</p>
        <p className="text-2xl font-semibold text-gray-900">{doneCount}</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-xs text-red-600">Overdue</p>
        <p className="text-2xl font-semibold text-red-600">{overdueCount}</p>
      </div>
    </div>
  );
}