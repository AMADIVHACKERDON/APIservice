import { db } from "@/db";
import { challenges } from "@/db/schema/tables";
import { eq } from "drizzle-orm";

type ProblemInput = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  difficulty: string;
  estimatedImpact: string;
  status?: string;
  featured?: boolean;
  published?: boolean;
  tags?: string | null;
  subcategoryId?: string | null;
};

// Create
export async function createProblem(data: ProblemInput) {
  const payload = {
    id: crypto.randomUUID(),
    title: data.title,
    slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    summary: data.summary,
    content: data.content,
    category: data.category as typeof challenges.$inferInsert["category"],
    difficulty: data.difficulty as typeof challenges.$inferInsert["difficulty"],
    estimatedImpact: data.estimatedImpact as typeof challenges.$inferInsert["estimatedImpact"],
    status: (data.status ?? "open") as typeof challenges.$inferInsert["status"],
    featured: data.featured ?? false,
    published: data.published ?? false,
    tags: data.tags ?? null,
    subcategoryId: data.subcategoryId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies typeof challenges.$inferInsert;

  const [problem] = await db.insert(challenges).values(payload).returning();

  return problem;
}

// Update
export async function updateProblem(
  id: string,
  data: Partial<Omit<ProblemInput, "id">>
) {
  const payload = {
    title: data.title,
    summary: data.summary,
    content: data.content,
    category: data.category as typeof challenges.$inferInsert["category"],
    difficulty: data.difficulty as typeof challenges.$inferInsert["difficulty"],
    estimatedImpact: data.estimatedImpact as typeof challenges.$inferInsert["estimatedImpact"],
    status: data.status as typeof challenges.$inferInsert["status"],
    featured: data.featured,
    published: data.published,
    tags: data.tags,
    subcategoryId: data.subcategoryId,
    updatedAt: new Date(),
  } satisfies Partial<typeof challenges.$inferInsert>;

  const [problem] = await db
    .update(challenges)
    .set(payload)
    .where(eq(challenges.id, id))
    .returning();

  return problem;
}

// Delete
export async function deleteProblem(id: string) {
  const [problem] = await db
    .delete(challenges)
    .where(eq(challenges.id, id))
    .returning();

  return problem;
}
