import CommentLikeButton from "@/components/community/CommentLikeButton";
import ReplyInput from "./ReplyInput";
import ImageSlider from "@/components/common/ImageSlider";
import type { PostComment } from "@/types/post";
import { useEffect, useRef, useState } from "react";
import { useDeletePostComment } from "@/hooks/usePost";
import { useAuthImages } from "@/hooks/useAuthImages";
import { useSession } from "@/store/authStore";
import { useOpenConfirmModal } from "@/store/confirmModal";
import { toast } from "sonner";
import { Clock, Trash2 } from "lucide-react";

export default function SingleComment({
  comment,
  activeReplyId,
  setActiveReplyId,
  isReply = false,
  isNew,
  onSuccess,
}: {
  comment: PostComment;
  activeReplyId: number | null;
  setActiveReplyId: (id: number | null) => void;
  isReply?: boolean;
  isNew: boolean;
  onSuccess: (newId: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deletePostComment } = useDeletePostComment();
  const commentRef = useRef<HTMLDivElement>(null);
  const filePaths = comment?.files?.map((f) => f.fileLoadPath) || [];
  const { blobUrls } = useAuthImages(filePaths);
  const isSelected = activeReplyId === comment.commentId;

  const session = useSession();
  const isMine = comment.empId === session?.empId;
  const openConfirmModal = useOpenConfirmModal();

  useEffect(() => {
    if (isNew && commentRef.current) {
      commentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isNew]);

  const handleDelete = () => {
    openConfirmModal({
      title: "댓글 삭제",
      description: "댓글을 삭제하시겠습니까?",
      onPositive: () => {
        deletePostComment(comment.commentId!, {
          onSuccess: () => {
            toast.success("삭제되었습니다.", {
              icon: <Trash2 size={18} />,
              position: "top-center",
              style: {
                backgroundColor: "white",
                color: "#ef4444",
                border: "none",
              },
            });
          },
          onError: (e) => {
            toast.error("삭제 중 오류가 발생했습니다.");
            console.error(e);
          },
        });
      },
    });
  };

  return (
    <div
      ref={commentRef}
      className={`group flex gap-4 transition-colors duration-700 ${isNew ? "rounded-xl bg-blue-50/50" : ""}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center font-bold shadow-sm ${isReply ? "rounded-xl bg-blue-50 text-blue-400" : "rounded-2xl bg-zinc-100 text-zinc-400"}`}
      >
        {comment.empName?.slice(0, 1)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-zinc-900">
              {comment.empName} {comment.posName}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
              <Clock className="h-3 w-3" /> {comment.createdDateFormat}
            </span>
          </div>

          {isMine && !isEditing && (
            <div className="ml-4 flex shrink-0 gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-[10px] font-bold text-zinc-400 transition-colors hover:text-blue-500"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="text-[10px] font-bold text-zinc-400 transition-colors hover:text-red-500"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <ReplyInput
              mode="edit"
              commentId={comment.commentId!}
              parentId={comment.parentId!}
              initialValue={comment.content}
              targetName={comment.empName!}
              onCancel={() => setIsEditing(false)}
              onSuccess={(newId: number) => {
                onSuccess(newId);
                setIsEditing(false);
              }}
            />
          </div>
        ) : (
          <>
            <p className="wrap-break-words mt-1 text-sm leading-relaxed text-zinc-600">
              {comment.parentId && (
                <span className="mr-1.5 font-bold text-blue-600 underline">
                  @{comment.targetEmpName}
                </span>
              )}
              {comment.content}
            </p>
            {blobUrls.length > 0 && (
              <div className="mt-2 max-w-xs">
                <ImageSlider type="comment" images={blobUrls} />
              </div>
            )}
          </>
        )}

        <div className="mt-3 flex gap-4 text-[11px] font-bold text-zinc-400">
          <CommentLikeButton
            commentId={comment.commentId!}
            isLiked={comment.isLiked!}
            likeCount={comment.likeCount!}
          />
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
            onSuccess={(newId: number) => {
              setActiveReplyId(null);
              onSuccess(newId);
            }}
          />
        )}
      </div>
    </div>
  );
}
