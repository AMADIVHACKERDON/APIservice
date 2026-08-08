import Link from "next/link";

interface Props {
  subcategories: Awaited<
    ReturnType<
      typeof import("@/lib/queries/subcategories").getSubcategories
    >
  >;

  deleteAction: (id: string) => Promise<void>;
}

export default function SubcategoryTable({
  subcategories,
  deleteAction,
}: Props) {
  if (subcategories.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        No subcategories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-left font-display font-semibold">Name</th>
            <th className="p-3 text-left font-display font-semibold">Category</th>
            <th className="p-3 text-left font-display font-semibold">Description</th>
            <th className="w-40 p-3 text-right font-display font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subcategories.map((subcategory) => (
            <tr
              key={subcategory.id}
              className="border-b border-border last:border-b-0"
            >
              <td className="p-3 font-medium">
                {subcategory.name}
              </td>

              <td className="p-3 capitalize">
                {subcategory.category}
              </td>

              <td className="p-3 text-muted-foreground">
                {subcategory.description ?? "-"}
              </td>

              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/subcategories?id=${subcategory.id}`}
                    className="rounded-full border border-border px-3 py-1 text-sm transition hover:bg-secondary"
                  >
                    Edit
                  </Link>

                  <form
                    action={async () => {
                      "use server";

                      await deleteAction(subcategory.id);
                    }}
                  >
                    <button className="rounded-full border border-border px-3 py-1 text-sm text-destructive transition hover:bg-destructive/10">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
