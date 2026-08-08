-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin','editor','user');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;
  -- first ever user becomes admin so the portal is usable
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- CATEGORIES / FIELDS
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  kind text NOT NULL DEFAULT 'category' CHECK (kind IN ('category','field')),
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT SELECT ON public.categories TO anon;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER categories_touch BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- SOLUTIONS
CREATE TABLE public.solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'software' CHECK (type IN ('software','hardware','hybrid')),
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solutions TO authenticated;
GRANT SELECT ON public.solutions TO anon;
GRANT ALL ON public.solutions TO service_role;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "solutions public read" ON public.solutions FOR SELECT USING (published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "solutions admin write" ON public.solutions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER solutions_touch BEFORE UPDATE ON public.solutions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX solutions_tags_idx ON public.solutions USING gin (tags);

-- JUNCTIONS
CREATE TABLE public.solution_categories (
  solution_id uuid NOT NULL REFERENCES public.solutions(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (solution_id, category_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solution_categories TO authenticated;
GRANT SELECT ON public.solution_categories TO anon;
GRANT ALL ON public.solution_categories TO service_role;
ALTER TABLE public.solution_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sc public read" ON public.solution_categories FOR SELECT USING (true);
CREATE POLICY "sc admin write" ON public.solution_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.solution_relations (
  solution_id uuid NOT NULL REFERENCES public.solutions(id) ON DELETE CASCADE,
  related_solution_id uuid NOT NULL REFERENCES public.solutions(id) ON DELETE CASCADE,
  PRIMARY KEY (solution_id, related_solution_id),
  CHECK (solution_id <> related_solution_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.solution_relations TO authenticated;
GRANT SELECT ON public.solution_relations TO anon;
GRANT ALL ON public.solution_relations TO service_role;
ALTER TABLE public.solution_relations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sr public read" ON public.solution_relations FOR SELECT USING (true);
CREATE POLICY "sr admin write" ON public.solution_relations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.category_relations (
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  related_category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (category_id, related_category_id),
  CHECK (category_id <> related_category_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_relations TO authenticated;
GRANT SELECT ON public.category_relations TO anon;
GRANT ALL ON public.category_relations TO service_role;
ALTER TABLE public.category_relations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cr public read" ON public.category_relations FOR SELECT USING (true);
CREATE POLICY "cr admin write" ON public.category_relations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- SEED
INSERT INTO public.categories (name, slug, kind, description) VALUES
  ('Network Infrastructure','network-infrastructure','category','Physical and virtual plumbing that moves data between systems.'),
  ('Security','security','category','Protecting systems, data and identities from misuse.'),
  ('Customer Relationship','customer-relationship','category','Everything about knowing and serving customers.'),
  ('Cloud Platform','cloud-platform','category','Elastic compute, storage and managed services.'),
  ('Observability','observability','category','Knowing what a system is doing, in real time.'),
  ('Switches','switches','field','Layer 2/3 devices that forward frames and packets.'),
  ('IP Addressing','ip-addressing','field','Allocation and routing of addresses across a network.'),
  ('Identity','identity','field','Who a user is, and what they are allowed to do.'),
  ('Reporting','reporting','field','Turning stored records into decisions.'),
  ('Contacts','contacts','field','People and organisations a business talks to.');

INSERT INTO public.category_relations (category_id, related_category_id)
SELECT a.id, b.id FROM public.categories a, public.categories b
WHERE (a.slug,b.slug) IN (
  ('network-infrastructure','security'),
  ('security','network-infrastructure'),
  ('cloud-platform','security'),
  ('security','cloud-platform'),
  ('cloud-platform','observability'),
  ('observability','cloud-platform'),
  ('customer-relationship','reporting'),
  ('reporting','customer-relationship'),
  ('network-infrastructure','switches'),
  ('switches','network-infrastructure'),
  ('network-infrastructure','ip-addressing'),
  ('ip-addressing','network-infrastructure'),
  ('security','identity'),
  ('identity','security'),
  ('customer-relationship','contacts'),
  ('contacts','customer-relationship')
);

INSERT INTO public.solutions (title, slug, summary, content, type, tags) VALUES
('Segmented Campus Network','segmented-campus-network','Split a flat office network into VLANs so a single compromised laptop cannot reach everything.',
'## The problem
A flat network means one infected machine can scan and reach every printer, server and laptop in the building.

## The approach
Group devices by trust level and function, then give each group its own VLAN with routed, filtered links between them.

1. Inventory every device and classify it.
2. Define VLANs: staff, guest, voice, IoT, servers, management.
3. Enforce inter-VLAN rules at the routed boundary.
4. Log and alert on denied traffic.

## Trade-offs
More segments mean more rules to maintain. Start coarse, refine over time.','hardware', ARRAY['network','segmentation','security']),
('Zero Trust Access','zero-trust-access','Authenticate and authorise every request instead of trusting anything inside the perimeter.',
'## The problem
Perimeter security assumes the inside is safe. Remote work and cloud services deleted the perimeter.

## The approach
Every request carries identity and device posture, and is evaluated per resource.

- Strong identity with MFA
- Device health signals
- Per-application authorisation policies
- Continuous re-evaluation, short-lived sessions

## Where it links
Depends on solid **Identity** and good **Observability** to spot abuse.','software', ARRAY['security','identity','access']),
('Unified Customer Record','unified-customer-record','One canonical profile per customer, stitched from every system that touches them.',
'## The problem
Sales, support and billing each keep their own version of the customer. None of them agree.

## The approach
Pick a system of record, define a stable customer key, and stream changes from the others into it.

1. Choose the identity key (email, account id, or a generated one).
2. Build deterministic matching rules first, probabilistic later.
3. Publish the merged record back to consumers.

## Payoff
Reporting stops lying, and support stops asking customers to repeat themselves.','software', ARRAY['crm','data','reporting']),
('Elastic Cloud Baseline','elastic-cloud-baseline','A repeatable landing zone: accounts, networking, identity and guardrails defined as code.',
'## The problem
Hand-built cloud accounts drift. Nobody can say what is deployed or who can reach it.

## The approach
Describe the baseline once and apply it everywhere.

- Account/project structure and tagging
- Network layout and private connectivity
- Central identity federation
- Policy guardrails and budget alerts

## Result
New environments take minutes and inherit the same controls.','hybrid', ARRAY['cloud','platform','automation']),
('Signal-First Monitoring','signal-first-monitoring','Alert on user-visible symptoms, not on every CPU spike.',
'## The problem
Dashboards full of green graphs, pagers full of noise, and outages nobody noticed.

## The approach
Define service level objectives and alert only when the error budget burns.

1. Name the user journeys that matter.
2. Instrument latency, traffic, errors, saturation.
3. Set SLOs, then alert on burn rate.
4. Keep everything else as context, not as a page.

## Result
Fewer pages, and the ones that fire mean something.','software', ARRAY['observability','slo','reliability']),
('Structured Reporting Layer','structured-reporting-layer','A modelled semantic layer so every team computes the same number the same way.',
'## The problem
Three teams, three definitions of "active customer", three numbers in the same meeting.

## The approach
Model metrics once, in version control, and let every tool read from that layer.

- Source-of-truth tables
- Named, tested metric definitions
- Access control by role

## Result
Debate moves from whose number is right to what to do about it.','software', ARRAY['reporting','data','crm']);

INSERT INTO public.solution_categories (solution_id, category_id)
SELECT s.id, c.id FROM public.solutions s, public.categories c
WHERE (s.slug,c.slug) IN (
  ('segmented-campus-network','network-infrastructure'),
  ('segmented-campus-network','switches'),
  ('segmented-campus-network','security'),
  ('segmented-campus-network','ip-addressing'),
  ('zero-trust-access','security'),
  ('zero-trust-access','identity'),
  ('zero-trust-access','cloud-platform'),
  ('unified-customer-record','customer-relationship'),
  ('unified-customer-record','contacts'),
  ('unified-customer-record','reporting'),
  ('elastic-cloud-baseline','cloud-platform'),
  ('elastic-cloud-baseline','security'),
  ('elastic-cloud-baseline','observability'),
  ('signal-first-monitoring','observability'),
  ('signal-first-monitoring','cloud-platform'),
  ('structured-reporting-layer','reporting'),
  ('structured-reporting-layer','customer-relationship')
);

INSERT INTO public.solution_relations (solution_id, related_solution_id)
SELECT a.id, b.id FROM public.solutions a, public.solutions b
WHERE (a.slug,b.slug) IN (
  ('segmented-campus-network','zero-trust-access'),
  ('zero-trust-access','segmented-campus-network'),
  ('zero-trust-access','elastic-cloud-baseline'),
  ('elastic-cloud-baseline','zero-trust-access'),
  ('elastic-cloud-baseline','signal-first-monitoring'),
  ('signal-first-monitoring','elastic-cloud-baseline'),
  ('unified-customer-record','structured-reporting-layer'),
  ('structured-reporting-layer','unified-customer-record'),
  ('signal-first-monitoring','structured-reporting-layer'),
  ('structured-reporting-layer','signal-first-monitoring')
);