import type { Login } from "@/types/auth";
import api from "./instance/axiosInstance";

export const login = async (param: Login): Promise<string> => {
  const { data } = await api.post<string>("/api/login", param);

  return data;
};

export const reissueToken = async (): Promise<string> => {
  const { data } = await api.post<string>("/api/reissue");

  return data;
};

export const logout = async () => {
  const res = await api.post("/api/logout");

  return res;
};
