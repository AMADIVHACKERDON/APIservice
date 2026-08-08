import { eq, count, sql, and } from "drizzle-orm";

import { db } from "@/db";
import { reactions } from "@/db/schema";

import { getVisitorId } from "@/lib/server/visitor";

export async function getChallengeReactions(
  challengeId: string,
) {
  const visitorId = await getVisitorId();

  const [counts, visitorReactions] =
    await Promise.all([

      db
        .select({
          type: reactions.type,
          count: sql<number>`count(*)`,
        })
        .from(reactions)
        .where(eq(reactions.challengeId, challengeId))
        .groupBy(reactions.type),

      db.query.reactions.findMany({
        where: and(
          eq(reactions.challengeId, challengeId),
          eq(reactions.visitorId, visitorId),
        ),
      }),

    ]);

  return {
    counts: {
      like:
        counts.find((r) => r.type === "like")
          ?.count ?? 0,

      love:
        counts.find((r) => r.type === "love")
          ?.count ?? 0,

      insightful:
        counts.find((r) => r.type === "insightful")
          ?.count ?? 0,

      interested:
        counts.find((r) => r.type === "interested")
          ?.count ?? 0,
    },

    reacted: {
      like: visitorReactions.some(
        (r) => r.type === "like",
      ),

      love: visitorReactions.some(
        (r) => r.type === "love",
      ),

      insightful: visitorReactions.some(
        (r) => r.type === "insightful",
      ),

      interested: visitorReactions.some(
        (r) => r.type === "interested",
      ),
    },
  };
}


export async function getReactionCount(
  challengeId:string
){

    const result =
      await db
        .select({
          total: count(),
        })
        .from(reactions)
        .where(
          eq(
            reactions.challengeId,
            challengeId
          )
        );


  return result[0].total;
}


export async function getChallengeReactionCounts(
  challengeId: string,
) {
  const rows = await db
    .select({
      type: reactions.type,
      count: sql<number>`count(*)`,
    })
    .from(reactions)
    .where(eq(reactions.challengeId, challengeId))
    .groupBy(reactions.type);

  return {
    like: rows.find((r) => r.type === "like")?.count ?? 0,
    love: rows.find((r) => r.type === "love")?.count ?? 0,
    insightful:
      rows.find((r) => r.type === "insightful")?.count ?? 0,
    interested:
      rows.find((r) => r.type === "interested")?.count ?? 0,
  };
}


