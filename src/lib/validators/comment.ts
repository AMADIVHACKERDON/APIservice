import { z } from "zod";

export const commentSchema = z.object({
  challengeId: z.string().min(1),

  name: z.string().optional(),

  email: z.email().optional(),

  content: z.string().min(2),
});