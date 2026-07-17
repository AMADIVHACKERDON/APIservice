import {
    getChallengeSubmissions,
  } from "@/lib/queries/challenge-submissions";
  
  import {
    SubmissionList,
  } from "@/components/admin";
  
  
  export default async function SubmissionsPage() {
  
    const submissions =
      await getChallengeSubmissions();
  
  
    return (
      <main className="space-y-8">
  
        <div>
          <h1 className="text-4xl font-bold">
            Challenge Submissions
          </h1>
  
          <p className="text-muted-foreground">
            Review incoming problems.
          </p>
        </div>
  
  
        <SubmissionList
          submissions={submissions}
        />
  
      </main>
    );
  }