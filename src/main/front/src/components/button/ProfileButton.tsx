import { PopoverClose } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";
import { useSession } from "@/store/authStore";
import { User } from "lucide-react";

export default function ProfileButton() {
  const { mutate: logout } = useLogout();
  const session = useSession();

  const handleLogout = () => {
    logout();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80 active:scale-95">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-zinc-700">
              {session?.name}님
            </span>
          </div>

          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-200 p-0.5 shadow-sm transition-all group-hover:border-zinc-300 group-hover:ring-4 group-hover:ring-zinc-100">
            {session?.profileUrl ? (
              <img
                className="h-full w-full rounded-full object-cover p-0.5"
                src={session.profileUrl}
                alt="profile"
              />
            ) : (
              <User className="h-6 w-6 text-zinc-500 transition-colors group-hover:text-zinc-700" />
            )}
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="mt-2 w-28 overflow-hidden rounded-xl border border-zinc-200 p-0 shadow-xl"
        align="end"
      >
        <PopoverClose asChild>
          <Link to={`/profile/${session?.empId}`} className="block w-full">
            <div className="cursor-pointer px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100">
              내 정보
            </div>
          </Link>
        </PopoverClose>
        <div className="h-px bg-zinc-100" />
        <PopoverClose asChild>
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            로그아웃
          </button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
