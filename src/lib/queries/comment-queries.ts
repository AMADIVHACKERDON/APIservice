import { db } from "@/db";
import { comments } from "@/db/schema/tables";
import { eq } from "drizzle-orm";

type CommentInput = {
  challengeId: string;
  name?: string | null;
  email?: string | null;
  content: string;
};

// Create
export async function createComment(data: CommentInput) {
  const payload = {
    challengeId: data.challengeId,
    name: data.name ?? null,
    email: data.email ?? null,
    content: data.content,
  } satisfies typeof comments.$inferInsert;

  const [comment] = await db.insert(comments).values(payload).returning();

  return comment;
}

// Get All
export async function getComments() {
  return db.query.comments.findMany();
}

// Get One
export async function getCommentById(id: string) {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),
  });
}

// Get Comments for a Challenge
export async function getProblemComments(challengeId: string) {
  return db.query.comments.findMany({
    where: eq(comments.challengeId, challengeId),
  });
}

// Update
export async function updateComment(
  id: string,
  data: Partial<Omit<CommentInput, "challengeId">>
) {
  const [comment] = await db
    .update(comments)
    .set(data as Partial<typeof comments.$inferInsert>)
    .where(eq(comments.id, id))
    .returning();

  return comment;
}

// Delete
export async function deleteComment(id: string) {
  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  return comment;
}