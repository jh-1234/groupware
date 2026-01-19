import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import GuestOnlyLayout from "./components/layout/GuestOnlyLayout";
import LoginLayout from "./components/layout/LoginLayout";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import Community from "./pages/community/Community";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GuestOnlyLayout />}>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Route>
    </Routes>
  );
}
