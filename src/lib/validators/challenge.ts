// lib/validators/challenge.ts

import { z } from "zod";
import { CATEGORIES, DIFFICULTIES, ESTIMATED_IMPACTS, STATUSES } from "../constants";

export const challengeSchema = z.object({
  title: z.string().min(5),
  summary: z.string().min(10),
  content: z.string().min(20),

  category: z.enum(CATEGORIES),

  subcategoryId: z.string().optional(),

  difficulty: z.enum(DIFFICULTIES),

  estimatedImpact: z.enum(ESTIMATED_IMPACTS),

  status: z.enum(STATUSES),

  featured: z.boolean(),

  published: z.boolean(),

  tags: z.array(z.string()),
});

export type ChallengeInput = z.infer<
  typeof challengeSchema
>;