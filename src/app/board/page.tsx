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

const emptyForm = {
  title: '',
  description: '',
  priority: 'MEDIUM' as const,
  status: 'TODO' as const,
  dueDate: '',
};

export default function BoardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

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

  const columns: { key: Task['status']; label: string }[] = [
    { key: 'TODO', label: 'To Do' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'DONE', label: 'Done' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Task Board</h1>
        <button
          onClick={openNewForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="bg-gray-50 rounded-lg p-3 space-y-3">
            <h2 className="text-sm font-semibold text-gray-600">{col.label}</h2>
            {tasks
              .filter((t) => t.status === col.key)
              .map((task) => {
                const isOverdue =
                  task.dueDate &&
                  task.status !== 'DONE' &&
                  new Date(task.dueDate) < new Date();

                return (
                  <div
                    key={task.id}
                    className={
                      'p-3 rounded-lg border bg-white shadow-sm space-y-2 ' +
                      (isOverdue ? 'border-red-400' : 'border-gray-200')
                    }
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <span
                        className={
                          'text-xs px-2 py-0.5 rounded-full font-semibold ' +
                          (task.priority === 'HIGH'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700')
                        }
                      >
                        {task.priority}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-gray-500">{task.description}</p>
                    )}

                    {task.dueDate && (
                      <p
                        className={
                          'text-xs ' +
                          (isOverdue ? 'text-red-600 font-semibold' : 'text-gray-400')
                        }
                      >
                        Due {new Date(task.dueDate).toLocaleDateString()}
                        {isOverdue ? ' (Overdue)' : ''}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <select
                        aria-label="Task status"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value as Task['status'])
                        }
                        className="text-xs border rounded px-1 py-0.5"
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditForm(task)}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId ? 'Edit Task' : 'New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="title" className="text-sm text-gray-600">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="description" className="text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="priority" className="text-sm text-gray-600">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value as Task['priority'] })
                    }
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="text-sm text-gray-600">
                    Status
                  </label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as Task['status'] })
                    }
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="dueDate" className="text-sm text-gray-600">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700"
                >
                  {editingId ? 'Save Changes' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 rounded-md py-2 text-sm font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}