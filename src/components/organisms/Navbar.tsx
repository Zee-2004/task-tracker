"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <aside className="w-full md:w-56 md:shrink-0 bg-[#1a1a2e] text-white flex md:flex-col md:min-h-screen">
      <div className="px-4 md:px-5 py-3 md:py-5 md:border-b border-white/10 flex items-center md:block">
        <span className="font-bold text-base md:text-lg tracking-tight">
          Task<span className="text-violet-400">Tracker</span>
        </span>
      </div>
      <nav className="flex md:flex-1 md:flex-col px-2 md:px-3 py-2 md:py-4 gap-1 items-center md:items-stretch ml-auto md:ml-0">
        <a href="/dashboard" className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Dashboard</a>
        <a href="/board" className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Board</a>
      </nav>
      {session && (
        <div className="hidden md:block px-3 py-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </aside>
  );
}