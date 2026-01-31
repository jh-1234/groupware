export const ROLE_ADMIN = 1;

export const STATE_EMPLOYED = 1;

export const STATE_RESIGNED = 2;

export const GENDER_MALE = "M";

export const GENDER_FEMALE = "F";

export const QUERY_KEYS = {
  employee: {
    all: ["employee"],
    list: ["employee", "list"],
    detail: (empId: number) => ["employee", "detail", empId],
    commonData: ["employee", "commonData"],
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
