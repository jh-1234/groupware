export type Page<T> = {
  content: T[];
  total: number;
  offset: number;
  totalPage: number;
  isFirst: boolean;
  isLast: boolean;
  number: number;
};
