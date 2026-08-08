import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Category,
  CategoryDetail,
  GraphData,
  GraphEdge,
  GraphNode,
  Solution,
  SolutionDetail,
} from "@/lib/graph-types";

const SOLUTION_COLS =
  "id,title,slug,summary,content,type,tags,published,created_at,updated_at";
const CATEGORY_COLS = "id,name,slug,kind,description";

function nodeFromSolution(s: Solution): GraphNode {
  return {
    id: `s:${s.id}`,
    label: s.title,
    slug: s.slug,
    kind: "solution",
    degree: 0,
  };
}

function nodeFromCategory(c: Category): GraphNode {
  return {
    id: `c:${c.id}`,
    label: c.name,
    slug: c.slug,
    kind: c.kind === "field" ? "field" : "category",
    degree: 0,
  };
}

function buildGraph(
  solutions: Solution[],
  categories: Category[],
  solutionCategories: { solution_id: string; category_id: string }[],
  solutionRelations: { solution_id: string; related_solution_id: string }[],
  categoryRelations: { category_id: string; related_category_id: string }[],
): GraphData {
  const nodes = new Map<string, GraphNode>();
  for (const s of solutions) nodes.set(`s:${s.id}`, nodeFromSolution(s));
  for (const c of categories) nodes.set(`c:${c.id}`, nodeFromCategory(c));

  const seen = new Set<string>();
  const edges: GraphEdge[] = [];

  const push = (a: string, b: string) => {
    if (!nodes.has(a) || !nodes.has(b) || a === b) return;
    const key = [a, b].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ source: a, target: b });
    nodes.get(a)!.degree += 1;
    nodes.get(b)!.degree += 1;
  };

  for (const r of solutionCategories) push(`s:${r.solution_id}`, `c:${r.category_id}`);
  for (const r of solutionRelations) push(`s:${r.solution_id}`, `s:${r.related_solution_id}`);
  for (const r of categoryRelations) push(`c:${r.category_id}`, `c:${r.related_category_id}`);

  return { nodes: [...nodes.values()], edges };
}

export async function getFullGraph(): Promise<GraphData> {
  const db = getSupabaseServerClient();

  const [sol, cat, sc, sr, cr] = await Promise.all([
    db.from("solutions").select(SOLUTION_COLS).eq("published", true),
    db.from("categories").select(CATEGORY_COLS),
    db.from("solution_categories").select("solution_id,category_id"),
    db.from("solution_relations").select("solution_id,related_solution_id"),
    db.from("category_relations").select("category_id,related_category_id"),
  ]);

  return buildGraph(
    (sol.data ?? []) as Solution[],
    (cat.data ?? []) as Category[],
    sc.data ?? [],
    sr.data ?? [],
    cr.data ?? [],
  );
}

export async function listSolutions(): Promise<Solution[]> {
  const db = getSupabaseServerClient();
  const { data } = await db
    .from("solutions")
    .select(SOLUTION_COLS)
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Solution[];
}

export async function listCategories(): Promise<Category[]> {
  const db = getSupabaseServerClient();
  const { data } = await db
    .from("categories")
    .select(CATEGORY_COLS)
    .order("name");
  return (data ?? []) as Category[];
}

