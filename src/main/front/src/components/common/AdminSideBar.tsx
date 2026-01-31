import { ChevronLeft } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import * as Icons from "lucide-react";

export default function AdminSidebar({ menus }: { menus: any[] }) {
  return (
    <aside className="flex h-full w-52 flex-col border-r border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-6 py-4">
        <div className="h-2 w-2 rounded-full bg-blue-600" />
        <span className="font-bold text-zinc-800">관리자 설정</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menus.map((menu) => {
          const IconComponent = (Icons as any)[menu.icon] || Icons.HelpCircle;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`
              }
            >
              <IconComponent className="h-5 w-5 shrink-0" />
              <span>{menu.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-100 p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900"
        >
          <ChevronLeft className="h-4 w-4" />
          메인으로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
