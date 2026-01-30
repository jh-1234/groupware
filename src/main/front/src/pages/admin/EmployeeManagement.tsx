import { useEffect, useState } from "react";
import { Search, Download, Edit2, Trash2, UserPlus } from "lucide-react";
import {
  useDeleteEmployee,
  useEmployees,
  useEmployeeSearchData,
} from "@/hooks/useEmployee";
import { STATE_EMPLOYED, STATE_RESIGNED } from "@/lib/constants";
import CustomPagination from "@/components/common/Pagination";
import SelectBox from "@/components/common/SelectBox";
import { useOpenConfirmModal } from "@/store/confirmModal";
import { toast } from "sonner";

export default function EmployeeManagement() {
  const [page, setPage] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState(searchWord);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchWord(searchWord);
      setPage(0);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchWord]);

  const [filters, setFilters] = useState<{
    deptId: number | null;
    posId: number | null;
    roleId: number | null;
    stateId: number | null;
  }>({
    deptId: null,
    posId: null,
    roleId: null,
    stateId: null,
  });

  const { data } = useEmployees(page, filters, debouncedSearchWord);
  const employees = data?.content;

  const { data: searchData } = useEmployeeSearchData();

  const { mutate: deleteEmployee } = useDeleteEmployee();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? null : Number(value),
    }));

    setPage(0);
  };

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
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">사원 관리</h1>
          <p className="mt-1 text-sm text-zinc-500">
            조직 내 모든 사원의 계정 및 정보를 관리합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50">
            <Download className="h-4 w-4" /> 엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700">
            <UserPlus className="h-4 w-4" /> 사원 개별 등록
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <SelectBox
            title="부서"
            onChange={(e) => handleFilterChange("deptId", e.target.value)}
            options={
              searchData?.departments.map((department) => ({
                id: department.deptId,
                name: department.deptName,
              })) ?? []
            }
          />
          <SelectBox
            title="직위"
            onChange={(e) => handleFilterChange("posId", e.target.value)}
            options={
              searchData?.positions.map((position) => ({
                id: position.posId,
                name: position.posName,
              })) ?? []
            }
          />
          <SelectBox
            title="권한"
            onChange={(e) => handleFilterChange("roleId", e.target.value)}
            options={
              searchData?.roles.map((role) => ({
                id: role.roleId,
                name: role.roleName,
              })) ?? []
            }
          />
          <SelectBox
            title="재직 상태"
            onChange={(e) => handleFilterChange("stateId", e.target.value)}
            options={
              searchData?.states.map((state) => ({
                id: state.stateId,
                name: state.stateName,
              })) ?? []
            }
          />
        </div>

        <div className="relative ml-auto max-w-md min-w-72 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="이름, 연락처로 검색..."
            className="w-full rounded-md border border-zinc-200 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </div>

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
                      <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-blue-50 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(employee.empId)}
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
    </div>
  );
}
