import { notFound } from "next/navigation";

import {
  getCollaborationById,
} from "@/lib/queries/collaborations";

export default async function CollaborationPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const collaboration =
    await getCollaborationById(id);

  if (!collaboration) {
    notFound();
  }

  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          {collaboration.name}
        </h1>

        <p className="text-muted-foreground">
          {collaboration.email}
        </p>
      </div>

      <section className="rounded-lg border p-6 space-y-4">

        <div>
          <strong>Challenge</strong>
          <p>{collaboration.challenge.title}</p>
        </div>

        <div>
          <strong>Role</strong>
          <p>{collaboration.role || "-"}</p>
        </div>

        <div>
          <strong>Company</strong>
          <p>{collaboration.company || "-"}</p>
        </div>

        <div>
          <strong>Intent</strong>
          <p>{collaboration.intent}</p>
        </div>

        <div>
          <strong>Status</strong>
          <p>{collaboration.status}</p>
        </div>

        <div>
          <strong>Message</strong>

          <p className="whitespace-pre-wrap">
            {collaboration.message}
          </p>
        </div>

      </section>

    </main>
  );
}