import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <nav className="border-b border-border bg-secondary/60 px-4 py-3 text-sm font-medium sm:px-6">
        <div className="container mx-auto flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/admin" className="transition hover:text-primary">
            Dashboard
          </Link>

          <Link href="/admin/challenges" className="transition hover:text-primary">
            Challenges
          </Link>

          <Link href="/admin/subcategories" className="transition hover:text-primary">
            Subcategories
          </Link>

          <Link href="/admin/contacts" className="transition hover:text-primary">
            Contacts
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 sm:px-6">
        {children}
      </main>
    </section>
  );
}
