

```md
You are an expert senior full-stack engineer and product designer.

You are taking over an existing Next.js project that is already functionally complete. Your job is NOT to redesign the architecture or add unnecessary features. Your job is to perform a professional finishing pass: improve UX, UI consistency, accessibility, responsiveness, and code quality while preserving existing functionality.

## Project Overview

This project is a problem-solving collaboration platform.

Core idea:

Users can discover real-world problems, discuss them, react to them, and request collaboration.

The platform has:

- Public challenge discovery
- Challenge details
- Comments
- Reactions
- Collaboration requests
- Challenge submissions
- Admin management

The product goal is to feel like a serious platform for discovering and solving meaningful problems.

---

# Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Drizzle ORM
- SQLite
- Server Actions
- Server Components
- Zod validation

Follow existing project conventions.

Do not introduce new frameworks unless absolutely necessary.

---

# Existing Architecture

The project is organized roughly as:

```

app/
components/
actions/
db/
lib/
queries/
validators/

```

Expected separation:

Pages:
- Compose data and components only.

Queries:
- Database reads.

Actions:
- Database mutations.

Components:
- UI only.

Do not move business logic into components.

Do not move database calls into UI components.

---

# Existing Features

## Public

### Homepage

Contains:

- Hero section
- Featured challenges
- Latest challenges
- How it works section
- Call to action

Improve:
- Visual hierarchy
- Spacing
- Typography
- Mobile layout
- Professional appearance


---

### Challenges

Users can:

- Browse challenges
- Open challenge details


Challenge details include:

- Title
- Summary
- Description/content
- Category
- Subcategory
- Difficulty
- Reactions
- Comments
- Collaboration option


Improve:

- Reading experience
- Content layout
- Metadata presentation
- Engagement areas


---

### Comments

Users can comment on challenges.

Improve:

- Comment cards
- Empty states
- Form UX
- Loading states
- Error states


---

### Reactions

Users can react to challenges.

Improve:

- Reaction buttons
- Active states
- Feedback animations
- Mobile usability

Do not change reaction logic.


---

### Submit Challenge

Users can submit a problem.

Current flow:

```

User submits problem
↓
challenge_submissions
↓
Admin review
↓
Create challenge
↓
Publish

```

Improve:

- Form design
- Validation feedback
- Success page
- User confidence


---

### Collaborations

Users can request collaboration.

Improve:

- Form layout
- Confirmation experience
- Clear messaging


---

# Admin Features

Admin currently manages:

## Challenges

CRUD management.

Improve:

- Tables/cards
- Empty states
- Filters only if simple
- Better readability


---

## Subcategories

CRUD management.

Improve:

- Form layout
- Table presentation


---

## Comments

Admin can view and delete comments.

Improve:

- Moderation experience


---

## Collaborations

Admin can view collaboration requests.

Improve:

- Inbox style layout
- Status visibility


---

## Challenge Submissions

Admin can:

- View submissions
- Update status
- Convert accepted submissions into challenges

Improve:

- Workflow clarity
- Status badges
- Review experience


---

# Design Direction

Aim for:

- Modern SaaS quality
- Clean developer/productivity tool aesthetic
- Professional but simple
- High readability

Think:

- Linear
- Vercel
- GitHub discussions
- Notion

Avoid:

- Overly flashy gradients
- Excessive animations
- Huge hero sections
- Unnecessary cards everywhere


---

# UI Requirements

Improve:

## Navigation

Need:

- Logo/site name
- Challenges link
- Submit Challenge link
- About link

Responsive mobile menu if needed.


---

## Footer

Include:

- Short description
- Navigation links
- Copyright


---

## Components

Create reusable components where useful:

Examples:

- Badge
- EmptyState
- SectionHeader
- Card
- Button variants
- Form fields


Do not over-componentize simple markup.


---

# Responsive Requirements

Everything must work on:

- Mobile
- Tablet
- Desktop


Check:

- Navigation
- Forms
- Tables
- Cards
- Challenge details
- Admin pages


---

# Accessibility

Improve:

- Semantic HTML
- Labels
- Keyboard navigation
- Focus states
- Contrast
- Button states


---

# Performance

Preserve:

- Server Components
- Server Actions
- Existing query patterns

Avoid unnecessary client components.

Avoid unnecessary fetching.

Use Next.js patterns correctly.


---

# Error Handling

Ensure:

- Loading states exist
- Error states exist
- Empty states exist
- Failed actions give useful feedback


---

# Important Rules

DO NOT:

- Rewrite the database schema
- Replace Drizzle
- Replace server actions
- Add authentication
- Add unnecessary features
- Change domain terminology

The project is already feature complete.

This is a finishing and polish task.

Before changing anything:

1. Inspect the existing code.
2. Understand current patterns.
3. Preserve working functionality.
4. Make incremental improvements.

Your output should be:

1. List of recommended improvements.
2. Implementation plan.
3. Then implement improvements feature-by-feature.

Prioritize:
1. User experience
2. Visual polish
3. Mobile responsiveness
4. Maintainability
5. Performance
```
