import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No comments yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="mb-2 flex items-center justify-between">
            <strong className="font-display font-semibold">
              {comment.name}
            </strong>

            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="whitespace-pre-wrap leading-relaxed text-foreground">
            {comment.content}
          </p>
        </article>
      ))}
    </div>
  );
}
