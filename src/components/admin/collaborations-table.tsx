import Link from "next/link";

interface InterestsTableProps {
  collaborations: Awaited<
    ReturnType<typeof import("@/lib/queries/collaborations").getCollaborations>
  >;
}

export default function CollaborationsTable({
  collaborations,
}: InterestsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Challenge</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Intent</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {collaborations.map((collaboration) => (
            <tr
              key={collaboration.id}
              className="border-b"
            >
              <td className="p-3">
                <Link
                  href={`/challenges/${collaboration.challenge.slug}`}
                  className="hover:underline"
                >
                  {collaboration.challenge.title}
                </Link>
              </td>

              <td className="p-3">
                {collaboration.name}
              </td>

              <td className="p-3">
                {collaboration.email}
              </td>

              <td className="p-3">
                {collaboration.intent}
              </td>

              <td className="p-3">
                {collaboration.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}