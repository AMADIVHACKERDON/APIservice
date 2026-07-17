import {
    updateSubmissionStatus,
  } from "@/actions/challenge-submissions";
  
  
  interface Props {
    submission: {
      id: string;
      title: string;
      description: string;
      name: string;
      email: string;
      status: string;
      createdAt: Date;
    };
  }
  
  
  export default function SubmissionCard({
    submission,
  }: Props) {
    return (
      <div className="rounded-lg border p-6 space-y-4">
  
        <div>
          <h2 className="text-xl font-bold">
            {submission.title}
          </h2>
  
          <p className="text-sm text-muted-foreground">
            {submission.name} • {submission.email}
          </p>
        </div>
  
  
        <p>
          {submission.description}
        </p>
  
  
        <p className="text-sm">
          Status: {submission.status}
        </p>
  
  
        <div className="flex gap-2">
  
          <form
            action={async () => {
              "use server";
  
              await updateSubmissionStatus(
                submission.id,
                "reviewed",
              );
            }}
          >
            <button className="rounded border px-3 py-1">
              Review
            </button>
          </form>
  
  
          <form
            action={async () => {
              "use server";
  
              await updateSubmissionStatus(
                submission.id,
                "accepted",
              );
            }}
          >
            <button className="rounded border px-3 py-1">
              Accept
            </button>
          </form>
  
  
          <form
            action={async () => {
              "use server";
  
              await updateSubmissionStatus(
                submission.id,
                "rejected",
              );
            }}
          >
            <button className="rounded border px-3 py-1 text-red-600">
              Reject
            </button>
          </form>
  
        </div>
  
      </div>
    );
  }