"use client";

export default function ErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">

      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <button
        onClick={reset}
        className="border px-4 py-2"
      >
        Try again
      </button>

    </main>
  );
}