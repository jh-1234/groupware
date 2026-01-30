import {
  deletePost,
  deletePostComment,
  getPost,
  getPostCategories,
  getPosts,
  savePost,
  savePostComment,
  toggleCommentLike,
  togglePostLike,
  updateViewCount,
} from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.detail(postId),
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
};

export const usePosts = (cateId: number, page: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.post.list, cateId, page],
    queryFn: () => getPosts(cateId, page),
    enabled: !!cateId,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};

export const usePostCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.post.categories,
    queryFn: getPostCategories,
  });
};

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,

    onMutate: async ({ postId, isLiked }) => {
      // 해당 포스트의 쿼리를 취소하여 이전 데이터가 덮어쓰지 않도록 함
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.detail(postId),
      });

      // 이전 상태 저장 (롤백용)
      const previousPost = queryClient.getQueryData(
        QUERY_KEYS.post.detail(postId),
      );

      // 캐시 데이터를 직접 수정 (낙관적 업데이트)
      queryClient.setQueryData(QUERY_KEYS.post.detail(postId), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !isLiked,
          likeCount: isLiked ? old.likeCount - 1 : old.likeCount + 1,
        };
      });

      // 에러 발생 시 사용할 context 반환
      return { previousPost };
    },

    // 서버 호출 에러 발생 시
    onError: (err, { postId }, context) => {
      // 이전 데이터로 롤백
      if (context?.previousPost) {
        queryClient.setQueryData(
          QUERY_KEYS.post.detail(postId),
          context.previousPost,
        );
      }
      toast.error("오류가 발생했습니다.", { position: "top-center" });
      console.error(err);
    },

    // 성공하든 실패하든 마지막에 실행 (서버와 데이터 동기화)
    onSettled: (_, __, { postId }) => {
      // 상세 데이터 및 목록 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(postId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};

export const useUpdateViewCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateViewCount,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(postId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
    },
  });
};

export const useSavePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};

export const useDeletePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};

export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
  });
};
