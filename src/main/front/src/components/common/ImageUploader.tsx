import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ChangeEvent,
} from "react";
import { Image as ImageIcon, XCircle, X } from "lucide-react";
import { toast } from "sonner";

export interface ImagePreview {
  file: File | null;
  previewUrl: string;
  fileId?: number;
}

interface ImageUploaderProps {
  images: ImagePreview[];
  onImagesChange: (images: ImagePreview[]) => void;
  onRemoveImage: (index: number) => void;
  maxCount?: number;
  variant?: "default" | "compact";
}

const ImageUploader = forwardRef(
  (
    {
      images,
      onImagesChange,
      onRemoveImage,
      maxCount = 5,
      variant = "default",
    }: ImageUploaderProps,
    ref,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => fileInputRef.current?.click(),
    }));

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        if (images.length + files.length > maxCount) {
          toast.error(`이미지는 최대 ${maxCount}장까지 업로드 가능합니다.`);
          return;
        }

        const newImages = files.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
        }));

        onImagesChange([...images, ...newImages]);
        e.target.value = "";
      }
    };

    return (
      <div className={variant === "compact" ? "w-full" : ""}>
        {images.length > 0 && (
          <div
            className={
              variant === "compact"
                ? "scrollbar-hide flex gap-3 overflow-x-auto border-t bg-zinc-50/50 px-6 py-3"
                : "scrollbar-hide mt-4 flex gap-3 overflow-x-auto pb-2"
            }
          >
            {images.map((img, index) => (
              <div
                key={img.fileId || img.previewUrl || index}
                className={`relative shrink-0 overflow-hidden rounded-xl ${
                  variant === "compact"
                    ? "h-16 w-16 shadow-sm ring-1 ring-zinc-200"
                    : "h-24 w-24 border border-zinc-100"
                }`}
              >
                <img
                  src={img.previewUrl}
                  className="h-full w-full object-cover"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-1 right-1 flex items-center justify-center rounded-full bg-zinc-900 text-white shadow-md transition-transform hover:scale-110"
                >
                  {variant === "compact" ? (
                    <X className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {variant === "default" && (
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-600"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                <ImageIcon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold">사진 추가</span>
            </button>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    );
  },
);

ImageUploader.displayName = "ImageUploader";
export default ImageUploader;
