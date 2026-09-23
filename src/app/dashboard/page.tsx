'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate?: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchTasks() {
      const userId = (session?.user as { id?: string })?.id;
      if (!userId) return;

      const res = await fetch('/api/tasks?userId=' + userId);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
      setLoading(false);
    }

    if (session) {
      fetchTasks();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  const todoCount = tasks.filter((t) => t.status === 'TODO').length;
  const inProgressCount = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const doneCount = tasks.filter((t) => t.status === 'DONE').length;

  const overdue = tasks.filter((t) => {
    if (!t.dueDate) return false;
    if (t.status === 'DONE') return false;
    return new Date(t.dueDate) < new Date();
  });

  const boardLink = "/board";

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">To Do</p>
          <p className="text-2xl font-semibold">{todoCount}</p>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">In Progress</p>
          <p className="text-2xl font-semibold">{inProgressCount}</p>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <p className="text-xs text-gray-500">Done</p>
          <p className="text-2xl font-semibold">{doneCount}</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-xs text-red-600">Overdue</p>
          <p className="text-2xl font-semibold text-red-600">{overdue.length}</p>
        </div>
      </div>

      <a href={boardLink} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Go to Task Board</a>
    </div>
  );
}