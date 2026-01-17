import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Sidebar from "../common/SideBar";

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
