import type { ImagePreview } from "@/components/common/ImageUploader";
import ImageUploader from "@/components/common/ImageUploader";
import { usePostCommentSave } from "@/hooks/usePost";
import { MessageSquare, Image as ImageIcon, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ReplyInputProps {
  parentId: number;
  commentId?: number;
  targetName: string;
  initialValue?: string;
  mode?: "reply" | "edit";
  onCancel: () => void;
  onSuccess: (newId: number) => void;
}

export default function ReplyInput({
  parentId,
  commentId,
  targetName,
  initialValue = "",
  mode = "reply",
  onCancel,
  onSuccess,
}: ReplyInputProps) {
  const [content, setContent] = useState(initialValue);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const uploaderRef = useRef<{ open: () => void }>(null);

  const { mutate: commentSave, isPending } = usePostCommentSave();

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      if (newImages[index].previewUrl)
        URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleReplySubmit = () => {
    if (isPending) return;

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const param = {
      commentId: mode === "edit" ? commentId : undefined,
      parentId: mode === "reply" ? parentId : undefined,
      content: content.trim(),
      deleteFileIds: [],
    };

    const newFiles = images
      .filter((img) => img.file)
      .map((img) => img.file as File);

    commentSave(
      { param, images: newFiles },
      {
        onSuccess: (res) => {
          toast.success(
            mode === "edit" ? "수정되었습니다." : "등록되었습니다.",
          );
          if (mode === "reply") setContent("");
          setImages([]);
          onSuccess(res.data);
        },
      },
    );
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      });
    };
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-top-2 mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-inner">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-blue-600">
        {mode === "edit" ? (
          <>
            <Pencil className="h-3 w-3" />
            <span>댓글 수정 중</span>
          </>
        ) : (
          <>
            <MessageSquare className="h-3 w-3" />
            <span>@{targetName}님에게 답글 작성 중</span>
          </>
        )}
      </div>

      <textarea
        className="h-20 w-full resize-none bg-transparent text-sm outline-none placeholder:text-zinc-400"
        placeholder="내용을 입력해주세요."
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <ImageUploader
        ref={uploaderRef}
        images={images}
        onImagesChange={setImages}
        onRemoveImage={handleRemoveImage}
        variant="compact"
      />

      <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-3">
        <button
          type="button"
          onClick={() => uploaderRef.current?.open()}
          className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-blue-500"
        >
          <ImageIcon className="h-4 w-4" />
          <span className="text-[11px] font-bold">사진 추가</span>
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-xs font-bold text-zinc-400 hover:text-zinc-600"
          >
            취소
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleReplySubmit}
            className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-bold text-white active:scale-95 disabled:bg-zinc-300"
          >
            {isPending
              ? "처리 중..."
              : mode === "edit"
                ? "수정 완료"
                : "답글 등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
