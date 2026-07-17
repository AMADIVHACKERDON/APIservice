import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="container mx-auto flex min-h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-md bg-primary text-sm text-primary-foreground transition group-hover:opacity-90">
            K
          </span>
          Kindling
        </Link>

        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:gap-7">
          <Link href="/challenges" className="transition hover:text-foreground">
            Challenges
          </Link>

          <Link href="/submit-challenge" className="transition hover:text-foreground">
            Submit
          </Link>

          <Link href="/about" className="transition hover:text-foreground">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
