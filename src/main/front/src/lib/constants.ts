export const QUERY_KEYS = {
  post: {
    all: ["posts"],
    list: ["posts", "list"],
    detail: (postId: number) => ["posts", "byId", postId],
    categories: ["posts", "categories"],
    comment: {
      all: ["posts", "comments"],
      comment: (postId: number) => ["posts", "comments", postId],
    },
  },
};
