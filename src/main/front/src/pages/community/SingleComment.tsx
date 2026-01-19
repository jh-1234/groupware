import { Clock } from "lucide-react";
import ImageSlider from "@/components/common/ImageSlider";
import { useAuthImages } from "@/hooks/useAuthImages";
import ReplyInput from "./ReplyInput";
import type { PostComment } from "@/types/post";

export default function SingleComment({
  comment,
  activeReplyId,
  setActiveReplyId,
  isReply = false,
}: {
  comment: PostComment;
  activeReplyId: number | null;
  setActiveReplyId: (id: number | null) => void;
  isReply?: boolean;
}) {
  const filePaths = comment?.files?.map((f) => f.fileLoadPath) || [];
  const { blobUrls } = useAuthImages(filePaths);
  const isSelected = activeReplyId === comment.commentId;

  return (
    <div className="group flex gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center font-bold shadow-sm ${isReply ? "rounded-xl bg-blue-50 text-blue-400" : "rounded-2xl bg-zinc-100 text-zinc-400"}`}
      >
        {comment.empName?.slice(0, 1)}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-zinc-900">
            {comment.empName} {comment.posName}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
            <Clock className="h-3 w-3" /> {comment.createdDateFormat}
          </span>
        </div>

        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          {comment.empName && (
            <span className="mr-1.5 font-bold text-blue-600 underline">
              @{comment.empName}
            </span>
          )}
          {comment.content}
        </p>

        {blobUrls.length > 0 && (
          <div className="mt-2 max-w-xs">
            <ImageSlider type="comment" images={blobUrls} />
          </div>
        )}

        <div className="mt-3 flex gap-4 text-[11px] font-bold text-zinc-400">
          <button className="hover:text-rose-500">
            좋아요 {comment.likeCount || ""}
          </button>
          <button
            onClick={() =>
              setActiveReplyId(isSelected ? null : comment.commentId!)
            }
            className={isSelected ? "text-blue-600" : "hover:text-blue-600"}
          >
            답글쓰기
          </button>
        </div>

        {isSelected && (
          <ReplyInput
            parentId={comment.commentId!}
            targetName={comment.empName!}
            onCancel={() => setActiveReplyId(null)}
            onSuccess={() => {
              setActiveReplyId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
