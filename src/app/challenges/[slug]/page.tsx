import { notFound } from "next/navigation";

import Markdown from "@/components/markdown";
import { getChallengeBySlug } from "@/lib/queries/challenges";
import { toggleReaction } from "@/actions/reactions";
import { getChallengeReactions } from "@/lib/queries/reactions";
import { ReactionBar } from "@/components/challenges";
import type { ReactionType } from "@/lib/constants";
import { createComment } from "@/actions/comments";
import { getChallengeComments } from "@/lib/queries/comments";
import { CollaborationForm } from "@/components/challenges";
import { createCollaboration } from "@/actions/collaborations";
import {
  CommentForm,
  CommentList,
} from "@/components/challenges";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const challenge = await getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  const reactionCounts =
  await getChallengeReactions(
    challenge.id,
  );

  async function react(
    type: ReactionType,
  ) {
    "use server";
  
    await toggleReaction(
      challenge.id,
      type,
    );
  }

  const comments =
  await getChallengeComments(
    challenge.id,
    );
  
    async function comment(
      formData: FormData,
    ) {
      "use server";
            
      await createComment(
        challenge.id,
        formData,
      );
  }
  
  async function collaboration(
    formData: FormData,
  ) {
    "use server";
  
    await createCollaboration(
      challenge.id,
      formData,
    );
  }
  
  return (
    <main className="container mx-auto max-w-5xl py-12">

      <header className="space-y-4">

        <div className="flex flex-wrap gap-2 text-sm">

          <span>{challenge.category}</span>

          <span>•</span>

          <span>{challenge.difficulty}</span>

          <span>•</span>

          <span>{challenge.estimatedImpact}</span>

          <span>•</span>

          <span>{challenge.status}</span>

        </div>

        <h1 className="text-5xl font-bold">
          {challenge.title}
        </h1>

        <p className="text-xl text-muted-foreground">
          {challenge.summary}
        </p>

        <div className="flex flex-wrap gap-2">

          {challenge.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded bg-muted px-2 py-1 text-sm"
            >
              #{tag}
            </span>
          ))}

        </div>

      </header>
      
      <ReactionBar
        challengeId={challenge.id}
        reactions={reactionCounts}
        action={react}
      />
      <hr className="my-10" />

      <article className="prose prose-neutral dark:prose-invert max-w-none">

        <Markdown
          content={challenge.content}
        />

      </article>

      <hr className="my-12" />
      <section className="space-y-8">

<div>

  <h2 className="text-2xl font-bold">
    Discussion
  </h2>

  <p className="text-muted-foreground">
    Share ideas, ask questions, or suggest
    possible solutions.
  </p>

</div>

<CommentForm
  action={comment}
/>

<CommentList
  comments={comments}
/>

      </section>
      
      <section className="pt-12">
  <CollaborationForm action={collaboration} />
</section>

    </main>
  );
}
