import CommentCard from "./comment-card";

interface Props {
  comments: Awaited<
    ReturnType<
      typeof import("@/lib/queries/comments").getComments
    >
  >;

  deleteAction: (
    id: string,
  ) => Promise<void>;
}

export default function CommentList({
  comments,
  deleteAction,
}: Props) {
  if (comments.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          deleteAction={deleteAction}
        />
      ))}
    </div>
  );
}