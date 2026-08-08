"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MultiSelect, { type Option } from "@/components/admin/multi-select";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/slug";
import type { Category, Solution } from "@/lib/graph-types";

export default function AdminPortal() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [busy, setBusy] = useState(false);

  // Solution form
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("software");
  const [tags, setTags] = useState("");
  const [linkedCategories, setLinkedCategories] = useState<string[]>([]);
  const [linkedSolutions, setLinkedSolutions] = useState<string[]>([]);

  // Category form
  const [catName, setCatName] = useState("");
  const [catKind, setCatKind] = useState("category");
  const [catDescription, setCatDescription] = useState("");
  const [catRelated, setCatRelated] = useState<string[]>([]);

  // Inline new category
  const [inlineName, setInlineName] = useState("");
  const [inlineKind, setInlineKind] = useState("category");

  const refresh = async () => {
    const [{ data: cats }, { data: sols }] = await Promise.all([
      supabase.from("categories").select("*").order("name"),
      supabase.from("solutions").select("*").order("title"),
    ]);
    setCategories((cats ?? []) as unknown as Category[]);
    setSolutions((sols ?? []) as unknown as Solution[]);
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions: Option[] = categories.map((c) => ({
    value: c.id,
    label: c.name,
    hint: c.kind,
  }));
  const solutionOptions: Option[] = solutions.map((s) => ({
    value: s.id,
    label: s.title,
    hint: s.type,
  }));

  const addInlineCategory = async () => {
    const name = inlineName.trim();
    if (!name) return;
    setBusy(true);
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug: slugify(name), kind: inlineKind })
      .select()
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const created = data as unknown as Category;
    setCategories((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
    setLinkedCategories((prev) => [...prev, created.id]);
    setInlineName("");
    toast.success(`Added “${created.name}”.`);
  };

  const submitSolution = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      toast.error("Title, summary and body are all required.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from("solutions")
        .insert({
          title: title.trim(),
          slug: slugify(title),
          summary: summary.trim(),
          content,
          type,
          published: true,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        })
        .select()
        .single();
      if (error) throw error;
      const created = data as unknown as Solution;

      if (linkedCategories.length > 0) {
        const { error: linkError } = await supabase
          .from("solution_categories")
          .insert(
            linkedCategories.map((categoryId) => ({
              solution_id: created.id,
              category_id: categoryId,
            })),
          );
        if (linkError) throw linkError;
      }

      if (linkedSolutions.length > 0) {
        const { error: relError } = await supabase
          .from("solution_relations")
          .insert(
            linkedSolutions.map((id) => ({
              solution_id: created.id,
              related_solution_id: id,
            })),
          );
        if (relError) throw relError;
      }

      toast.success("Solution published.");
      setTitle("");
      setSummary("");
      setContent("");
      setTags("");
      setLinkedCategories([]);
      setLinkedSolutions([]);
      await refresh();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  const submitCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!catName.trim()) {
      toast.error("A name is required.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert({
          name: catName.trim(),
          slug: slugify(catName),
          kind: catKind,
          description: catDescription.trim() || null,
        })
        .select()
        .single();
      if (error) throw error;
      const created = data as unknown as Category;

      if (catRelated.length > 0) {
        const { error: relError } = await supabase
          .from("category_relations")
          .insert(
            catRelated.map((id) => ({
              category_id: created.id,
              related_category_id: id,
            })),
          );
        if (relError) throw relError;
      }

      toast.success(`“${created.name}” created.`);
      setCatName("");
      setCatDescription("");
      setCatRelated([]);
      await refresh();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Tabs defaultValue="solution" className="space-y-6">
      <TabsList>
        <TabsTrigger value="solution">New solution</TabsTrigger>
        <TabsTrigger value="category">New category / field</TabsTrigger>
      </TabsList>

      <TabsContent value="solution">
        <form
          onSubmit={submitSolution}
          className="space-y-6 rounded-2xl border border-border p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={160}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">software</SelectItem>
                  <SelectItem value="hardware">hardware</SelectItem>
                  <SelectItem value="hybrid">hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="observability, latency"
                maxLength={200}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                maxLength={400}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="content">Body (Markdown)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                className="font-mono text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-5 rounded-xl border border-dashed border-border p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Relational linker
            </h3>

            <div className="space-y-2">
              <Label>Categories &amp; fields</Label>
              <MultiSelect
                options={categoryOptions}
                selected={linkedCategories}
                onChange={setLinkedCategories}
                placeholder="Link categories and fields…"
              />
            </div>

            <div className="space-y-2">
              <Label>Related solutions</Label>
              <MultiSelect
                options={solutionOptions}
                selected={linkedSolutions}
                onChange={setLinkedSolutions}
                placeholder="Link related solutions…"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inline-category">Add a new category on the fly</Label>
              <div className="flex flex-wrap gap-2">
                <Input
                  id="inline-category"
                  value={inlineName}
                  onChange={(e) => setInlineName(e.target.value)}
                  placeholder="e.g. Edge Networking"
                  maxLength={80}
                  className="flex-1 min-w-[180px]"
                />
                <Select value={inlineKind} onValueChange={setInlineKind}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">category</SelectItem>
                    <SelectItem value="field">field</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addInlineCategory}
                  disabled={busy || !inlineName.trim()}
                >
                  <Plus className="mr-1 size-4" /> Add
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Publish solution"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="category">
        <form
          onSubmit={submitCategory}
          className="space-y-6 rounded-2xl border border-border p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                maxLength={80}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-kind">Kind</Label>
              <Select value={catKind} onValueChange={setCatKind}>
                <SelectTrigger id="cat-kind">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">category</SelectItem>
                  <SelectItem value="field">field</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cat-desc">Description</Label>
              <Textarea
                id="cat-desc"
                value={catDescription}
                onChange={(e) => setCatDescription(e.target.value)}
                rows={3}
                maxLength={400}
              />
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-dashed border-border p-5">
            <Label>Related categories &amp; fields</Label>
            <MultiSelect
              options={categoryOptions}
              selected={catRelated}
              onChange={setCatRelated}
              placeholder="Link neighbouring topics…"
            />
          </div>

          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Create"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
