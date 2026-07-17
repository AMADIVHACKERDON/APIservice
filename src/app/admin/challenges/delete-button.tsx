"use client";

import { useRouter } from "next/navigation";

import { deleteChallenge } from "@/actions/challenges";


export default function DeleteChallengeButton({
  id,
}: {
  id: string;
}) {

  const router = useRouter();


  async function remove() {

    const confirmed =
      window.confirm(
        "Delete this challenge?"
      );


    if (!confirmed) return;


    await deleteChallenge(id);
    router.refresh();

  }


  return (
    <button
      onClick={remove}
      className="text-red-600"
    >
      Delete
    </button>
  );
}