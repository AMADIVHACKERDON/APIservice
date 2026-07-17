import { notFound, redirect } from "next/navigation";

import {
  getChallengeById,
} from "@/lib/queries/challenges";

import {
  getSubcategories,
} from "@/lib/queries/subcategories";

import {
  updateChallenge,
} from "@/actions/challenges";

import {
  ChallengeForm,
} from "@/components/challenges";
import { parseChallengeForm } from "@/lib/forms/challenge";

export default async function EditChallengePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const challenge =
    await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  const subcategories =
    await getSubcategories();

  async function action(
    formData: FormData
  ) {
    "use server";

    await updateChallenge(
      id,
      parseChallengeForm(formData),
    );
    
    redirect("/admin/challenges");
  }

  return (
    <ChallengeForm
      mode="edit"
      challenge={challenge}
      subcategories={subcategories}
      action={action}
    />
  );
}