import { useState } from "react";
import SingleComment from "./SingleComment";
import type { PostComment } from "@/types/post";

export default function CommentList({ comments }: { comments: PostComment[] }) {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {comments?.map((comment) => (
        <div key={comment.commentId} className="space-y-6">
          <SingleComment
            comment={comment}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
          />

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-12 space-y-8 border-l-2 border-zinc-50 pl-6">
              {comment.replies.map((reply) => (
                <SingleComment
                  key={reply.commentId}
                  comment={reply}
                  isReply={true}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
