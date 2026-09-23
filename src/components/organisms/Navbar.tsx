"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const initial = (session?.user?.name || session?.user?.email || "U").charAt(0).toUpperCase();

  return (
    <>
      <aside className="hidden md:flex md:w-60 md:shrink-0 md:flex-col bg-[#16162a] text-white min-h-screen">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-bold text-lg tracking-tight">Task<span className="text-violet-400">Tracker</span></span>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-1">
          <a href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Dashboard</a>
          <a href="/board" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Board</a>
        </nav>
        {session && (
          <div className="px-3 py-5 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-2.5 px-3">
              <span className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-xs font-semibold">{initial}</span>
              <span className="text-xs text-gray-400 truncate">{session.user?.email}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Log out</button>
          </div>
        )}
      </aside>

      <header className="md:hidden sticky top-0 z-40 bg-[#16162a] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <span className="font-bold text-base tracking-tight">Task<span className="text-violet-400">Tracker</span></span>
        <nav className="flex items-center gap-1">
          <a href="/dashboard" className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Dashboard</a>
          <a href="/board" className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Board</a>
          {session && (
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-xs font-semibold ml-1">{initial}</button>
          )}
        </nav>
      </header>
    </>
  );
}