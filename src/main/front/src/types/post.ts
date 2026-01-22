export type Post = {
  postId?: number;
  cateId?: number;
  cateName?: string;
  authorId?: number;
  authorName?: string;
  deptName?: string;
  posName?: string;
  title: string;
  content: string;
  comments?: PostComment[];
  commentCount?: number;
  likeCount?: number;
  viewCount?: number;
  isUpdated?: boolean;
  isLiked?: boolean;
  createdDateFormat?: string;
  deleteFileIds?: number[];

  files?: {
    fileId: number;
    filename: string;
    fileLoadPath: string;
  }[];
};

export type PostComment = {
  commentId?: number;
  parentId?: number;
  empId?: number;
  empName?: string;
  deptName?: string;
  posName?: string;
  content: string;
  likeCount?: number;
  isUpdated?: boolean;
  createdDateFormat?: string;
  targetEmpId?: number;
  targetEmpName?: string;
  replies?: PostComment[];
  deleteFileIds?: number[];

  files?: {
    fileId: number;
    filename: string;
    fileLoadPath: string;
  }[];
};

export type PostCategory = {
  cateId: number;
  cateName: string;
};
