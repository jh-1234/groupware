import { login, logout, reissueToken } from "@/api/auth";
import { useAuthActions } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useReissue = () => {
  const { setToken, clearToken } = useAuthActions();

  return useMutation({
    mutationFn: reissueToken,
    onSuccess: (newAccessToken) => {
      setToken(newAccessToken);
    },
    onError: () => {
      clearToken();
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearToken } = useAuthActions();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearToken();
      navigate("/login", { replace: true });
    },
    onError: (e) => {
      console.error(e);
    },
  });
};
