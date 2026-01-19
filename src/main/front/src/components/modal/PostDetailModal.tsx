import { useAuthImages } from "@/hooks/useAuthImages";
import { usePost } from "@/hooks/usePost";
import { useState } from "react";
import ImageSlider from "../common/ImageSlider";
import CommentList from "@/pages/community/CommentList";
import CommentInput from "@/pages/community/CommentInput";
import ImageLightBox from "../common/ImageLightBox";
import { Trash2, X } from "lucide-react";

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
  const { data: post } = usePost(postId);
  const filePaths = post?.files?.map((f) => f.fileLoadPath) || [];
  const { blobUrls } = useAuthImages(filePaths);

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
            <button className="text-zinc-300 hover:text-red-500">
              <Trash2 className="h-5 w-5" />
            </button>
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

          <div className="mt-12 border-t pt-8">
            <h3 className="mb-6 text-lg font-black text-zinc-900">
              댓글 {post?.comments?.length || 0}
            </h3>
            <CommentList comments={post?.comments || []} />
          </div>
        </div>

        <CommentInput postId={postId} />
      </div>

      {lightbox && (
        <ImageLightBox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
