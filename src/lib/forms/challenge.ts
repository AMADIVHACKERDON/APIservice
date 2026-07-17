import type { ChallengeInput } from "@/lib/validators/challenge";

export function parseChallengeForm(
  formData: FormData,
): ChallengeInput {
  return {
    title: String(formData.get("title")),
    summary: String(formData.get("summary")),
    content: String(formData.get("content")),

    category: formData.get("category") as ChallengeInput["category"],

    subcategoryId:
      String(formData.get("subcategoryId")) || undefined,

    difficulty:
      formData.get("difficulty") as ChallengeInput["difficulty"],

    estimatedImpact:
      formData.get(
        "estimatedImpact",
      ) as ChallengeInput["estimatedImpact"],

    status:
      formData.get("status") as ChallengeInput["status"],

    featured: formData.get("featured") === "on",

    published: formData.get("published") === "on",

    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}