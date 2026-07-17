import { desc } from "drizzle-orm";

import { db } from "@/db";
import { challengeSubmissions } from "@/db/schema";


export async function getChallengeSubmissions() {
  return db.query.challengeSubmissions.findMany({
    orderBy: [
      desc(challengeSubmissions.createdAt),
    ],
  });
}