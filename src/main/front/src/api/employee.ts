import type { Employee, EmployeeCommonData } from "@/types/employee";
import type { Page } from "@/types/page";
import api from "./instance/axiosInstance";

export const getEmployee = async (empId: number): Promise<Employee> => {
  const { data } = await api.get(`/api/admin/employee/${empId}`);

  return data;
};

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

export const saveEmployee = async (param: Employee) => {
  const res = await api.post("/api/admin/employee", param);

  return res;
};

export const deleteEmployee = async (empId: number) => {
  const res = await api.delete(`/api/admin/employee/${empId}`);

  return res;
};

export const getEmployeeCommonData = async (): Promise<EmployeeCommonData> => {
  const { data } = await api.get("/api/admin/employee-common-data");

  return data;
};

export const getEmployeeExcelData = async (
  filters: any,
  searchWord: string,
) => {
  const res = await api.get("/api/admin/employee/excel-download", {
    params: {
      ...filters,
      searchWord,
    },
    responseType: "blob",
  });

  return res;
};
