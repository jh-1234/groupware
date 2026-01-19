import { useState } from "react";

interface ImageSliderProps {
  images: string[];
  onImageClick?: (idx: number) => void;
  type?: "post" | "comment";
}

export default function ImageSlider({
  images,
  onImageClick,
  type = "post",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, offset: 0 });

  if (!images?.length) return null;

  const isMulti = images.length > 1;
  const slideWidth = 90;
  const sidePeek = (100 - slideWidth) / 2;

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = "touches" in e ? e.touches[0].pageX : e.pageX;
    setDrag({ isDragging: true, startX: x, offset: 0 });
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.isDragging) return;
    const x = "touches" in e ? e.touches[0].pageX : e.pageX;
    setDrag({ ...drag, offset: x - drag.startX });
  };

  const onEnd = () => {
    if (!drag.isDragging) return;
    const threshold = 50;
    if (Math.abs(drag.offset) < 5) onImageClick?.(currentIndex);
    else if (drag.offset < -threshold && currentIndex < images.length - 1)
      setCurrentIndex((c) => c + 1);
    else if (drag.offset > threshold && currentIndex > 0)
      setCurrentIndex((c) => c - 1);
    setDrag({ isDragging: false, startX: 0, offset: 0 });
  };

  return (
    <div
      className={`relative touch-none overflow-hidden select-none ${type === "post" ? "py-3" : "mt-3 rounded-xl border"}`}
    >
      {isMulti && (
        <div className="absolute top-3 right-3 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>
      )}
      <div
        className="cubic-bezier(0.2, 0.8, 0.2, 1) flex items-center transition-transform duration-500"
        style={{
          transform: `translateX(calc(${sidePeek}% - ${currentIndex * slideWidth}% + ${drag.offset}px))`,
          transitionDuration: drag.isDragging ? "0ms" : "500ms",
        }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        {images.map((url, idx) => (
          <div
            key={idx}
            className="aspect-video shrink-0 px-1"
            style={{ width: `${slideWidth}%` }}
          >
            <img
              src={url}
              alt="post"
              draggable={false}
              className={`h-full w-full rounded-2xl object-cover transition-all ${currentIndex === idx ? "scale-100 opacity-100" : "scale-95 opacity-40 blur-[1px]"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