export async function getSolutionBySlug(
  slug: string,
): Promise<SolutionDetail | null> {
  const db = getSupabaseServerClient();

  const { data: solution } = await db
    .from("solutions")
    .select(SOLUTION_COLS)
    .eq("slug", slug)
    .maybeSingle();

  if (!solution) return null;
  const sol = solution as Solution;

  const [scRes, srRes] = await Promise.all([
    db.from("solution_categories").select("category_id").eq("solution_id", sol.id),
    db
      .from("solution_relations")
      .select("related_solution_id")
      .eq("solution_id", sol.id),
  ]);

  const categoryIds = (scRes.data ?? []).map((r) => r.category_id as string);
  const relatedIds = (srRes.data ?? []).map((r) => r.related_solution_id as string);

  const [catRes, relSolRes, crRes, tagRes] = await Promise.all([
    categoryIds.length
      ? db.from("categories").select(CATEGORY_COLS).in("id", categoryIds)
      : Promise.resolve({ data: [] as Category[] }),
    relatedIds.length
      ? db.from("solutions").select(SOLUTION_COLS).in("id", relatedIds).eq("published", true)
      : Promise.resolve({ data: [] as Solution[] }),
    categoryIds.length
      ? db
          .from("category_relations")
          .select("related_category_id")
          .in("category_id", categoryIds)
      : Promise.resolve({ data: [] as { related_category_id: string }[] }),
    sol.tags.length
      ? db
          .from("solutions")
          .select(SOLUTION_COLS)
          .overlaps("tags", sol.tags)
          .eq("published", true)
          .neq("id", sol.id)
          .limit(6)
      : Promise.resolve({ data: [] as Solution[] }),
  ]);

  const categories = (catRes.data ?? []) as Category[];
  const relatedSolutions = (relSolRes.data ?? []) as Solution[];
  const tagMatches = (tagRes.data ?? []) as Solution[];

  const relatedCatIds = [
    ...new Set(
      ((crRes.data ?? []) as { related_category_id: string }[])
        .map((r) => r.related_category_id)
        .filter((id) => !categoryIds.includes(id)),
    ),
  ];

  const { data: relatedCatData } = relatedCatIds.length
    ? await db.from("categories").select(CATEGORY_COLS).in("id", relatedCatIds)
    : { data: [] as Category[] };
  const relatedCategories = (relatedCatData ?? []) as Category[];

  const neighbourSolutions = [...relatedSolutions, ...tagMatches].filter(
    (s, i, arr) => arr.findIndex((x) => x.id === s.id) === i,
  );

  const graph = buildGraph(
    [sol, ...neighbourSolutions],
    [...categories, ...relatedCategories],
    categoryIds.map((cid) => ({ solution_id: sol.id, category_id: cid })),
    neighbourSolutions.map((r) => ({
      solution_id: sol.id,
      related_solution_id: r.id,
    })),
    categoryIds.flatMap((cid) =>
      relatedCategories.map((rc) => ({
        category_id: cid,
        related_category_id: rc.id,
      })),
    ),
  );

  return {
    solution: sol,
    categories: categories.filter((c) => c.kind === "category"),
    fields: categories.filter((c) => c.kind === "field"),
    relatedSolutions,
    relatedCategories,
    tagMatches: tagMatches.filter(
      (t) => !relatedSolutions.some((r) => r.id === t.id),
    ),
    graph,
  };
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryDetail | null> {
  const db = getSupabaseServerClient();

  const { data: category } = await db
    .from("categories")
    .select(CATEGORY_COLS)
    .eq("slug", slug)
    .maybeSingle();

  if (!category) return null;
  const cat = category as Category;

  const [scRes, crRes] = await Promise.all([
    db.from("solution_categories").select("solution_id").eq("category_id", cat.id),
    db
      .from("category_relations")
      .select("related_category_id")
      .eq("category_id", cat.id),
  ]);

  const solutionIds = (scRes.data ?? []).map((r) => r.solution_id as string);
  const relatedIds = (crRes.data ?? []).map((r) => r.related_category_id as string);

  const [solRes, relCatRes] = await Promise.all([
    solutionIds.length
      ? db.from("solutions").select(SOLUTION_COLS).in("id", solutionIds).eq("published", true)
      : Promise.resolve({ data: [] as Solution[] }),
    relatedIds.length
      ? db.from("categories").select(CATEGORY_COLS).in("id", relatedIds)
      : Promise.resolve({ data: [] as Category[] }),
  ]);

  const solutions = (solRes.data ?? []) as Solution[];
  const relatedCategories = (relCatRes.data ?? []) as Category[];

  const graph = buildGraph(
    solutions,
    [cat, ...relatedCategories],
    solutions.map((s) => ({ solution_id: s.id, category_id: cat.id })),
    [],
    relatedCategories.map((rc) => ({
      category_id: cat.id,
      related_category_id: rc.id,
    })),
  );

  return { category: cat, solutions, relatedCategories, graph };
}
