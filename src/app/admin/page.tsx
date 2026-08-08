"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminPortal from "@/components/admin/admin-portal";
import { signOut, useAuth } from "@/hooks/use-auth";

export default function AdminPage() {
  const router = useRouter();
  const { loading, session, user, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !session) router.replace("/auth");
  }, [loading, session, router]);

  if (loading || !session) {
    return (
      <main className="container mx-auto px-4 py-20 text-sm text-muted-foreground">
        Loading…
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Admin portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {user?.email}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut();
            router.replace("/auth");
          }}
        >
          <LogOut className="mr-2 size-4" /> Sign out
        </Button>
      </header>

      {isAdmin ? (
        <AdminPortal />
      ) : (
        <div className="space-y-3 rounded-2xl border border-border p-8">
          <ShieldAlert className="size-6 text-muted-foreground" />
          <h2 className="font-display text-lg font-semibold">
            This account has no admin role yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Content writes are blocked by database policy until an admin role is
            granted to this user. Ask an existing admin to add it, then reload
            this page.
          </p>
          <Link href="/" className="text-sm text-primary underline underline-offset-4">
            Back to the graph
          </Link>
        </div>
      )}
    </main>
  );
}
