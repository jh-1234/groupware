import LogoButton from "../button/LogoButton";
import ProfileButton from "../button/ProfileButton";
import ChatButton from "../button/ChatButton";
import { useSession } from "@/store/authStore";
import { ROLE_ADMIN } from "@/lib/constants";
import AdminButton from "../button/AdminButton";

export default function Header() {
  const session = useSession();
  const isAdmin = session?.roleId === ROLE_ADMIN;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-zinc-200 bg-white px-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.1)]">
      <div className="flex w-full items-center justify-between">
        <LogoButton />
        <div className="flex items-center gap-5">
          {isAdmin && <AdminButton />}

          {isAdmin && <div className="h-4 w-px bg-zinc-200" />}

          <ChatButton unreadCount={15} />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
