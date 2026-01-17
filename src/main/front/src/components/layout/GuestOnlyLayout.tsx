import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyLayout() {
  const data = sessionStorage.getItem("isLogin");

  if (data) {
    const parse = JSON.parse(data);
    const isLogin = parse.state.isLogin === true;

    if (isLogin) return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
