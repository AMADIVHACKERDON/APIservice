import CollaborationCard from "./collaboration-card";

interface CollaborationListProps {
  collaborations: Awaited<
    ReturnType<
      typeof import("@/lib/queries/collaborations").getCollaborations
    >
  >;
}

export default function CollaborationList({
  collaborations,
}: CollaborationListProps) {
  if (collaborations.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No collaboration requests yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {collaborations.map((collaboration) => (
        <CollaborationCard
          key={collaboration.id}
          collaboration={collaboration}
        />
      ))}
    </div>
  );
}