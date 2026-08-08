import { relations } from "drizzle-orm";
import { subcategories, challenges, reactions, comments, collaborations } from "./tables";

/* -------------------------------------------------------------------------- */
/*                                 RELATIONS                                  */
/* -------------------------------------------------------------------------- */

export const subcategoryRelations = relations(subcategories, ({ many }) => ({
  challenges: many(challenges),
}));

export const challengeRelations = relations(challenges, ({ one, many }) => ({
  subcategory: one(subcategories, {
    fields: [challenges.subcategoryId],
    references: [subcategories.id],
  }),

  reactions: many(reactions),
  comments: many(comments),
  collaborations: many(collaborations),
}));

export const reactionRelations = relations(reactions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [reactions.challengeId],
    references: [challenges.id],
  }),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  challenge: one(challenges, {
    fields: [comments.challengeId],
    references: [challenges.id],
  }),
}));

export const collaborationRelations = relations(collaborations, ({ one }) => ({
  challenge: one(challenges, {
    fields: [collaborations.challengeId],
    references: [challenges.id],
  }),
}));