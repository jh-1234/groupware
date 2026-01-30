import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import AdminSidebar from "../common/AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
