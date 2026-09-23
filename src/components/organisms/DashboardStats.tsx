import { Task } from "../molecules/TaskCard";

interface DashboardStatsProps {
  tasks: Task[];
}

export default function DashboardStats({ tasks }: DashboardStatsProps) {
  const todoCount = tasks.filter((t) => t.status === "TODO").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;

  const overdueCount = tasks.filter((t) => {
    if (!t.dueDate) return false;
    if (t.status === "DONE") return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          To Do
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{todoCount}</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          In Progress
        </p>
        <p className="text-3xl font-bold text-blue-600 mt-1">
          {inProgressCount}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Done
        </p>
        <p className="text-3xl font-bold text-green-600 mt-1">{doneCount}</p>
      </div>
      <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 shadow-sm text-white">
        <p className="text-xs font-medium uppercase tracking-wide opacity-90">
          Overdue
        </p>
        <p className="text-3xl font-bold mt-1">{overdueCount}</p>
      </div>
    </div>
  );
}
