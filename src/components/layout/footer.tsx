export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#101820] bg-[#101820] text-[#f5f5f1]">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-6 font-mono text-xs uppercase tracking-[0.1em] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>Problems / Field Notes</span>
        <span>Copyright {new Date().getFullYear()} · Build in public</span>
      </div>
    </footer>
  );
}
