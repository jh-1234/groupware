import DatePicker from "@/components/common/DatePicker";
import SelectBox from "@/components/common/SelectBox";
import {
  useEmployee,
  useEmployeeCommonData,
  useSaveEmployee,
} from "@/hooks/useEmployee";
import { GENDER_FEMALE, GENDER_MALE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formatPhoneNumber } from "@/utils/commonUtils";
import { axiosErrorMessageFormat } from "@/utils/errorUtils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmployeeAddModal({
  empId,
  onClose,
}: {
  empId?: number;
  onClose: () => void;
}) {
  const isEditMode = !!empId;
  const { data: employee } = useEmployee(empId!);
  const { mutate: saveEmployee, isPending } = useSaveEmployee();
  const { data: commonData } = useEmployeeCommonData();

  const [form, setForm] = useState({
    empName: "",
    tel: "",
    username: "",
    password: "",
    email: "",
    gender: "M",
    birthday: "",
    hireDate: "",
    resignDate: "",
    deptId: "",
    posId: "",
    roleId: "",
    stateId: "",
  });

  useEffect(() => {
    if (isEditMode && employee) {
      setForm({
        empName: employee.empName || "",
        tel: employee.tel || "",
        username: employee.username || "",
        password: "",
        email: employee.email || "",
        gender: employee.gender || "",
        birthday: employee.birthday || "",
        hireDate: employee.hireDate || "",
        resignDate: employee.resignDate || "",
        deptId: String(employee.deptId || ""),
        posId: String(employee.posId || ""),
        roleId: String(employee.roleId || ""),
        stateId: String(employee.stateId || ""),
      });
    }
  }, [employee, isEditMode]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleChange("tel", formatted);
  };

  useEffect(() => {
    const states = commonData?.states;

    if (states && states.length > 0 && !form.stateId) {
      handleChange("stateId", String(states[0].stateId));
    }
  }, [commonData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const param = {
      ...form,

      deptId: form.deptId ? Number(form.deptId) : undefined,
      posId: form.posId ? Number(form.posId) : undefined,
      roleId: form.roleId ? Number(form.roleId) : undefined,
      stateId: form.stateId ? Number(form.stateId) : undefined,

      birthday: form.birthday || undefined,
      hireDate: form.hireDate || undefined,
      resignDate: form.resignDate || undefined,
    };

    saveEmployee(param, {
      onSuccess: () => {
        toast.success(isEditMode ? "수정 되었습니다." : "등록 되었습니다.", {
          position: "top-center",
        });

        onClose();
      },
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          alert(axiosErrorMessageFormat(e));
        }
      },
    });

    try {
    } catch (error) {
      console.error(error);
      toast.error("오류가 발생했습니다.", { position: "top-center" });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">이름</label>
          <input
            type="text"
            value={form.empName}
            onChange={(e) => handleChange("empName", e.target.value)}
            placeholder="이름"
            className="w-full rounded-md border border-zinc-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">연락처</label>
          <input
            type="tel"
            value={form.tel}
            onChange={handleTelChange}
            placeholder="연락처"
            className="w-full rounded-md border border-zinc-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">아이디</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="아이디"
            className="w-full rounded-md border border-zinc-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">
            비밀번호
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded-md border border-zinc-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">성별</label>
          <div className="flex h-9 w-full items-center rounded-lg bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => handleChange("gender", GENDER_MALE)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium transition-all",
                form.gender === GENDER_MALE
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700",
              )}
            >
              남성
            </button>
            <button
              type="button"
              onClick={() => handleChange("gender", GENDER_FEMALE)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium transition-all",
                form.gender === GENDER_FEMALE
                  ? "bg-white text-pink-600 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700",
              )}
            >
              여성
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">
            생년월일
          </label>
          <DatePicker
            date={form.birthday ? new Date(form.birthday) : undefined}
            setDate={(date) =>
              handleChange("birthday", date ? format(date, "yyyy-MM-dd") : "")
            }
            placeholder="생년월일"
          />
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">E-Mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="E-Mail"
            className="w-full rounded-md border border-zinc-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">부서</label>
          <SelectBox
            title="부서 선택"
            fullWidth={true}
            value={form.deptId}
            onChange={(e) => handleChange("deptId", e.target.value)}
            options={
              commonData?.departments.map((d) => ({
                id: d.deptId,
                name: d.deptName,
              })) ?? []
            }
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">직위</label>
          <SelectBox
            title="직위 선택"
            fullWidth={true}
            value={form.posId}
            onChange={(e) => handleChange("posId", e.target.value)}
            options={
              commonData?.positions.map((p) => ({
                id: p.posId,
                name: p.posName,
              })) ?? []
            }
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">권한</label>
          <SelectBox
            title="권한 선택"
            fullWidth={true}
            value={form.roleId}
            onChange={(e) => handleChange("roleId", e.target.value)}
            options={
              commonData?.roles.map((r) => ({
                id: r.roleId,
                name: r.roleName,
              })) ?? []
            }
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">
            재직 상태
          </label>
          <SelectBox
            fullWidth={true}
            value={form.stateId}
            onChange={(e) => handleChange("stateId", e.target.value)}
            options={
              commonData?.states.map((s) => ({
                id: s.stateId,
                name: s.stateName,
              })) ?? []
            }
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">입사일</label>
          <DatePicker
            date={form.hireDate ? new Date(form.hireDate) : undefined}
            setDate={(date) =>
              handleChange("hireDate", date ? format(date, "yyyy-MM-dd") : "")
            }
            placeholder="입사일"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-zinc-700">퇴사일</label>
          <DatePicker
            date={form.resignDate ? new Date(form.resignDate) : undefined}
            setDate={(date) =>
              handleChange("resignDate", date ? format(date, "yyyy-MM-dd") : "")
            }
            placeholder="퇴사일"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          disabled={isPending}
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          disabled={isPending}
        >
          {isEditMode ? "수정" : "등록"}
        </button>
      </div>
    </form>
  );
}
