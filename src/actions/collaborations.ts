"use server";

import { eq } from "drizzle-orm";

// import { collaborationSchema } from "@/lib/validators/collaboration";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import {db} from "@/db";
import { collaborations } from "@/db/schema";

import { getChallengeById } from "@/lib/queries/challenges";

import type {
  CollaborationStatus,
} from "@/lib/collaborations";

export async function updateCollaborationStatus(
  id: string,
  status: CollaborationStatus,
) {
  await db
    .update(collaborations)
    .set({ status })
    .where(eq(collaborations.id, id));

  revalidatePath("/admin/collaborations");
  revalidatePath(`/admin/collaborations/${id}`);
}

export async function createCollaboration(
  challengeId: string,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const intent = String(formData.get("intent") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();

  if (!name || !email || !intent || !message) {
    return;
  }

  await db.insert(collaborations).values({
    challengeId,
    name,
    email,
    intent,
    message,
    ...(role ? { role } : {}),
    ...(company ? { company } : {}),
  });

  const challenge = await getChallengeById(challengeId);

  if (challenge) {
    revalidatePath(`/challenges/${challenge.slug}`);
  }
}

// export async function createInterest(
//   input: z.infer<typeof interestSchema>
// ){

//     const validated =
//       interestSchema.parse(input);


//     const [collaboration] =
//       await db
//         .insert(collaborations)
//         .values({
//           challengeId:
//             validated.challengeId,

//           name:
//             validated.name,

//           email:
//             validated.email,

//           message:
//             validated.message,
//         })
//         .returning();


//   return collaboration;
// }


export async function deleteCollaboration(
  id:string
){

    await db
      .delete(collaborations)
      .where(
        eq(
          collaborations.id,
          id
        )
      );

}