import {
  deleteEmployee,
  getEmployees,
  getEmployeeSearchData,
} from "@/api/employee";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useEmployeeSearchData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.employee.searchData,
    queryFn: getEmployeeSearchData,
    staleTime: 60 * 60 * 1000,
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
