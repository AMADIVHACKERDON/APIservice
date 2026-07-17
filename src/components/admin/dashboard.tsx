import StatCard from "./stat-card";

interface DashboardProps {
  stats: {
    challenges: number;
    published: number;
    drafts: number;
    comments: number;
    reactions: number;
    collaborations: number;
  };
}

export default function Dashboard({
  stats,
}: DashboardProps) {
  return (
    <main className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Overview of the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Challenges"
          value={stats.challenges}
        />

        <StatCard
          title="Published"
          value={stats.published}
        />

        <StatCard
          title="Drafts"
          value={stats.drafts}
        />

        <StatCard
          title="Comments"
          value={stats.comments}
        />

        <StatCard
          title="Reactions"
          value={stats.reactions}
        />

        <StatCard
          title="Collaborations"
          value={stats.collaborations}
        />

      </div>

    </main>
  );
}