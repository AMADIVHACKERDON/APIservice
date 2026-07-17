import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-[#101820] bg-[#f5f5f1]/90 backdrop-blur">
      <nav className="container mx-auto flex min-h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.14em]">
          <span className="grid size-6 place-items-center bg-[#101820] text-xs text-white transition group-hover:bg-primary">P</span>
          Problems
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] sm:gap-7">
        <Link href="/challenges">
          Challenges
        </Link>

        <Link href="/submit-challenge">
          Submit
        </Link>

        <Link href="/about">
          About
        </Link>
        </div>
      </nav>
    </header>
  );
}
