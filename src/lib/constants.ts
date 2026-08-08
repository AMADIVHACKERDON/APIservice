export const CATEGORIES = [
    "software",
    "hardware",
    "hybrid",
  ] as const;
  
export const DIFFICULTIES = [
    "easy",
    "medium",
    "hard",
] as const;
  
export const ESTIMATED_IMPACTS = [
    "personal",
    "local",
    "national",
    "global",
] as const;

export const STATUSES = [
    "open",
    "researching",
    "building",
    "solved",
    "archived",
] as const;


export const REACTION_TYPES = [
    "like",
    "love",
    "insightful",
    "interested",
  ] as const;
  
  export type ReactionType =
    (typeof REACTION_TYPES)[number];


    export const challengeSubmissionStatuses = [
        "pending",
        "reviewed",
        "accepted",
        "rejected",
      ] as const;
      