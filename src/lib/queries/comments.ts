import { desc, eq } from "drizzle-orm";

import {db} from "@/db";
import { comments } from "@/db/schema";

export async function getComments() {
  return db.query.comments.findMany({
    with: {
      challenge: {
        columns: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
    orderBy: [
      desc(comments.createdAt),
    ],
  });
}

export async function getCommentById(
  id: string,
) {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),

    with: {
      challenge: true,
    },
  });
}

export async function getChallengeComments(
  challengeId: string,
) {
  return db.query.comments.findMany({
    where: eq(comments.challengeId, challengeId),
    orderBy: [desc(comments.createdAt)],
  });
}