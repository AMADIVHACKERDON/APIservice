"use client";

import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export interface AuthState {
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    session: null,
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let active = true;

    const resolveRole = async (session: Session | null) => {
      if (!session?.user) {
        if (active) setState({ loading: false, session: null, user: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (active) {
        setState({
          loading: false,
          session,
          user: session.user,
          isAdmin: Boolean(data),
        });
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((s) => ({ ...s, session, user: session?.user ?? null }));
      void resolveRole(session);
    });

    void supabase.auth.getSession().then(({ data }) => resolveRole(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export async function signOut() {
  await getSupabaseBrowserClient().auth.signOut();
}
