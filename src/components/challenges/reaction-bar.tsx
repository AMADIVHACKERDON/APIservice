"use client";

interface ReactionBarProps {
  challengeId: string;
  reactions: {
    counts: {
      like: number;
      love: number;
      insightful: number;
      interested: number;
    };

    reacted: {
      like: boolean;
      love: boolean;
      insightful: boolean;
      interested: boolean;
    };
  };
  action: (type: ReactionType) => Promise<void>;
}

type ReactionType =
  | "like"
  | "love"
  | "insightful"
  | "interested";

const ITEMS: {
  type: ReactionType;
  emoji: string;
  label: string;
}[] = [
  {
    type: "like",
    emoji: "👍",
    label: "Like",
  },
  {
    type: "love",
    emoji: "❤️",
    label: "Love",
  },
  {
    type: "insightful",
    emoji: "💡",
    label: "Insightful",
  },
  {
    type: "interested",
    emoji: "🚀",
    label: "Interested",
  },
];

export default function ReactionBar({
  reactions,
  action,
}: ReactionBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {ITEMS.map((item) => (
        <form
          key={item.type}
          action={async () => {
            await action(item.type);
          }}
        >
          <button
            type="submit"
            aria-pressed={reactions.reacted[item.type]}
            aria-label={`${reactions.reacted[item.type] ? "Remove" : "Add"} ${item.label} reaction`}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              reactions.reacted[item.type]
                ? "border-primary bg-primary text-primary-foreground"
                : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            <span>{item.emoji}</span>
            <span>{reactions.counts[item.type]}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
