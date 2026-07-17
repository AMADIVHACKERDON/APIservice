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

export default function CommentList({
  comments,
}: CommentListProps) {
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
          className="rounded-lg border p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <strong>
              {comment.name}
            </strong>

            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(
                comment.createdAt,
                {
                  addSuffix: true,
                },
              )}
            </span>
          </div>

          <p className="whitespace-pre-wrap">
            {comment.content}
          </p>
        </article>
      ))}
    </div>
  );
}