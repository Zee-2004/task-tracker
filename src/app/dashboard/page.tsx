"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardStats from "@/components/organisms/DashboardStats";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { Task } from "@/components/molecules/TaskCard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchTasks() {
      const userId = (session?.user as { id?: string })?.id;
      if (!userId) return;

      const res = await fetch("/api/tasks?userId=" + userId);
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

  if (status === "loading" || loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  const boardLink = "/board";

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <DashboardStats tasks={tasks} />
      <a
        href={boardLink}
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
      >
        Go to Task Board
      </a>
    </DashboardLayout>
  );
}
