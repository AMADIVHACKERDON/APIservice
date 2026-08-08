"use server";

import { z } from "zod";
import { eq, count } from "drizzle-orm";

import { db } from "@/db";
import { subcategories, challenges } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { subcategorySchema } from "@/lib/validators/subcategory";


export async function createSubcategory(
  input: z.infer<typeof subcategorySchema>
){

    const validated =
    subcategorySchema.safeParse(input);
  
      if (!validated.success) {
        throw new Error("Invalid subcategory.");
  }
  
  const { name, category, description } = validated.data;

  const existing =
  await db.query.subcategories.findFirst({
    where: eq(
      subcategories.name,
      name,
    ),
  });

if (existing) {
  throw new Error(
    "Subcategory already exists.",
  );
  }
  
    const [subcategory] =
      await db
        .insert(subcategories)
        .values({
          name,
          category,
          description,
        })
      .returning();
  
      revalidatePath("/admin/subcategories");
      revalidatePath("/admin/challenges");
      revalidatePath("/challenges");

  return subcategory;
}


export async function updateSubcategory(
  id:string,
  input:z.infer<typeof subcategorySchema>
)
{

  const validated =
  subcategorySchema.safeParse(input);

if (!validated.success) {
  throw new Error("Invalid subcategory.");
}

const existing =
  await db.query.subcategories.findFirst({
    where: eq(
      subcategories.name,
      validated.data.name,
    ),
  });

if (existing && existing.id !== id) {
  throw new Error(
    "Subcategory already exists."
  );
}

const [updated] =
  await db
    .update(subcategories)
    .set({
      name: validated.data.name,
      category: validated.data.category,
      description:
        validated.data.description ?? null,
    })
    .where(
      eq(subcategories.id, id)
    )
    .returning();

revalidatePath("/admin/subcategories");
revalidatePath("/admin/challenges");
revalidatePath("/challenges");

  return updated;
}


export async function deleteSubcategory(
  id:string
)
{

    const usage =
      await db
        .select({
          total: count(),
        })
        .from(challenges)
        .where(
          eq(
            challenges.subcategoryId,
            id
          )
        );


    if(
      usage[0].total > 0
    ) {
      throw new Error("Cannot delete subcategory with existing challenges");
    }

    await db
      .delete(subcategories)
      .where(
        eq(
          subcategories.id,
          id
        )
  );
  revalidatePath("/admin/subcategories");
revalidatePath("/admin/challenges");
revalidatePath("/challenges");
}

