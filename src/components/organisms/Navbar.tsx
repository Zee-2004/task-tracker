'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <aside className="w-56 shrink-0 bg-[#1a1a2e] text-white min-h-screen flex flex-col">
      <div className="px-5 py-5 border-b border-white/10">
        <span className="font-bold text-lg tracking-tight">
          Task<span className="text-violet-400">Tracker</span>
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
          Dashboard
        </a>
        <a href="/board" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
          Board
        </a>
      </nav>
      {session && (
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </aside>
  );
}