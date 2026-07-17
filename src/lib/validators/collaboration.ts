import { z } from "zod";

export const collaborationSchema = z.object({
  challengeId: z.string().min(1),

  name: z.string().min(2),

  email: z.string().email(),

  message: z.string().min(5),
});
