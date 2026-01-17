import { useReissue } from "@/hooks/useAuth";
import { getAccessToken, useAuthActions } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

export default function AuthLayout() {
  const {
    mutate: refreshLogin,
    isPending,
    isError,
    isSuccess,
    isIdle,
  } = useReissue();
  const token = getAccessToken();
  const { clearToken } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      refreshLogin();
    }
  }, [token, refreshLogin]);

  useEffect(() => {
    if (isError) {
      clearToken();
      navigate("/login", { replace: true });
    }
  }, [isError, clearToken, navigate]);

  if (token || isSuccess) return <Outlet />;

  if (isPending || isIdle) return <Loading />;

  return <Navigate to={"/login"} replace />;
}
