import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export default function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-5 text-[1.02rem] leading-relaxed text-foreground/90",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h2 className="font-display text-2xl font-bold tracking-tight" {...props} />
          ),
          h2: (props) => (
            <h2 className="mt-8 font-display text-xl font-bold tracking-tight" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-6 font-display text-lg font-semibold" {...props} />
          ),
          p: (props) => <p className="leading-relaxed" {...props} />,
          ul: (props) => (
            <ul className="list-disc space-y-2 pl-5 text-foreground/85" {...props} />
          ),
          ol: (props) => (
            <ol className="list-decimal space-y-2 pl-5 text-foreground/85" {...props} />
          ),
          strong: (props) => <strong className="font-semibold" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="border-l-2 border-primary/60 pl-4 text-muted-foreground italic"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
              {...props}
            />
          ),
          a: (props) => (
            <a className="text-primary underline underline-offset-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
