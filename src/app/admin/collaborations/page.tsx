import {
  CollaborationList,
} from "@/components/admin";

import {
  getCollaborations,
} from "@/lib/queries/collaborations";

export default async function CollaborationsPage() {
  const collaborations =
    await getCollaborations();

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Collaborations
        </h1>

        <p className="text-muted-foreground">
          Manage collaboration requests.
        </p>
      </div>

      <CollaborationList
        collaborations={collaborations}
      />

    </main>
  );
}