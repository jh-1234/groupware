import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import { usePostCategories, usePostSave } from "@/hooks/usePost";
import { useOpenConfirmModal } from "@/store/confirmModal";
import { axiosErrorMessageFormat } from "@/utils/errorUtils";
import axios from "axios";
import { toast } from "sonner";
import type { Post } from "@/types/post";
import type { ImagePreview } from "../common/ImageUploader";
import ImageUploader from "../common/ImageUploader";
import { useAuthImages } from "@/hooks/useAuthImages";

interface PostWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: Post;
}

export default function PostWriteModal({
  isOpen,
  onClose,
  post,
}: PostWriteModalProps) {
  const isEditMode = !!post;
  const openConfirmModal = useOpenConfirmModal();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCateId, setSelectedCateId] = useState<number | undefined>(
    undefined,
  );
  const [images, setImages] = useState<ImagePreview[]>([]);

  const { data: categoryData } = usePostCategories();
  const { mutate: postSave, isPending } = usePostSave();
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);
  const filePaths = post?.files?.map((f) => f.fileLoadPath) || [];
  const { blobUrls } = useAuthImages(filePaths);
  const categories = categoryData?.filter((category) => category.cateId !== 1);

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && post && blobUrls.length > 0) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setSelectedCateId(post.cateId);

      setImages(
        post.files?.map((f, index) => ({
          file: null,
          previewUrl: blobUrls[index],
          fileId: f.fileId,
        })) || [],
      );

      setDeleteFileIds([]);
    } else {
      setTitle("");
      setContent("");
      setImages([]);
      setDeleteFileIds([]);

      if (!selectedCateId && categories?.length) {
        setSelectedCateId(categories[0].cateId);
      }
    }
  }, [isOpen, isEditMode, post, categories, blobUrls]);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (!img.fileId && img.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    };
  }, []);

  const removeImage = (index: number) => {
    const target = images[index];

    if (target.fileId) {
      setDeleteFileIds((prev) => [...prev, target.fileId!]);
    } else {
      URL.revokeObjectURL(target.previewUrl);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCloseAttempt = () => {
    const hasTitleChanged = title !== (post?.title || "");
    const hasContentChanged = content !== (post?.content || "");
    const hasImagesChanged =
      deleteFileIds.length > 0 || images.some((img) => img.file);

    const isChanged = isEditMode
      ? hasTitleChanged || hasContentChanged || hasImagesChanged
      : title.trim() !== "" || content.trim() !== "" || images.length > 0;

    if (isChanged) {
      openConfirmModal({
        title: "작성을 중단하시겠습니까?",
        onPositive: () => onClose(),
      });
    } else {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    const param = {
      postId: post?.postId,
      title: title.trim(),
      content: content.trim(),
      cateId: selectedCateId,
      deleteFileIds: deleteFileIds,
    };

    const newFiles = images
      .filter((image) => image.file)
      .map((image) => image.file as File);

    postSave(
      { param, images: newFiles },
      {
        onSuccess: () => {
          toast.success(
            isEditMode ? "포스트가 수정되었습니다" : "포스트가 등록되었습니다.",
            {
              position: "top-center",
            },
          );

          onClose();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            alert(axiosErrorMessageFormat(e));
          }
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
      <div
        className="animate-in fade-in absolute inset-0 bg-zinc-900/60 backdrop-blur-sm duration-300"
        onClick={handleCloseAttempt}
      />

      <div
        className="animate-in zoom-in-95 relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-zinc-100 px-8 pt-6">
          <div>
            <h2 className="text-xl font-black text-zinc-900">
              {isEditMode ? "게시글 수정" : "게시글 작성"}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-zinc-400">
              {isEditMode
                ? "내용을 수정하여 정보를 업데이트하세요."
                : "동료들과 따뜻한 이야기를 나누어보세요."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseAttempt}
            className="rounded-full bg-zinc-100 p-2 text-zinc-500 transition-colors hover:bg-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col px-8 py-4">
          <div className="scrollbar-hide mb-2 flex gap-2 overflow-x-auto border-b pb-4">
            {categories?.map((category) => (
              <button
                key={category.cateId}
                type="button"
                onClick={() => setSelectedCateId(category.cateId)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  category.cateId === selectedCateId
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                {category.cateName}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="text-2xl font-black tracking-tight text-zinc-900 outline-none placeholder:text-zinc-300"
          />

          <div className="my-3 h-px bg-zinc-200" />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="h-60 w-full resize-none text-base leading-relaxed font-medium text-zinc-600 outline-none placeholder:text-zinc-300"
          />

          <div className="mt-8 flex items-center justify-between border-t border-zinc-50 pt-6">
            <ImageUploader
              images={images}
              onImagesChange={setImages}
              onRemoveImage={removeImage}
            />

            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || isPending}
              className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-8 py-3 text-sm font-black text-white shadow-xl transition-all hover:bg-blue-600 active:scale-95 disabled:bg-zinc-200 disabled:shadow-none"
            >
              <Send className="h-4 w-4" />
              {isPending ? "처리 중..." : isEditMode ? "수정완료" : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
