import PostWriteModal from "@/pages/community/PostWriteModal";
import { usePostCategories } from "@/hooks/usePost";
import { Search, PenSquare } from "lucide-react";
import { useEffect, useState } from "react";
import PostList from "./PostList";

export default function Community() {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const { data: categories } = usePostCategories();
  const [selectedCateId, setSelectedCateId] = useState<number>();

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCateId) {
      setSelectedCateId(categories[0].cateId);
    }
  }, [categories]);

  return (
    <div className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">사내 커뮤니티</h1>
          <p className="mt-1 text-sm text-zinc-500">
            자유롭게 의견을 나누고 정보를 공유하세요.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="게시글 검색"
              className="h-10 w-64 rounded-lg border border-zinc-200 bg-white pr-4 pl-10 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <PenSquare className="h-4 w-4" />
            글쓰기
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2 border-b border-zinc-200 pb-px">
        {categories?.map((category) => (
          <button
            key={category.cateId}
            type="button"
            onClick={() => setSelectedCateId(category.cateId)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              category.cateId === selectedCateId
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {category.cateName}
          </button>
        ))}
      </div>

      <PostList cateId={selectedCateId!} />

      <PostWriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      />
    </div>
  );
}
