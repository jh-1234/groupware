import { useEffect, useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import { useDeleteEmployee, useEmployees } from "@/hooks/useEmployee";
import { STATE_EMPLOYED, STATE_RESIGNED } from "@/lib/constants";
import CustomPagination from "@/components/common/Pagination";
import { useOpenConfirmModal } from "@/store/confirmModalStore";
import { toast } from "sonner";
import Header from "./Header";
import { useEmployeeStore } from "@/store/employeeStore";
import FilterBox from "./FilterBox";
import EmployeeAddModal from "./EmployeeAddModal";

export default function EmployeeManagement() {
  const { page, filters, searchWord, setPage } = useEmployeeStore();
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seletedEmpId, setSeletedEmpId] = useState<number>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
      setPage(0);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  const { data } = useEmployees(page, filters, debouncedSearchWord);
  const employees = data?.content;

  const handleUpdate = (empId: number) => {
    setSeletedEmpId(empId);
    setIsModalOpen(true);
  };

  const { mutate: deleteEmployee } = useDeleteEmployee();

  const openConfirmModal = useOpenConfirmModal();

  const handleDelete = (empId: number) => {
    openConfirmModal({
      title: "사원 삭제",
      description: "사원을 삭제하시겠습니까?",
      onPositive: () => {
        deleteEmployee(empId, {
          onSuccess: () => {
            toast.success("삭제되었습니다.", {
              icon: <Trash2 size={18} />,
              position: "top-center",
              style: {
                backgroundColor: "white",
                color: "#ef4444",
                border: "none",
              },
            });
          },
          onError: (e) => {
            toast.error("삭제 중 오류가 발생했습니다.", {
              position: "top-center",
            });

            console.error(e);
          },
        });
      },
    });
  };

  return (
    <div className="p-8">
      <Header />

      <FilterBox />

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs text-zinc-600 uppercase">
            <tr>
              <th className="px-4 py-4 text-center font-semibold">No</th>
              <th className="px-6 py-4 text-center font-semibold">이름</th>
              <th className="px-6 py-4 text-center font-semibold">부서</th>
              <th className="px-6 py-4 text-center font-semibold">직위</th>
              <th className="px-6 py-4 text-center font-semibold">권한</th>
              <th className="px-6 py-4 text-center font-semibold">연락처</th>
              <th className="px-6 py-4 text-center font-semibold">상태</th>
              <th className="px-6 py-4 text-center font-semibold">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {employees && employees.length > 0 ? (
              employees.map((employee) => (
                <tr
                  key={employee.empId}
                  className="text-center transition-colors hover:bg-zinc-50/50"
                >
                  <td className="px-4 py-4 font-mono text-zinc-400">
                    {employee.no}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {employee.empName}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-600">
                    {employee.deptName}
                  </td>
                  <td className="px-6 py-4 text-zinc-600">
                    {employee.posName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                      {employee.roleName}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-500">
                    {employee.tel}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        employee.stateId === STATE_EMPLOYED
                          ? "bg-green-50 text-green-700"
                          : employee.stateId === STATE_RESIGNED
                            ? "bg-amber-50 text-amber-700"
                            : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {employee.stateName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <button
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => handleUpdate(employee.empId!)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(employee.empId!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-20 text-center font-medium text-zinc-400"
                >
                  조회된 사원 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {employees && employees.length > 0 && (
        <CustomPagination
          count={data?.totalPage!}
          page={page}
          onChange={(_, p) => setPage(p - 1)}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-100 p-6">
              <h2 className="text-xl font-bold text-zinc-900">
                사원 정보 수정
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <EmployeeAddModal
                empId={seletedEmpId}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
