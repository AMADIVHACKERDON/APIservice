"use server";

import { z } from "zod";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { contacts } from "@/db/schema";

import { contactSchema } from "@/lib/validators/contact";


export async function createContact(
  input: z.infer<typeof contactSchema>
){

    const validated =
      contactSchema.parse(input);


    const [contact] =
      await db
        .insert(contacts)
        .values({
          name:
            validated.name,

          email:
            validated.email,

          subject:
            validated.subject,

          message:
            validated.message,
        })
        .returning();


  return contact;
}


export async function deleteContact(
  id:string
){

    await db
      .delete(contacts)
      .where(
        eq(
          contacts.id,
          id
        )
      );

}