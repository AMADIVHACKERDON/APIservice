import { db } from "@/db";
import { challenges } from "@/db/schema/tables";
import { eq } from "drizzle-orm";

// Get All
export async function getProblems() {
  return db.query.challenges.findMany({
    with: {
      comments: true,
      reactions: true,
    },
  });
}

// Get One
export async function getProblemById(id: string) {
  return db.query.challenges.findFirst({
    where: eq(challenges.id, id),
    with: {
      comments: true,
      reactions: true,
    },
  });
}

