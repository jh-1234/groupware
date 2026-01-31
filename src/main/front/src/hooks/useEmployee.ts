import {
  deleteEmployee,
  getEmployee,
  getEmployeeCommonData,
  getEmployeeExcelData,
  getEmployees,
  saveEmployee,
} from "@/api/employee";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useEmployee = (empId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.employee.detail(empId),
    queryFn: () => getEmployee(empId),
    enabled: !!empId,
  });
};

export const useEmployees = (
  page: number,
  filters: any,
  searchWord: string,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.employee.list, page, filters, searchWord],
    queryFn: () => getEmployees(page, filters, searchWord),
  });
};

export const useSaveEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employee.list });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.employee.list });
    },
  });
};

export const useEmployeeCommonData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.employee.commonData,
    queryFn: getEmployeeCommonData,
    staleTime: 60 * 60 * 1000,
  });
};

export const useEmployeeExcelDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = async (filters: any, searchWord: string) => {
    setIsDownloading(true);

    try {
      const response = await getEmployeeExcelData(filters, searchWord);

      const contentDisposition = response.headers["content-disposition"];
      let fileName = "download.xlsx";

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
        );

        if (fileNameMatch != null && fileNameMatch[1]) {
          fileName = decodeURI(fileNameMatch[1].replace(/['"]/g, ""));
        }
      }

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadExcel, isDownloading };
};
