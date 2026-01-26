import type { Post, PostCategory, PostComment } from "@/types/post";
import api from "./instance/axiosInstance";
import type { Page } from "@/types/page";

export const postSave = async ({
  param,
  images,
}: {
  param: Post;
  images?: File[];
}) => {
  const formData = new FormData();

  const postData = new Blob([JSON.stringify(param)], {
    type: "application/json",
  });

  formData.append("data", postData);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  if (param.postId) {
    return await api.patch("/api/post", formData);
  } else {
    return await api.post("/api/post", formData);
  }
};

export const getPostCategories = async (): Promise<PostCategory[]> => {
  const { data } = await api.get("/api/post-categories");

  return data;
};

export const getPost = async (postId: number): Promise<Post> => {
  const { data } = await api.get(`/api/post/${postId}`);

  return data;
};

export const getPosts = async (
  cateId: number,
  page: number,
): Promise<Page<Post>> => {
  const { data } = await api.get(`/api/posts/${cateId}`, {
    params: { page: page },
  });

  return data;
};

export const postDelete = async (postId: number) => {
  const { data } = await api.delete(`/api/post/${postId}`);

  return data;
};

export const togglePostLike = async ({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) => {
  const res = await api.post("/api/post-like-count-update", {
    postId,
    isLiked,
  });

  return res;
};

export const updateViewCount = async (postId: number) => {
  return await api.post(`/api/post-view-count-update/${postId}`);
};

export const postCommentSave = async ({
  param,
  images,
}: {
  param: PostComment;
  images?: File[];
}) => {
  const formData = new FormData();

  const postData = new Blob([JSON.stringify(param)], {
    type: "application/json",
  });

  formData.append("data", postData);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  if (param.commentId) {
    return await api.patch("/api/post/comment", formData);
  } else {
    return await api.post("/api/post/comment", formData);
  }
};

export const postCommentDelete = async (commentId: number) => {
  const { data } = await api.delete(`/api/post/comment/${commentId}`);

  return data;
};

export const toggleCommentLike = async ({
  commentId,
  isLiked,
}: {
  commentId: number;
  isLiked: boolean;
}) => {
  const res = await api.post("/api/post/comment-like-count-update", {
    commentId,
    isLiked,
  });

  return res;
};
