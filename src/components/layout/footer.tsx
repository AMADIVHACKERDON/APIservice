export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span className="font-display font-semibold">Solution Desk</span>
        <span className="text-muted-foreground">
          Copyright {new Date().getFullYear()} · Built in public
        </span>
      </div>
    </footer>
  );
}
