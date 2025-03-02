"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-72">
        <Navbar />
        <main className="p-6 overflow-auto flex-1 bg-white border-l border-gray-200">{children}</main>
      </div>
    </div>
  );
}
