import { useState } from "react";
import { Download, UserPlus, X } from "lucide-react";
import EmployeeAddModal from "./EmployeeAddModal";
import { useEmployeeStore } from "@/store/employeeStore";
import { toast } from "sonner";
import { useEmployeeExcelDownload } from "@/hooks/useEmployee";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, searchWord } = useEmployeeStore();
  const { downloadExcel, isDownloading } = useEmployeeExcelDownload();

  const handleDownload = () => {
    toast.promise(downloadExcel(filters, searchWord), {
      loading: "엑셀 파일을 생성 중입니다...",
      success: "다운로드 완료",
      error: "다운로드 실패",
    });
  };

  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">사원 관리</h1>
          <p className="mt-1 text-sm text-zinc-500">
            조직 내 모든 사원의 계정 및 정보를 관리합니다.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download
              className={`h-4 w-4 ${isDownloading ? "animate-spin" : ""}`}
            />
            {isDownloading ? "다운로드 중..." : "엑셀 다운로드"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4" /> 사원 등록
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-100 p-6">
              <h2 className="text-xl font-bold text-zinc-900">
                신규 사원 등록
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <EmployeeAddModal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
