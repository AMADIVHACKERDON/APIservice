GRANT SELECT ON public.solutions TO anon, authenticated;
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.solution_categories TO anon, authenticated;
GRANT SELECT ON public.solution_relations TO anon, authenticated;
GRANT SELECT ON public.category_relations TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON public.solutions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.solution_categories TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.solution_relations TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.category_relations TO authenticated;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

GRANT ALL ON public.solutions, public.categories, public.solution_categories,
  public.solution_relations, public.category_relations,
  public.user_roles, public.profiles TO service_role;