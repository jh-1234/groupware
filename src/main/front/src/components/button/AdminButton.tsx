import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminButton() {
  return (
    <Link
      to={"/admin"}
      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100 hover:text-blue-600"
      title="관리자 페이지"
    >
      <Settings className="h-5 w-5" />
      <span className="hidden md:block">관리자</span>
    </Link>
  );
}
