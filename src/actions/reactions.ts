"use server";

import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { reactions } from "@/db/schema";

import { nanoid } from "nanoid";
import { ReactionType } from "@/lib/constants";
import { getVisitorId } from "@/lib/server/visitor";
import { setVisitorId } from "./visitors";
import { getChallengeById } from "@/lib/queries/challenges";
import { revalidatePath } from "next/cache";


export async function toggleReaction(
  challengeId: string,
  type: ReactionType,
) {
  // 1. Get OR Create the ID immediately
  let vId = await getVisitorId();
  if (!vId) {
    vId = await setVisitorId(); // Assuming this returns the new ID
  }

  // 2. Now perform the check with a guaranteed vId
  const existing = await db.query.reactions.findFirst({
    where: and(
      eq(reactions.challengeId, challengeId),
      eq(reactions.visitorId, vId),
      eq(reactions.type, type),
    ),
  });

  if (existing) {
    await db
      .delete(reactions)
      .where(eq(reactions.id, existing.id));
  } else {
    await db.insert(reactions).values({
      id: nanoid(),
      challengeId,
      visitorId: vId,
      type,
    });
  }

  const challenge =
  await getChallengeById(challengeId);

  if (challenge) {
    revalidatePath(
      `/challenges/${challenge.slug}`,
    );
  }

}
