import { useTogglePostLike } from "@/hooks/usePost";
import { Heart } from "lucide-react";

export default function PostLikeButton({
  postId,
  isLiked,
  likeCount,
}: {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}) {
  const { mutate: togglePostLike, isPending } = useTogglePostLike();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    togglePostLike({
      postId,
      isLiked,
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLikeClick}
      className={`group flex items-center gap-2 rounded-full px-4 py-2 transition-all active:scale-90 ${
        isLiked
          ? "bg-red-50 text-red-500"
          : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
      }`}
    >
      <Heart
        className={`h-5 w-5 transition-transform group-hover:scale-110 ${
          isLiked ? "fill-current" : ""
        }`}
      />
      <span>{likeCount}</span>
    </button>
  );
}
