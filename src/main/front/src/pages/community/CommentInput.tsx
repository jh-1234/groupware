import { useRef, useState } from "react";
import { Image as ImageIcon, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { usePostCommentSave } from "@/hooks/usePost";
import { axiosErrorMessageFormat } from "@/utils/errorUtils";
import type { ImagePreview } from "@/components/common/ImageUploader";
import ImageUploader from "@/components/common/ImageUploader";

interface CommentInputProps {
  postId: number;
  onSuccess?: () => void;
  autoFocus?: boolean;
}

export default function CommentInput({
  postId,
  onSuccess,
  autoFocus = false,
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const uploaderRef = useRef<{ open: () => void }>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleCommentSave = () => {
    if (isPending) return;

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const param = {
      postId,
      content: content.trim(),
      deleteFileIds: [],
    };

    const newFiles = images
      .filter((img) => img.file)
      .map((img) => img.file as File);

    commentSave(
      { param, images: newFiles },
      {
        onSuccess: () => {
          toast.success("댓글이 등록되었습니다.");
          setContent("");
          setImages([]);
          onSuccess?.();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) toast.error(axiosErrorMessageFormat(e));
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <ImageUploader
        ref={uploaderRef}
        images={images}
        onImagesChange={setImages}
        onRemoveImage={handleRemoveImage}
        variant="compact"
      />

      <section className="flex items-center gap-3 border-t bg-white px-6 py-4">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-2xl bg-zinc-100 px-4 focus-within:ring-2 focus-within:ring-blue-500/20">
          <input
            ref={inputRef}
            autoFocus={autoFocus}
            className="flex-1 bg-transparent text-sm font-medium outline-none"
            placeholder="댓글을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.nativeEvent.isComposing &&
              handleCommentSave()
            }
          />
          <button
            type="button"
            onClick={() => uploaderRef.current?.open()}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
        </div>
        <button
          disabled={isPending}
          onClick={handleCommentSave}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md active:scale-95 disabled:bg-zinc-200"
        >
          <Send className={`h-5 w-5 ${isPending ? "animate-pulse" : ""}`} />
        </button>
      </section>
    </div>
  );
}
