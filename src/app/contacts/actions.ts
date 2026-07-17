import { db } from "@/db";
import { contacts } from "@/db/schema/tables";
import { eq } from "drizzle-orm";

type ContactMessageInput = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Create
export async function createContactMessage(data: ContactMessageInput) {
  const [contactMessage] = await db
    .insert(contacts)
    .values(data)
    .returning();

  return contactMessage;
}

// Get All
export async function getContactMessages() {
  return db.query.contacts.findMany();
}

// Get One
export async function getContactMessageById(id: string) {
  return db.query.contacts.findFirst({
    where: eq(contacts.id, id),
  });
}

// Update
export async function updateContactMessage(
  id: string,
  data: Partial<Omit<ContactMessageInput, "id">>
) {
  const [contactMessage] = await db
    .update(contacts)
    .set(data)
    .where(eq(contacts.id, id))
    .returning();

  return contactMessage;
}

// Delete
export async function deleteContactMessage(id: string) {
  const [contactMessage] = await db
    .delete(contacts)
    .where(eq(contacts.id, id))
    .returning();

  return contactMessage;
}