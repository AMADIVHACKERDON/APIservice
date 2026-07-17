import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <section className="min-h-screen">

      <nav className="border-b border-[#101820] bg-white/60 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] sm:px-6">
        <div className="container mx-auto flex flex-wrap gap-x-5 gap-y-2">

        <Link href="/admin">
          Dashboard
        </Link>

        <Link href="/admin/challenges">
          Challenges
        </Link>

        <Link href="/admin/subcategories">
          Subcategories
        </Link>

        <Link href="/admin/contacts">
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
