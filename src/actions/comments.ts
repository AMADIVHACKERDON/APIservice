"use server";

import { eq } from "drizzle-orm";

// import { commentSchema } from "@/lib/validators/comment";
import { getChallengeById } from "@/lib/queries/challenges";

import { nanoid } from "nanoid";

import { db } from "@/db";
import { comments } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { getCommentById } from "@/lib/queries/comments";

export async function createComment(
  challengeId: string,
  formData: FormData,
) {
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!author || !content) {
    return;
  }

  await db.insert(comments).values({
    id: nanoid(),
    challengeId,
    name: author,
    content,
  });

  const challenge =
  await getChallengeById(challengeId);

  if (challenge) {
    revalidatePath(
      `/challenges/${challenge.slug}`,
    );
  }

}

// export async function createComment(
//   input: z.infer<typeof commentSchema>
// ) {
//     const validated =
//       commentSchema.parse(input);


//     const [comment] =
//       await db
//         .insert(comments)
//         .values({
//           challengeId:
//             validated.challengeId,

//           name:
//             validated.name ?? null,

//           email:
//             validated.email ?? null,

//           content:
//             validated.content,
//         })
//         .returning();


//   return comment;

// }


export async function deleteComment(
  id: string,
) {
  const comment =
    await getCommentById(id);

  if (!comment) return;

  await db
    .delete(comments)
    .where(eq(comments.id, id));

  revalidatePath("/admin/comments");
  revalidatePath(
    `/challenges/${comment.challenge.slug}`,
  );
}

