import { db } from "@/db";
import { reactions } from "@/db/schema/tables";
import { eq } from "drizzle-orm";
import type { ReactionType } from "@/lib/constants";

type ReactionInput = {
  challengeId: string;
  visitorId: string;
  type: ReactionType;
};

// Create
export async function createReaction(data: ReactionInput) {
  const [reaction] = await db
    .insert(reactions)
    .values(data)
    .returning();

  return reaction;
}

// Get All
export async function getReactions() {
  return db.query.reactions.findMany();
}

// Get One
export async function getReactionById(id: string) {
  return db.query.reactions.findFirst({
    where: eq(reactions.id, id),
  });
}

// Get Reactions for a Challenge
export async function getProblemReactions(challengeId: string) {
  return db.query.reactions.findMany({
    where: eq(reactions.challengeId, challengeId),
  });
}

// Update
export async function updateReaction(
  id: string,
  data: Partial<Omit<ReactionInput, "challengeId" | "visitorId">>
) {
  const [reaction] = await db
    .update(reactions)
    .set(data)
    .where(eq(reactions.id, id))
    .returning();

  return reaction;
}

// Delete
export async function deleteReaction(id: string) {
  const [reaction] = await db
    .delete(reactions)
    .where(eq(reactions.id, id))
    .returning();

  return reaction;
}