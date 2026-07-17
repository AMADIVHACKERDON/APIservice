
import { cookies } from "next/headers";

const COOKIE_NAME = "visitor_id";

export async function getVisitorId() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}