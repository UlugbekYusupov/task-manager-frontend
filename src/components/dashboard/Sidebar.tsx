"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  Settings,
  Calendar,
} from "lucide-react";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: <FolderOpen size={20} />,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar size={20} />,
  },

  { name: "Team", href: "/dashboard/team", icon: <Users size={20} /> },

  // {
  //   name: "Settings",
  //   href: "/dashboard/settings",
  //   icon: <Settings size={20} />,
  // },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white-800 text-gray border-l border-gray-200 w-72 p-6 h-screen fixed">
      <div className="text-xl font-bold mb-6">Task Manager</div>
      <p className="text-sm text-gray-400 mb-2">MENU</p>
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map(({ name, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-4 py-2 rounded-lg transition-all",
              pathname === href ? "text-blue-600" : "hover:bg-gray-100"
            )}
          >
            {icon} <span>{name}</span>
          </Link>
        ))}
      </nav>
      <p className="text-sm text-gray-400 mt-8">OTHERS</p>
      <Link
        href="/dashboard/settings"
        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:bg-gray-100"
      >
        <Settings size={20} /> <span>Settings</span>
      </Link>
      {/* logout */}
    </aside>
  );
}
