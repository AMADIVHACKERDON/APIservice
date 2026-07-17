import "dotenv/config";
import { db } from "@/db";
import { challenges, comments, reactions, subcategories } from "@/db/schema";
import slugify from "slugify";

const seedSubcategories = [
  {
    name: "Climate & Energy",
    category: "hybrid" as const,
    description: "Problems around reducing emissions, clean energy, and climate resilience.",
  },
  {
    name: "Public Health",
    category: "hybrid" as const,
    description: "Access, prevention, and delivery of health services.",
  },
  {
    name: "Education Access",
    category: "software" as const,
    description: "Tools and platforms that broaden access to quality education.",
  },
  {
    name: "Urban Mobility",
    category: "hardware" as const,
    description: "Moving people and goods through cities more efficiently.",
  },
  {
    name: "Food Systems",
    category: "hybrid" as const,
    description: "From farm to table: waste, distribution, and sustainable production.",
  },
];

const seedChallenges = [
  {
    title: "Last-Mile Delivery for Rural Clinics",
    summary:
      "Remote health clinics run out of critical supplies because existing logistics networks ignore low-volume routes.",
    content: `## The problem
Rural clinics in low-density regions often wait weeks for basic medicines and vaccines. Central warehouses have stock, but the "last mile" is unreliable.

## Why it matters
Stock-outs lead to missed vaccinations, untreated infections, and preventable deaths.

## What would help
A low-cost routing and inventory system that aggregates demand across small clinics and coordinates shared transport — by drone, motorbike, or existing public transit.

## Open questions
- How do you keep vaccines cold without reliable power?
- Can community health workers act as distribution nodes?
- What incentives make drivers willing to serve remote stops?`,
    category: "hybrid" as const,
    difficulty: "hard" as const,
    estimatedImpact: "global" as const,
    status: "open" as const,
    featured: true,
    published: true,
    tags: "logistics,healthcare,rural",
  },
  {
    title: "AI Tutor That Actually Teaches",
    summary:
      "Most AI tutors give answers; few guide a student through the thinking process without doing the work for them.",
    content: `## The problem
Large language models can solve problems instantly, which makes them tempting shortcuts. Students paste homework and copy answers without learning.

## Why it matters
If AI tutors become answer machines, they widen the gap between students with good mentors and those without.

## What would help
A tutor that asks Socratic questions, detects misconceptions, and adapts explanations to the student's current mental model — while refusing to complete assignments directly.

## Open questions
- How do you measure "understanding" in real time?
- What guardrails prevent misuse?
- Can it work offline on cheap hardware?`,
    category: "software" as const,
    difficulty: "medium" as const,
    estimatedImpact: "national" as const,
    status: "researching" as const,
    featured: true,
    published: true,
    tags: "education,ai,learning",
  },
  {
    title: "Cool Roofs for Hot Cities",
    summary:
      "Urban heat islands push summer temperatures dangerously high, yet most roofing materials absorb solar energy.",
    content: `## The problem
Dark roofs and asphalt absorb heat, raising ambient temperatures by several degrees. The poorest neighborhoods often have the least shade and the worst housing.

## Why it matters
Extreme heat is now a leading weather-related killer. Cooling demand surges, grids strain, and vulnerable people suffer.

## What would help
Affordable, durable reflective coatings and community programs to deploy them at scale — plus policy tools to mandate cool roofs in new construction.

## Open questions
- What materials balance cost, reflectivity, and durability?
- How do you convince landlords to invest?
- Can cool roofs be paired with solar or green roofs?`,
    category: "hardware" as const,
    difficulty: "medium" as const,
    estimatedImpact: "local" as const,
    status: "open" as const,
    featured: false,
    published: true,
    tags: "climate,cities,heat",
  },
  {
    title: "Reducing Household Food Waste",
    summary:
      "Families throw away a quarter of the food they buy, mostly because they forget what they have.",
    content: `## The problem
Fridges fill up, leftovers hide, and expiration dates confuse. The result is edible food in the trash and money down the drain.

## Why it matters
Food waste is a major source of methane in landfills and a hidden cost for households.

## What would help
A simple inventory assistant — perhaps voice-first — that tracks what you buy, suggests recipes based on what will spoil soon, and helps plan portions.

## Open questions
- How much friction are people willing to tolerate?
- Can computer vision make scanning groceries effortless?
- Does gamification help or backfire?`,
    category: "software" as const,
    difficulty: "easy" as const,
    estimatedImpact: "personal" as const,
    status: "building" as const,
    featured: false,
    published: true,
    tags: "food,waste,sustainability",
  },
  {
    title: "Affordable Hearing Aids",
    summary:
      "Hearing loss affects hundreds of millions, yet conventional hearing aids remain expensive and stigmatized.",
    content: `## The problem
Quality hearing aids cost thousands and require fitting appointments. Over-the-counter options are improving but still confuse buyers.

## Why it matters
Untreated hearing loss isolates people, accelerates cognitive decline, and reduces earning potential.

## What would help
A self-fitting, open-source hearing aid with transparent pricing, smartphone-based tuning, and a supportive community for first-time users.

## Open questions
- How do you ensure safe maximum volume levels?
- Can tele-audiology replace in-person fitting?
- What design reduces social stigma?`,
    category: "hardware" as const,
    difficulty: "hard" as const,
    estimatedImpact: "global" as const,
    status: "open" as const,
    featured: true,
    published: true,
    tags: "healthcare,accessibility,hardware",
  },
  {
    title: "Community Tool Libraries",
    summary:
      "People buy power tools they use once a year, while neighbors with the same needs do the same.",
    content: `## The problem
Ownership culture leads to overconsumption, clutter, and wasted resources. Many people cannot afford tools for occasional repairs or projects.

## Why it matters
A shared tool library reduces consumption, builds neighborhood connections, and lowers the barrier to home maintenance and creative projects.

## What would help
A lightweight platform to catalog tools, schedule loans, track condition, and manage membership — plus guidance on insurance and liability.

## Open questions
- What model is financially sustainable?
- How do you prevent theft and damage?
- Can local governments sponsor spaces?`,
    category: "hybrid" as const,
    difficulty: "easy" as const,
    estimatedImpact: "local" as const,
    status: "open" as const,
    featured: false,
    published: true,
    tags: "community,sharing,circular",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(reactions);
  await db.delete(comments);
  await db.delete(challenges);
  await db.delete(subcategories);

  const insertedSubs = await db
    .insert(subcategories)
    .values(seedSubcategories)
    .returning();

  const subMap = new Map(insertedSubs.map((s) => [s.name, s.id]));

  const challengesWithSlugs = seedChallenges.map((c) => ({
    ...c,
    subcategoryId: subMap.get(
      c.category === "software"
        ? "Education Access"
        : c.category === "hardware"
          ? "Urban Mobility"
          : "Climate & Energy"
    ) ?? null,
    slug: slugify(c.title, { lower: true, strict: true }),
  }));

  const insertedChallenges = await db
    .insert(challenges)
    .values(challengesWithSlugs)
    .returning();

  for (const challenge of insertedChallenges) {
    await db.insert(comments).values({
      challengeId: challenge.id,
      name: "Seed Contributor",
      email: "seed@example.com",
      content: `This is exactly the kind of problem worth tackling. I'd love to see a prototype focused on ${challenge.tags.split(",")[0]}.`,
    });

    await db.insert(reactions).values({
      challengeId: challenge.id,
      visitorId: "seed-visitor-1",
      type: "interested",
    });
  }

  console.log(`Inserted ${insertedSubs.length} subcategories`);
  console.log(`Inserted ${insertedChallenges.length} challenges`);
  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
