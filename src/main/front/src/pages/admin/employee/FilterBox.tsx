import SelectBox from "@/components/common/SelectBox";
import { useEmployeeCommonData } from "@/hooks/useEmployee";
import { useEmployeeStore } from "@/store/employeeStore";
import { RotateCcw, Search } from "lucide-react";

export default function FilterBox() {
  const { filters, setFilter, searchWord, setSearchWord, resetAll } =
    useEmployeeStore();
  const { data: commonData } = useEmployeeCommonData();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <SelectBox
          title="부서"
          value={filters.deptId ?? ""}
          onChange={(e) => setFilter("deptId", e.target.value)}
          options={
            commonData?.departments.map((department) => ({
              id: department.deptId,
              name: department.deptName,
            })) ?? []
          }
        />

        <SelectBox
          title="직위"
          value={filters.posId ?? ""}
          onChange={(e) => setFilter("posId", e.target.value)}
          options={
            commonData?.positions.map((position) => ({
              id: position.posId,
              name: position.posName,
            })) ?? []
          }
        />

        <SelectBox
          title="권한"
          value={filters.roleId ?? ""}
          onChange={(e) => setFilter("roleId", e.target.value)}
          options={
            commonData?.roles.map((role) => ({
              id: role.roleId,
              name: role.roleName,
            })) ?? []
          }
        />

        <SelectBox
          title="재직 상태"
          value={filters.stateId ?? ""}
          onChange={(e) => setFilter("stateId", e.target.value)}
          options={
            commonData?.states.map((state) => ({
              id: state.stateId,
              name: state.stateName,
            })) ?? []
          }
        />

        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-red-600"
          title="필터 초기화"
        >
          <RotateCcw className="h-4 w-4" />
          <span>초기화</span>
        </button>
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
  );
}
