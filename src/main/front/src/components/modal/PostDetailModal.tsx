import { useAuthImages } from "@/hooks/useAuthImages";
import { useDeletePost, usePost } from "@/hooks/usePost";
import { useState } from "react";
import ImageSlider from "../common/ImageSlider";
import CommentList from "@/pages/community/CommentList";
import CommentInput from "@/pages/community/CommentInput";
import ImageLightBox from "../common/ImageLightBox";
import { Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useOpenConfirmModal } from "@/store/confirmModal";
import PostWriteModal from "./PostWriteModal";
import PostLikeButton from "../community/PostLikeButton";
import { useSession } from "@/store/authStore";

export default function PostDetailModal({
  isOpen,
  onClose,
  postId,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}) {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);
  const { data: post } = usePost(postId);
  const { mutate: deletePost } = useDeletePost();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const filePaths = post?.files?.map((f) => f.fileLoadPath) || [];
  const { blobUrls } = useAuthImages(filePaths);

  const openConfirmModal = useOpenConfirmModal();

  const session = useSession();
  const isMine = post?.authorId === session?.empId;

  const handlePostDelete = () => {
    openConfirmModal({
      title: "포스트 삭제",
      description: "포스트를 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(postId, {
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

            onClose();
          },
          onError: (e) => {
            toast.error("삭제 중 오류가 발생했습니다.", {
              position: "top-center",
            });

            console.error(e);
          },
        });
      },
    });
  };

  if (!isOpen || !postId) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black text-white uppercase">
            {post?.cateName}
          </span>
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-100 p-2 hover:bg-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="scrollbar-hide flex-1 overflow-y-auto px-6 py-8 md:px-10">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 font-black text-zinc-400">
                {post?.authorName?.slice(0, 1)}
              </div>
              <div>
                <div className="text-base font-black text-zinc-900">
                  {post?.authorName} {post?.posName}
                </div>
                <div className="text-xs font-medium text-zinc-400">
                  {post?.deptName} • {post?.createdDateFormat}
                </div>
              </div>
            </div>

            {isMine && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-zinc-100 hover:text-blue-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-zinc-100 hover:text-red-500"
                  onClick={handlePostDelete}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </section>

          <article className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-zinc-900">
              {post?.title}
            </h2>
            {blobUrls.length > 0 && (
              <ImageSlider
                images={blobUrls}
                onImageClick={(idx) =>
                  setLightbox({ images: blobUrls, index: idx })
                }
              />
            )}
            <p className="mt-6 text-base leading-relaxed whitespace-pre-wrap text-zinc-600">
              {post?.content}
            </p>
          </article>

          <div className="mt-6 flex items-center gap-4">
            <PostLikeButton
              postId={post?.postId!}
              isLiked={post?.isLiked!}
              likeCount={post?.likeCount!}
            />

            <div className="text-xs font-medium text-zinc-400">
              조회 {post?.viewCount || 0}
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <h3 className="mb-6 text-lg font-black text-zinc-900">
              댓글 {post?.commentCount || 0}
            </h3>
            <CommentList
              comments={post?.comments || []}
              lastAddedId={lastAddedId}
              setLastAddedId={setLastAddedId}
            />
          </div>
        </div>

        <CommentInput
          postId={postId}
          onSuccess={(newId) => setLastAddedId(newId)}
        />
      </div>

      {lightbox && (
        <ImageLightBox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {isEditModalOpen && (
        <PostWriteModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          post={post}
        />
      )}
    </div>
  );
}
