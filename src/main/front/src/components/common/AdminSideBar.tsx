import { Users, Landmark, Award, ShieldCheck, ChevronLeft } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const adminMenuItems = [
  { icon: Users, label: "사원 관리", path: "/admin/employees" },
  { icon: Landmark, label: "부서 관리", path: "/admin/departments" },
  { icon: Award, label: "직위 관리", path: "/admin/positions" },
  { icon: ShieldCheck, label: "권한 관리", path: "/admin/auth" },
];

export default function AdminSidebar() {
  return (
    <aside className="flex h-full w-52 flex-col border-r border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-6 py-4">
        <div className="h-2 w-2 rounded-full bg-blue-600" />
        <span className="font-bold text-zinc-800">관리자 설정</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
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
