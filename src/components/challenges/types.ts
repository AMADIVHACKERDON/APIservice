import { ChallengeInput } from "@/lib/validators/challenge";

export type Category = "software" | "hardware" | "hybrid";

export interface Subcategory {
  id: string;
  name: string;
  category: Category;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: Category;
  subcategoryId: string | null;
  difficulty: "easy" | "medium" | "hard";
  estimatedImpact: "personal" | "local" | "national" | "global";
  status: "open" | "researching" | "building" | "solved" | "archived";
  featured: boolean;
  published: boolean;
  tags: string[];
}

export interface ChallengeFormProps {
  mode: "create" | "edit";
  challenge?: Challenge;
  subcategories: Subcategory[];
  action: (formData: FormData) => void | Promise<void>;
}

export type { ChallengeInput };