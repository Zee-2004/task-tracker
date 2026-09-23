import { ReactNode } from "react";
import Navbar from "../organisms/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f6f6fb]">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-6xl mx-auto w-full">{children}</main>
    </div>
  );
}