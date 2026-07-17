import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            ProblemHub
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/problems" className="hover:text-blue-600">
              Problems
            </Link>

            <Link href="/contact" className="text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="mt-3 text-gray-600">
         {"Have a question, suggestion, or need assistance? We'd love to hear from you."}
        </p>

        <form className="mt-10 space-y-6 rounded-xl border bg-white p-8">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="+234..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help?"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Message
            </label>

            <textarea
              rows={6}
              placeholder="Write your message..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}