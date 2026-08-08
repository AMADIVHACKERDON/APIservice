import {
    deleteComment,
  } from "@/actions/comments";
  
  import {
    CommentList,
  } from "@/components/admin";
  
  import {
    getComments,
  } from "@/lib/queries/comments";
  
  export default async function CommentsPage() {
    const comments =
      await getComments();
  
    return (
      <main className="space-y-8">
  
        <div>
          <h1 className="text-4xl font-bold">
            Comments
          </h1>
  
          <p className="text-muted-foreground">
            Moderate challenge discussions.
          </p>
        </div>
  
        <CommentList
          comments={comments}
          deleteAction={deleteComment}
        />
  
      </main>
    );
  }