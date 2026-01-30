import type { Employee, EmployeeSearchData } from "@/types/employee";
import type { Page } from "@/types/page";
import api from "./instance/axiosInstance";

export const getEmployees = async (
  page: number,
  filters: any,
  searchWord: string,
): Promise<Page<Employee>> => {
  const { data } = await api.get("/api/admin/employees", {
    params: {
      page: page,
      size: 10,
      ...filters,
      searchWord,
    },
  });

  return data;
};

export const deleteEmployee = async (empId: number) => {
  const res = await api.delete(`/api/admin/employee/${empId}`);

  return res;
};

export const getEmployeeSearchData = async (): Promise<EmployeeSearchData> => {
  const { data } = await api.get("/api/admin/employee-search-data");

  return data;
};
