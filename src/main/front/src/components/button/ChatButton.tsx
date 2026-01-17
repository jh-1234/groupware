import { MessageCircle } from "lucide-react";

export default function ChatButton({ unreadCount }: { unreadCount: number }) {
  return (
    <button className="group relative rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100">
      <MessageCircle className="h-6 w-6 group-hover:text-zinc-700" />

      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
