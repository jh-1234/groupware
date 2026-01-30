export const ROLE_ADMIN = 1;

export const STATE_EMPLOYED = 1;

export const STATE_RESIGNED = 2;

export const QUERY_KEYS = {
  employee: {
    all: ["employee"],
    list: ["employee", "list"],
    detail: (empId: number) => ["employee", "detail", empId],
    searchData: ["employee", "searchData"],
  },
  post: {
    all: ["posts"],
    list: ["posts", "list"],
    detail: (postId: number) => ["posts", "detail", postId],
    categories: ["posts", "categories"],
    comment: {
      all: ["posts", "comments"],
      comment: (postId: number) => ["posts", "comments", postId],
    },
  },
};
