import type { AxiosError } from "axios";

export const axiosErrorMessageFormat = (e: AxiosError) => {
  const data = e.response?.data;

  if (!data) return "error";

  if (typeof data === "string") return data;

  if (typeof data === "object") return Object.values(data).join("\n");

  return "error";
};
