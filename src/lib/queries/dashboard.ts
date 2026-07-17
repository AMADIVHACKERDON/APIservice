import { count, eq } from "drizzle-orm";

import {db} from "@/db";
import {
  challenges,
  comments,
  collaborations,
  reactions,
} from "@/db/schema";

export async function getDashboardStats() {
  const [
    totalChallenges,
    publishedChallenges,
    draftChallenges,
    totalComments,
    totalReactions,
    totalCollaborations,
  ] = await Promise.all([
    db.select({ count: count() }).from(challenges),

    db
      .select({ count: count() })
      .from(challenges)
      .where(eq(challenges.published, true)),

    db
      .select({ count: count() })
      .from(challenges)
      .where(eq(challenges.published, false)),

    db.select({ count: count() }).from(comments),

    db.select({ count: count() }).from(reactions),

    db.select({ count: count() }).from(collaborations),
  ]);

  return {
    challenges: totalChallenges[0].count,
    published: publishedChallenges[0].count,
    drafts: draftChallenges[0].count,
    comments: totalComments[0].count,
    reactions: totalReactions[0].count,
    collaborations: totalCollaborations[0].count,
  };
}