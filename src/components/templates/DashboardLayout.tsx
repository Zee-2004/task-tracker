import { ReactNode } from 'react';
import Navbar from '../organisms/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}