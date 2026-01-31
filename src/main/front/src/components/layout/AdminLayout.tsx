import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import AdminSidebar from "../common/AdminSideBar";
import { useEffect } from "react";

const useAdminMenu = () => {
  // const { data } = useQuery(...)
  return {
    menus: [
      { icon: "Users", label: "사원 관리", path: "/admin/employees" },
      { icon: "Landmark", label: "부서 관리", path: "/admin/departments" },
      { icon: "Award", label: "직위 관리", path: "/admin/positions" },
      { icon: "ShieldCheck", label: "권한 관리", path: "/admin/auth" },
    ],
    isLoading: false,
  };
};

export default function AdminLayout() {
  const { menus, isLoading } = useAdminMenu();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading && menus && menus.length > 0 && pathname === "/admin") {
      navigate(menus[0].path, { replace: true });
    }
  }, [isLoading, menus, pathname, navigate]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar menus={menus ?? []} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
