import { useToggleCommentLike } from "@/hooks/usePost";
import { Heart } from "lucide-react";

export default function CommentLikeButton({
  commentId,
  isLiked,
  likeCount,
}: {
  commentId: number;
  isLiked: boolean;
  likeCount: number;
}) {
  const { mutate: toggleLike, isPending } = useToggleCommentLike();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike({ commentId, isLiked });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLikeClick}
      className={`group flex items-center gap-1.5 rounded-full px-2 py-1 text-sm transition-all active:scale-90 ${
        isLiked ? "text-red-500" : "text-zinc-400 hover:bg-zinc-100"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-transform group-hover:scale-110 ${
          isLiked ? "fill-current" : ""
        }`}
      />
      <span>{likeCount}</span>
    </button>
  );
}
