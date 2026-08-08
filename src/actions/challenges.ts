"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { challenges } from "@/db/schema";
import { revalidatePath } from "next/cache";

import {
  challengeSchema,
} from "@/lib/validators/challenge";

import slugify from "slugify";

async function generateUniqueSlug(title: string, excludeId?: string) {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await db.query.challenges.findFirst({
      where: eq(challenges.slug, slug),
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    count++;
    slug = `${baseSlug}-${count}`;
  }
}


export async function createChallenge(
  input: z.infer<typeof challengeSchema>
){
    const validated = challengeSchema.parse(input);

    const slug = await generateUniqueSlug(
      validated.title
    );

    const [challenge] = await db
      .insert(challenges)
      .values({
        id: crypto.randomUUID(),

        title: validated.title,

        slug,

        summary: validated.summary,

        content: validated.content,

        category: validated.category,

        subcategoryId:
          validated.subcategoryId ?? null,

        difficulty:
          validated.difficulty,

        estimatedImpact:
          validated.estimatedImpact,

        status:
          validated.status,

        featured:
          validated.featured,

        published:
          validated.published,

        tags:
          JSON.stringify(validated.tags),
      })
      .returning();

      revalidatePath("/admin/challenges");
    return challenge;
}

export async function updateChallenge(
 id:string,
 input:z.infer<typeof challengeSchema>
){
  const validated =
    challengeSchema.parse(input);


  const slug =
    await generateUniqueSlug(
      validated.title,
      id
    );


  const [updated] =
    await db
      .update(challenges)
      .set({

        title:
          validated.title,

        slug,

        summary:
          validated.summary,

        content:
          validated.content,

        category:
          validated.category,

        subcategoryId:
          validated.subcategoryId ?? null,

        difficulty:
          validated.difficulty,

        estimatedImpact:
          validated.estimatedImpact,

        status:
          validated.status,

        featured:
          validated.featured,

        published:
          validated.published,

        tags:
          JSON.stringify(
            validated.tags
          ),

        updatedAt:
          new Date(),

      })

      .where(
        eq(
          challenges.id,
          id
        )
      )

       .returning();
   
       revalidatePath("/admin/challenges");
   return updated;

}


export async function deleteChallenge(
 id:string
) {
  
  await db
    .delete(challenges)
    .where(
      eq(
        challenges.id,
        id
      )
    );
    revalidatePath("/admin/challenges");
}




