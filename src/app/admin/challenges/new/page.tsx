import { redirect } from "next/navigation";

import { createChallenge } from "@/actions/challenges";
import { getSubcategories } from "@/lib/queries/subcategories";

import { ChallengeForm } from "@/components/challenges";
import { parseChallengeForm } from "@/lib/forms/challenge";

export default async function NewChallengePage() {
  const subcategories = await getSubcategories();

  async function action(formData: FormData) {
    "use server";

    await createChallenge(
      parseChallengeForm(formData),
    );
    
    redirect("/admin/challenges");

  }

  return (
    <ChallengeForm
      mode="create"
      subcategories={subcategories}
      action={action}
    />
  );
}