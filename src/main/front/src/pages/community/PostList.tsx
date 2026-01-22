import CustomPagination from "@/components/common/Pagination";
import PostDetailModal from "@/components/modal/PostDetailModal";
import { usePosts, useUpdateViewCount } from "@/hooks/usePost";
import { MessageSquare, Eye, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function PostList({ cateId }: { cateId: number }) {
  const [page, setPage] = useState(0);
  const { data } = usePosts(cateId, page);
  const posts = data?.content;

  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { mutate: updateViewCount } = useUpdateViewCount();

  useEffect(() => {
    setPage(0);
  }, [cateId]);

  const handlePostClick = (postId: number) => {
    updateViewCount(postId, {
      onSuccess: () => {
        setSelectedPost(postId);
        setIsDetailModalOpen(true);
      },
    });
  };
  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        <ul className="divide-y divide-zinc-100">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <li
                key={post.postId}
                onClick={() => handlePostClick(post.postId!)}
                className="group flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-zinc-50"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 uppercase">
                      {post.cateName}
                    </span>
                    <h3 className="font-semibold text-zinc-800 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span>
                      작성자: {post.authorName} {post.posName}
                    </span>
                    <span>•</span>
                    <span>{post.createdDateFormat}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">{post.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">12</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{post.likeCount}</span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-10 text-center text-zinc-400">
              등록된 게시글이 없습니다.
            </li>
          )}
        </ul>
      </div>
      {posts && posts.length > 0 && (
        <CustomPagination
          count={data?.totalPage!}
          page={page}
          onChange={(_, p) => setPage(p - 1)}
        />
      )}

      <PostDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        postId={selectedPost!}
      />
    </>
  );
}
