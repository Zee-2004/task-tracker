'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-white px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-gray-900">Task Tracker</span>
        <a href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
          Dashboard
        </a>
        <a href="/board" className="text-sm text-gray-600 hover:text-gray-900">
          Board
        </a>
      </div>
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Log out
        </button>
      )}
    </nav>
  );
}