import Link from "next/link";

interface Props {
  subcategories: Awaited<
    ReturnType<
      typeof import("@/lib/queries/subcategories").getSubcategories
    >
  >;

  deleteAction: (
    id: string,
  ) => Promise<void>;
}

export default function SubcategoryTable({
  subcategories,
  deleteAction,
}: Props) {
  if (subcategories.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No subcategories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Category
            </th>

            <th className="p-3 text-left">
              Description
            </th>

            <th className="w-40 p-3 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {subcategories.map(
            (subcategory) => (

              <tr
                key={subcategory.id}
                className="border-b"
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
                      className="rounded border px-3 py-1"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";

                        await deleteAction(
                          subcategory.id,
                        );
                      }}
                    >
                      <button
                        className="rounded border px-3 py-1 text-red-600"
                      >
                        Delete
                      </button>
                    </form>

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}