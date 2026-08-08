import { z } from "zod";
import { REACTION_TYPES } from "../constants";

export const reactionSchema = z.object({
  challengeId: z.string().min(1),

  type: z.enum(REACTION_TYPES),
});
