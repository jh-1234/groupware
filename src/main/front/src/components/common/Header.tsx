import LogoButton from "../button/LogoButton";
import ProfileButton from "../button/ProfileButton";
import ChatButton from "../button/ChatButton";
import { useSession } from "@/store/authStore";
import { ROLE_ADMIN } from "@/lib/constants";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const session = useSession();
  const isAdmin = session?.roleId === ROLE_ADMIN;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-zinc-200 bg-white px-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.1)]">
      <div className="flex w-full items-center justify-between">
        <LogoButton />
        <div className="flex items-center gap-5">
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100 hover:text-blue-600"
              title="관리자 페이지"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden md:block">관리자</span>
            </button>
          )}

          {isAdmin && <div className="h-4 w-px bg-zinc-200" />}

          <ChatButton unreadCount={15} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
