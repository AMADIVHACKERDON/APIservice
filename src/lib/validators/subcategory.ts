import { z } from "zod";
import { CATEGORIES } from "../constants";

export const subcategorySchema = z.object({
  name: z.string().min(2),
  category: z.enum(CATEGORIES),
  description: z.string().optional(),
});
