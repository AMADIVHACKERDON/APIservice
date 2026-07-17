import Link from "next/link";

interface Props {
  comment: Awaited<
    ReturnType<
      typeof import("@/lib/queries/comments").getComments
    >
  >[number];

  deleteAction: (id: string) => Promise<void>;
}

export default function CommentCard({
  comment,
  deleteAction,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">
            {comment.name}
          </h3>

          <Link
            href={`/challenges/${comment.challenge.slug}`}
            className="text-sm text-primary hover:underline"
          >
            {comment.challenge.title}
          </Link>
        </div>

        <span className="text-sm text-muted-foreground">
          {comment.createdAt.toLocaleDateString()}
        </span>
      </div>

      <p className="mt-4 whitespace-pre-wrap leading-relaxed">
        {comment.content}
      </p>

      <form
        className="mt-4"
        action={async () => {
          "use server";
          await deleteAction(comment.id);
        }}
      >
        <button className="rounded-full border border-border px-3 py-1 text-sm text-destructive transition hover:bg-destructive/10">
          Delete
        </button>
      </form>
    </div>
  );
}
