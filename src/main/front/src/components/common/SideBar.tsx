import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Mail,
  Users,
  Briefcase,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "커뮤니티", path: "/community" },
  { icon: Mail, label: "전자메일", path: "/mail" },
  { icon: FileText, label: "전자결재", path: "/approval" },
  { icon: Calendar, label: "일정관리", path: "/calendar" },
  { icon: Users, label: "주소록", path: "/contacts" },
  { icon: Briefcase, label: "근태관리", path: "/attendance" },
  { icon: Settings, label: "설정", path: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-full">
      <aside
        className={`group relative flex h-screen flex-col border-r border-zinc-200 bg-white shadow-sm transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-3/7 -right-4 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-blue-50 hover:text-blue-600`}
        >
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`}
          />
        </button>

        <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group/item flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                } ${isCollapsed ? "justify-center" : "justify-between"}`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`h-5 w-5 shrink-0 transition-transform group-hover/item:scale-110`}
                />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isCollapsed
                      ? "invisible w-0 opacity-0"
                      : "visible w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {!isCollapsed && (
                <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover/item:opacity-100" />
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
