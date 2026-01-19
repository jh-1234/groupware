import {
  getPost,
  getPostCategories,
  getPosts,
  postCommentSave,
  postSave,
  togglePostLike,
} from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.list });
    },
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.post.postById(postId),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.all });
    },
    onError: (e) => {
      toast.error("오류가 발생했습니다.", { position: "top-center" });

      console.error(e);
    },
  });
};

export const usePostCommentSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCommentSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post.comment.all });
    },
  });
};
