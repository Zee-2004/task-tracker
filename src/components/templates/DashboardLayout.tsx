import { ReactNode } from 'react';
import Navbar from '../organisms/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f5f5fa]">
      <Navbar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}