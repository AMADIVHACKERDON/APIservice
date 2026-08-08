export type CategoryKind = "category" | "field";

export interface Category {
  id: string;
  name: string;
  slug: string;
  kind: CategoryKind;
  description: string | null;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  type: "software" | "hardware" | "hybrid";
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type GraphNodeKind = "solution" | "category" | "field";

export interface GraphNode {
  id: string;
  label: string;
  slug: string;
  kind: GraphNodeKind;
  degree: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface SolutionDetail {
  solution: Solution;
  categories: Category[];
  fields: Category[];
  relatedSolutions: Solution[];
  relatedCategories: Category[];
  tagMatches: Solution[];
  graph: GraphData;
}

export interface CategoryDetail {
  category: Category;
  solutions: Solution[];
  relatedCategories: Category[];
  graph: GraphData;
}
