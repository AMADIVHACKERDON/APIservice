"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "@/db";
import { challenges, challengeSubmissions } from "@/db/schema";

export async function createChallengeFromSubmission(
  id: string,
) {
  const submission =
    await db.query.challengeSubmissions.findFirst({
      where: eq(
        challengeSubmissions.id,
        id,
      ),
    });

  if (!submission) {
    throw new Error(
      "Submission not found",
    );
  }

  const slug =
    `${submission.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    }-${nanoid(6)}`;


  const [challenge] =
    await db
      .insert(challenges)
      .values({
        title: submission.title,

        slug,

        summary:
          submission.description.slice(
            0,
            160,
          ),

        content:
          submission.description,

        category: "software",

        difficulty: "easy",

        estimatedImpact: "local",

        status: "open",

        published: false,
      })
      .returning();


  await db
    .update(challengeSubmissions)
    .set({
      status: "reviewed",
    })
    .where(
      eq(
        challengeSubmissions.id,
        id,
      )
    );


  revalidatePath(
    "/admin/submissions",
  );

  revalidatePath(
    "/admin/challenges",
  );


  return challenge;
}

export async function submitChallenge(
  formData: FormData,
) {
  const title =
    String(formData.get("title"));

  const description =
    String(formData.get("description"));

  const name =
    String(formData.get("name"));

  const email =
    String(formData.get("email"));


  await db
    .insert(challengeSubmissions)
    .values({
      title,
      description,
      name,
      email,
    });


  revalidatePath("/admin/submissions");

  redirect("/submit-challenge/success");
}


export async function updateSubmissionStatus(
  id: string,
  status:
    | "pending"
    | "reviewed"
    | "accepted"
    | "rejected",
) {
  await db
    .update(challengeSubmissions)
    .set({
      status,
    })
    .where(
      eq(
        challengeSubmissions.id,
        id,
      )
    );

  revalidatePath(
    "/admin/submissions",
  );
}