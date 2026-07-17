import Link from "next/link";

import {
  COLLABORATION_STATUS_LABELS,
  COLLABORATION_STATUS_STYLES,
} from "@/lib/collaborations";

interface CollaborationCardProps {
  collaboration: Awaited<
    ReturnType<
      typeof import("@/lib/queries/collaborations").getCollaborations
    >
  >[number];
}

export default function CollaborationCard({
  collaboration,
}: CollaborationCardProps) {
  return (
    <Link
      href={`/admin/collaborations/${collaboration.id}`}
      className="block rounded-lg border p-6 hover:bg-muted/50"
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${COLLABORATION_STATUS_STYLES[collaboration.status]}`}
        >
          {COLLABORATION_STATUS_LABELS[collaboration.status]}
        </span>

        <span className="text-sm text-muted-foreground">
          {collaboration.createdAt.toLocaleDateString()}
        </span>
      </div>

      <h2 className="text-xl font-semibold">
        {collaboration.name}
      </h2>

      <p className="text-sm text-muted-foreground">
        {[collaboration.role, collaboration.company]
          .filter(Boolean)
          .join(" • ") || "No role provided"}
      </p>

      <p className="mt-3 font-medium">
        {collaboration.challenge.title}
      </p>

      <p className="mt-2 line-clamp-2 text-muted-foreground">
        {collaboration.message}
      </p>
    </Link>
  );
}