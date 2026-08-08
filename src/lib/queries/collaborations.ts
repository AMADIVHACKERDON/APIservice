import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { collaborations } from "@/db/schema";

export async function getChallengeCollaborations(
  challengeId: string,
) {
  return db.query.collaborations.findMany({
    where: eq(
      collaborations.challengeId,
      challengeId,
    ),
    orderBy: [
      desc(collaborations.createdAt),
    ],
  });
}


export async function getCollaborations() {
  return db.query.collaborations.findMany({
    with: {
      challenge: {
        columns: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy: [
      desc(collaborations.createdAt),
    ],
  });
}

export async function getCollaborationById(
  id: string,
) {
  return db.query.collaborations.findFirst({
    where: eq(collaborations.id, id),

    with: {
      challenge: true,
    },
  });
}