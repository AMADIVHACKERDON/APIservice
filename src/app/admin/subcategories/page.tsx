import {
    getSubcategories,
    getSubcategoryById,
  } from "@/lib/queries/subcategories";
  
  import {
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  } from "@/actions/subcategories";
  
  import {
    SubcategoryForm,
    SubcategoryTable,
  } from "@/components/admin";
  import { CATEGORIES } from "@/lib/constants";
  
  const isCategory = (
    value: FormDataEntryValue | null,
  ): value is (typeof CATEGORIES)[number] =>
    typeof value === "string" &&
    (CATEGORIES as readonly string[]).includes(value);
  
  export default async function SubcategoriesPage({
    searchParams,
  }: {
    searchParams: Promise<{
      id?: string;
    }>;
  }) {
    const { id } = await searchParams;
  
    const [subcategories, editing] =
      await Promise.all([
        getSubcategories(),
        id
          ? getSubcategoryById(id)
          : Promise.resolve(null),
      ]);
  
    async function action(
      formData: FormData,
    ) {
      "use server";
  
      const categoryValue = formData.get("category");

      if (!isCategory(categoryValue)) {
        throw new Error("Invalid category");
      }

      const input = {
        name: String(formData.get("name")),
        category: categoryValue,
        description: String(
          formData.get("description") ?? "",
        ),
      };
  
      if (editing) {
        await updateSubcategory(
          editing.id,
          input,
        );
      } else {
        await createSubcategory(input);
      }
    }
  
    return (
      <main className="space-y-8">
  
        <SubcategoryForm
          subcategory={editing}
          action={action}
        />
  
        <SubcategoryTable
          subcategories={subcategories}
          deleteAction={deleteSubcategory}
        />
  
      </main>
    );
  }