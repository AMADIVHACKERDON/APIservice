import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function supabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (
      (key.startsWith("sb_publishable_") || key.startsWith("sb_secret_")) &&
      headers.get("Authorization") === `Bearer ${key}`
    ) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

/** Read-only, anonymous client used for server rendering public content. */
export function getSupabaseServerClient(): SupabaseClient {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  return createClient(url, key, {
    global: { fetch: supabaseFetch(key) },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
