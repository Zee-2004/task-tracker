'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';
import TaskBoard from '@/components/organisms/TaskBoard';
import TaskForm, { TaskFormValues } from '@/components/organisms/TaskForm';
import DashboardLayout from '@/components/templates/DashboardLayout';
import { Task } from '@/components/molecules/TaskCard';

const emptyForm: TaskFormValues = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  status: 'TODO',
  dueDate: '',
};

export default function BoardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TaskFormValues>(emptyForm);

  const userId = (session?.user as { id?: string })?.id;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  async function loadTasks() {
    if (!userId) return;
    const res = await fetch('/api/tasks?userId=' + userId);
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (session) {
      loadTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(task: Task) {
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
    setEditingId(task.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await fetch('/api/tasks/' + editingId, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId }),
      });
    }

    setShowForm(false);
    loadTasks();
  }

  async function handleDelete(id: string) {
    await fetch('/api/tasks/' + id, { method: 'DELETE' });
    loadTasks();
  }

  async function handleStatusChange(id: string, newStatus: Task['status']) {
    await fetch('/api/tasks/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    loadTasks();
  }

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Task Board</h1>
        <Button onClick={openNewForm}>+ New Task</Button>
      </div>

      <TaskBoard
        tasks={tasks}
        onEdit={openEditForm}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {showForm && (
        <TaskForm
          values={form}
          isEditing={!!editingId}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </DashboardLayout>
  );
}