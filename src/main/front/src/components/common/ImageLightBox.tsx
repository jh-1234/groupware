import React, { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

interface ImageLightBoxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageLightBox({
  images,
  initialIndex,
  onClose,
}: ImageLightBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, offset: 0 });

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
    const screenWidth = window.innerWidth;
    const threshold = screenWidth * 0.1;

    if (drag.offset < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (drag.offset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDrag({ isDragging: false, startX: 0, offset: 0 });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [images.length, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-500 flex touch-none flex-col items-center justify-center overflow-hidden bg-black/95 backdrop-blur-sm select-none"
      onMouseMove={onMove}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-520 text-white/50 transition-colors hover:text-white"
      >
        <X className="h-8 w-8" />
      </button>

      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        onMouseDown={onStart}
        onTouchStart={onStart}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex h-full w-full items-center"
          style={{
            transform: `translateX(calc(${currentIndex * -100}% + ${drag.offset}px))`,
            transition: drag.isDragging
              ? "none"
              : "transform 0.5s cubic-bezier(0.2, 1, 0.2, 1)",
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex h-full w-full shrink-0 items-center justify-center p-4 md:p-12"
            >
              <img
                src={img}
                className="pointer-events-none max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                alt={`slide-${idx}`}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 z-520 flex flex-col items-center gap-6">
        <div className="flex items-center gap-8">
          <button
            disabled={currentIndex === 0}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => prev - 1);
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/20 active:scale-90 disabled:opacity-20"
          >
            <ChevronLeft className="h-8 w-8 transition-transform group-hover:-translate-x-1" />
          </button>

          <div className="rounded-full bg-white/10 px-5 py-2 text-sm font-black text-white/90 ring-1 ring-white/20 backdrop-blur-xl">
            {currentIndex + 1} <span className="mx-1 text-white/40">/</span>{" "}
            {images.length}
          </div>

          <button
            disabled={currentIndex === images.length - 1}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => prev + 1);
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/20 active:scale-90 disabled:opacity-20"
          >
            <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
