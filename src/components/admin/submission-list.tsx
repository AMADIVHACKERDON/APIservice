import SubmissionCard from "./submission-card";


interface Props {
  submissions: Awaited<
    ReturnType<
      typeof import(
        "@/lib/queries/challenge-submissions"
      ).getChallengeSubmissions
    >
  >;
}


export default function SubmissionList({
  submissions,
}: Props) {

  if (!submissions.length) {
    return (
      <div className="rounded border p-8 text-center">
        No submissions yet.
      </div>
    );
  }


  return (
    <div className="space-y-4">
      {submissions.map(
        (submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
          />
        )
      )}
    </div>
  );
}