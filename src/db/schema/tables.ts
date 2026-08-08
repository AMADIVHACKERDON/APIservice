import { nanoid } from "nanoid";
import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { CATEGORIES, challengeSubmissionStatuses, DIFFICULTIES, ESTIMATED_IMPACTS, REACTION_TYPES, STATUSES } from "@/lib/constants";
import { COLLABORATION_STATUSES } from "@/lib/collaborations";

/* -------------------------------------------------------------------------- */
/*                                    ENUMS                                   */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               SUBCATEGORIES                                */
/* -------------------------------------------------------------------------- */

export const subcategories = sqliteTable(
  "subcategories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    name: text("name").notNull(),

    category: text("category", {
      enum: CATEGORIES,
    }).notNull(),

    description: text("description"),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("subcategory_category_idx").on(table.category),
    index("subcategory_name_idx").on(table.name),
]
);

/* -------------------------------------------------------------------------- */
/*                                CHALLENGES                                  */
/* -------------------------------------------------------------------------- */

export const challenges = sqliteTable(
  "challenges",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    title: text("title").notNull(),

    slug: text("slug").notNull().unique(),

    summary: text("summary").notNull(),

    content: text("content").notNull(),

    category: text("category", {
      enum: CATEGORIES,
    }).notNull(),

    subcategoryId: text("subcategory_id").references(
      () => subcategories.id,
      {
        onDelete: "set null",
      }
    ),

    difficulty: text("difficulty", {
      enum: DIFFICULTIES,
    }).notNull(),

    estimatedImpact: text("estimated_impact", {
      enum: ESTIMATED_IMPACTS,
    }).notNull(),

    status: text("status", {
      enum: STATUSES,
    })
      .default("open")
      .notNull(),

    featured: integer("featured", {
      mode: "boolean",
    })
      .default(false)
      .notNull(),

    published: integer("published", {
      mode: "boolean",
    })
      .default(false)
      .notNull(),

    tags: text("tags"),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer("updated_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("challenge_slug_idx").on(table.slug),
    index("challenge_category_idx").on(table.category),
    index("challenge_status_idx").on(table.status),
    index("challenge_subcategory_idx").on(
      table.subcategoryId
    ),
  ]
);

export const challengeSubmissions = sqliteTable(
  "challenge_submissions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    title: text("title")
      .notNull(),

    description: text("description")
      .notNull(),

    name: text("name")
      .notNull(),

    email: text("email")
      .notNull(),

    status: text("status", {
      enum: challengeSubmissionStatuses,
    })
      .default("pending")
      .notNull(),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer("updated_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("submission_status_idx")
      .on(table.status),

    index("submission_email_idx")
      .on(table.email),
  ]
);
/* -------------------------------------------------------------------------- */
/*                                REACTIONS                                   */
/* -------------------------------------------------------------------------- */

export const reactions = sqliteTable(
  "reactions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    challengeId: text("challenge_id")
      .notNull()
      .references(() => challenges.id, {
        onDelete: "cascade",
      }),
    
    visitorId: text("visitor_id").notNull(),

    type: text("type", {
      enum: REACTION_TYPES,
    })
      .default("like")
      .notNull(),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("reaction_challenge_idx").on(table.challengeId),
    index("reaction_visitor_idx").on(table.visitorId),
    uniqueIndex("reaction_unique_idx").on(
      table.challengeId,
      table.visitorId,
      table.type,
    ),
  ]
);

/* -------------------------------------------------------------------------- */
/*                                 COMMENTS                                   */
/* -------------------------------------------------------------------------- */

export const comments = sqliteTable(
  "comments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    challengeId: text("challenge_id")
      .notNull()
      .references(() => challenges.id, {
        onDelete: "cascade",
      }),

    name: text("name"),

    email: text("email"),

    content: text("content").notNull(),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("comment_challenge_idx").on(table.challengeId),
  ]
);

/* -------------------------------------------------------------------------- */
/*                               COLLABORATIONS                               */
/* -------------------------------------------------------------------------- */

export const collaborations = sqliteTable(
  "collaborations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    challengeId: text("challenge_id")
      .notNull()
      .references(() => challenges.id, {
        onDelete: "cascade",
      }),

    name: text("name").notNull(),

    email: text("email").notNull(),

    role: text("role"),

    company: text("company"),

    intent: text("intent").notNull(),

    message: text("message").notNull(),

    status: text("status", {
      enum: COLLABORATION_STATUSES,
    })
      .default("new")
      .notNull(),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer("updated_at", {
      mode: "timestamp_ms",
    })
      .$onUpdateFn(() => new Date())
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    index("collaboration_challenge_idx").on(table.challengeId),
    index("collaboration_status_idx").on(table.status),
    index("collaboration_email_idx").on(table.email),
  ]
);

/* -------------------------------------------------------------------------- */
/*                                  CONTACTS                                  */
/* -------------------------------------------------------------------------- */

export const contacts = sqliteTable("contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),

  name: text("name").notNull(),

  email: text("email").notNull(),

  subject: text("subject").notNull(),

  message: text("message").notNull(),

  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});
