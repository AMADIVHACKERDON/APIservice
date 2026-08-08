"use server";

import { cookies } from "next/headers";
import { nanoid } from "nanoid";

const COOKIE_NAME = "visitor_id";

export async function setVisitorId() {
  const cookieStore = await cookies();
  const visitorId = nanoid();
  
  cookieStore.set(COOKIE_NAME, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  
  return visitorId;
}