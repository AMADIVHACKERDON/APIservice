export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "Development" | "Design" | "AI & Data" | "Infrastructure" | "Security" | "Strategy & Growth";
  short_description: string;
  full_description: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
  deliverables: string[];
  use_cases: string[];
  tech_stack: string[];
  problem_statement: string;
  turnaround_estimate: string;
  starting_price_hint: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  services: string[];
  outcome_metric: string;
  outcome_label: string;
  challenge: string;
  solution: string;
  technologies: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  service: string;
  rating: number;
  avatarText: string;
}

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  published_at: string;
  read_time: string;
  tags: string[];
}

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    short_description: "Modern, high-performance web applications, customer portals, and responsive websites built with scalable architecture.",
    full_description: "We build enterprise-grade web applications designed for speed, security, and scale. From custom SaaS platforms to internal portals and client dashboards, we utilize modern frameworks like Next.js, React, and Node.js with rigorous code quality.",
    iconName: "Globe",
    popular: true,
    featured: true,
    tags: ["Next.js", "React", "SaaS", "Full-Stack", "TypeScript"],
    deliverables: ["Custom Web Application Architecture", "Responsive Multi-device UI", "API Integration & Backend", "SEO & Core Web Vitals Optimization"],
    use_cases: ["SaaS platforms", "Customer & partner portals", "Internal admin dashboards", "Interactive booking systems"],
    tech_stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    problem_statement: "Legacy web applications suffer from slow load times, poor mobile responsiveness, and fragile monolithic architectures that hinder business agility.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "mobile-dev",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Development",
    short_description: "Native and cross-platform mobile apps for iOS and Android with intuitive experiences and offline-ready architectures.",
    full_description: "Turn your product vision into polished mobile experiences. We architect cross-platform and native applications using React Native and Flutter with real-time sync, biometric auth, and seamless device hardware integration.",
    iconName: "Smartphone",
    popular: true,
    featured: true,
    tags: ["React Native", "iOS", "Android", "Cross-Platform"],
    deliverables: ["Production iOS & Android Builds", "App Store & Play Store Submission", "Push Notification Architecture", "Offline Caching & State Sync"],
    use_cases: ["On-demand service apps", "Fintech & consumer wallets", "Field operations tools", "Healthcare & telehealth apps"],
    tech_stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    problem_statement: "Fragmented mobile codebases and poor cross-device compatibility lead to inconsistent customer ratings and high maintenance overhead.",
    turnaround_estimate: "6 - 12 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Design",
    short_description: "Human-centric user research, interactive wireframing, design systems, and conversion-focused product interfaces.",
    full_description: "We craft thoughtful digital products that blend aesthetic elegance with intuitive workflows. Our design methodology combines user research, interactive prototyping, and comprehensive Figma design systems.",
    iconName: "Layout",
    popular: true,
    featured: true,
    tags: ["Figma", "Design Systems", "User Research", "Wireframing"],
    deliverables: ["Interactive Figma Prototypes", "Production Design System Tokens", "User Journey & Usability Audits", "Developer Handoff Specifications"],
    use_cases: ["New product discovery", "Complex dashboard simplification", "Conversion funnel redesign", "Mobile app usability refinement"],
    tech_stack: ["Figma", "FigJam", "Framer", "Storybook", "Zeroheight"],
    problem_statement: "Cluttered user interfaces and confusing navigation create high user drop-off rates and excessive support ticket volumes.",
    turnaround_estimate: "2 - 5 weeks",
    starting_price_hint: "Milestone-based quote",
  },
  {
    id: "ai-ml",
    slug: "ai-and-machine-learning",
    title: "AI and Machine Learning",
    category: "AI & Data",
    short_description: "Applied generative AI, LLM fine-tuning, intelligent agent pipelines, and predictive machine learning models.",
    full_description: "Integrate pragmatic artificial intelligence into your business operations. We build customized RAG (Retrieval-Augmented Generation) pipelines, predictive models, autonomous agent workflows, and internal enterprise intelligence copilots.",
    iconName: "Sparkles",
    popular: true,
    featured: true,
    tags: ["Generative AI", "LLMs", "RAG Pipelines", "PyTorch", "Automation"],
    deliverables: ["Custom AI Agent Architecture", "Vector Database & Embeddings Pipeline", "Deterministic Guardrails & Evaluation", "API Endpoints for Product Integration"],
    use_cases: ["Customer support autonomous triage", "Document analysis & semantic search", "Predictive demand forecasting", "Personalized recommendation engines"],
    tech_stack: ["Python", "OpenAI / Claude API", "LangChain", "Pinecone", "PyTorch"],
    problem_statement: "Companies struggle to bridge the gap between experimental AI prototypes and secure, cost-controlled production deployments.",
    turnaround_estimate: "4 - 10 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "automation",
    slug: "automation-and-workflow-integration",
    title: "Automation & Workflow Integration",
    category: "Development",
    short_description: "Eliminate repetitive tasks by bridging your CRM, ERP, and communication tools with resilient automated pipelines.",
    full_description: "Connect disjointed SaaS applications and streamline business operations. We design webhooks, event-driven microservices, and automated workflows that eliminate manual data entry and errors.",
    iconName: "Workflow",
    popular: false,
    featured: false,
    tags: ["Webhooks", "Zapier / Make", "Microservices", "Event-Driven"],
    deliverables: ["Custom Integration Middleware", "Error Handling & Dead-letter Queues", "System Synchronization Pipelines", "Operational Monitoring Dashboards"],
    use_cases: ["Lead-to-order pipeline automation", "Inventory sync across channels", "Automated billing and invoice generation", "Employee onboarding triggers"],
    tech_stack: ["Node.js", "Python", "Temporal", "Zapier", "AWS Lambda"],
    problem_statement: "Manual copy-pasting between systems slows down team velocity and introduces costly human errors into accounting and operations.",
    turnaround_estimate: "2 - 4 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    title: "Cybersecurity & Compliance",
    category: "Security",
    short_description: "Penetration testing, cloud security hardening, SOC 2 readiness audits, and zero-trust vulnerability assessments.",
    full_description: "Protect your customer data and ensure regulatory compliance. Our certified security engineers perform vulnerability assessments, API security testing, threat modeling, and infrastructure hardening.",
    iconName: "ShieldCheck",
    popular: false,
    featured: false,
    tags: ["Penetration Testing", "SOC 2", "OWASP", "Zero Trust", "Audit"],
    deliverables: ["Detailed Vulnerability Assessment Report", "Remediation Code & Infrastructure Fixes", "SOC 2 / ISO 27001 Readiness Matrix", "Continuous Security Monitoring Setup"],
    use_cases: ["Enterprise vendor security reviews", "Cloud posture compliance auditing", "Post-incident forensic hardening", "Pre-launch penetration tests"],
    tech_stack: ["Burp Suite", "Trivy", "Terraform Compliance", "Wiz", "Kali Linux"],
    problem_statement: "Unpatched vulnerabilities and misconfigured cloud buckets expose companies to data leaks, ransom attacks, and failed compliance reviews.",
    turnaround_estimate: "2 - 6 weeks",
    starting_price_hint: "Assessment-based quote",
  },
  {
    id: "cloud-devops",
    slug: "cloud-computing-and-devops",
    title: "Cloud Computing & DevOps",
    category: "Infrastructure",
    short_description: "Resilient cloud infrastructure on AWS and GCP with Kubernetes, Terraform IaC, and zero-downtime CI/CD pipelines.",
    full_description: "Modernize your cloud infrastructure for high availability and predictable costs. We implement Infrastructure as Code (IaC), container orchestration with Kubernetes, and automated deployment pipelines.",
    iconName: "Cloud",
    popular: true,
    featured: true,
    tags: ["AWS", "GCP", "Kubernetes", "Terraform", "CI/CD"],
    deliverables: ["Terraform Infrastructure as Code", "Production Kubernetes (EKS/GKE)", "Automated GitHub Actions CI/CD", "Cost Optimization & Observability Setup"],
    use_cases: ["Monolith to microservices migration", "Multi-region disaster recovery", "Auto-scaling web architecture", "Cloud expenditure reduction"],
    tech_stack: ["AWS", "Google Cloud", "Terraform", "Docker", "Datadog"],
    problem_statement: "Manual deployments and fragile cloud setups cause unexpected downtimes, slow release cycles, and spiraling cloud bills.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "data-analytics",
    slug: "data-analytics-and-business-intelligence",
    title: "Data Analytics & BI",
    category: "AI & Data",
    short_description: "Data warehousing, modern ETL/ELT pipelines, and real-time business intelligence dashboards for executive decision-making.",
    full_description: "Transform raw transactional data into actionable commercial intelligence. We build central data lakes and warehouses, automated transformation pipelines, and high-clarity executive dashboards.",
    iconName: "BarChart3",
    popular: false,
    featured: false,
    tags: ["Snowflake", "dbt", "PostgreSQL", "Power BI", "Data Warehousing"],
    deliverables: ["Unified Data Warehouse Schema", "Automated dbt Transformation Pipelines", "Real-time Executive BI Dashboards", "Data Quality & Anomaly Alerting"],
    use_cases: ["Customer churn prediction", "Financial forecasting models", "Marketing attribution modeling", "Operational KPI tracking"],
    tech_stack: ["Snowflake", "BigQuery", "dbt", "Tableau", "Apache Airflow"],
    problem_statement: "Siloed data scattered across departments prevents leaders from making prompt, data-backed strategic decisions.",
    turnaround_estimate: "3 - 7 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "api-integration",
    slug: "api-development-and-integration",
    title: "API Development & Integration",
    category: "Development",
    short_description: "Robust REST & GraphQL APIs with high throughput, OpenAPI documentation, and rate-limiting security layers.",
    full_description: "Build clean, developer-friendly backend APIs that power frontends and external partner integrations. We prioritize clear schemas, semantic versioning, and rigorous unit and integration tests.",
    iconName: "Cpu",
    popular: false,
    featured: false,
    tags: ["REST", "GraphQL", "OpenAPI", "Microservices", "High Throughput"],
    deliverables: ["OpenAPI 3.1 Documentation & Spec", "High-concurrency API Gateway", "Authentication & Rate Limiting System", "Automated Contract Testing Suite"],
    use_cases: ["Third-party partner developer portals", "Microservice communications", "Legacy core system modernization", "Payment & billing webhooks"],
    tech_stack: ["Go", "Node.js", "GraphQL", "Redis", "PostgreSQL"],
    problem_statement: "Poorly documented, slow APIs lead to failed partner integrations and bloated frontend maintenance costs.",
    turnaround_estimate: "3 - 6 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "ecommerce",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "Development",
    short_description: "High-converting headless commerce storefronts with fast checkouts, internationalization, and ERP inventory sync.",
    full_description: "Custom commerce experiences built for conversions and high transaction volumes. We implement Shopify Plus and custom headless commerce stacks with blazing-fast search and localized checkouts.",
    iconName: "ShoppingBag",
    popular: true,
    featured: false,
    tags: ["Shopify Plus", "Headless Commerce", "Stripe", "Checkout Optimization"],
    deliverables: ["Headless Storefront Architecture", "Custom Payment Gateway Integrations", "Real-time Inventory & ERP Bridge", "Conversion Funnel Optimization"],
    use_cases: ["High-volume DTC brands", "B2B wholesale customer portals", "Multi-currency global retail stores", "Subscription commerce setups"],
    tech_stack: ["Next.js Commerce", "Shopify API", "Stripe", "Algolia", "Sanity"],
    problem_statement: "Off-the-shelf theme bloat slows down page speeds, hurting SEO rankings and depressing mobile checkout conversion rates.",
    turnaround_estimate: "4 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "software-consulting",
    slug: "software-consulting",
    title: "Software Architecture Consulting",
    category: "Strategy & Growth",
    short_description: "Senior technical advisory on architecture choices, technical debt remediation, and technology due diligence.",
    full_description: "Get impartial, senior engineering guidance before committing major capital. We conduct technical audits, evaluate vendor platforms, and architect resilient software roadmaps.",
    iconName: "Compass",
    popular: false,
    featured: false,
    tags: ["Architecture Audit", "Tech Due Diligence", "Code Review", "CTO Advisory"],
    deliverables: ["Comprehensive Architecture Audit", "Refactoring & Technical Debt Roadmap", "Technology Evaluation Matrix", "Engineering Standards Guide"],
    use_cases: ["Pre-acquisition technical due diligence", "Scaling bottlenecks diagnosis", "Technology stack migration planning", "Engineering process optimization"],
    tech_stack: ["System Design", "Cloud Economics", "Microservices", "Event-Driven Arch"],
    problem_statement: "Costly technology missteps and architectural dead-ends cost companies months of engineering time and millions in rebuilds.",
    turnaround_estimate: "1 - 3 weeks",
    starting_price_hint: "Advisory engagement",
  },
  {
    id: "it-support",
    slug: "it-support-and-infrastructure",
    title: "IT Support & Managed Infrastructure",
    category: "Infrastructure",
    short_description: "Proactive system maintenance, SLAs, database tuning, and 24/7 uptime monitoring for mission-critical services.",
    full_description: "Keep your mission-critical applications operating flawlessly. We provide continuous patch management, database optimization, SLA-backed uptime monitoring, and rapid incident response.",
    iconName: "Server",
    popular: false,
    featured: false,
    tags: ["24/7 Monitoring", "Database Tuning", "SLA Support", "Incident Response"],
    deliverables: ["24/7 Incident Escalation Setup", "Automated Off-site Backup Verification", "Quarterly Disaster Recovery Drill", "Monthly Health & Performance Reports"],
    use_cases: ["Production database optimization", "Guaranteed uptime SLAs", "Legacy system patching", "Disaster recovery failover setups"],
    tech_stack: ["Linux", "PostgreSQL", "Prometheus", "Grafana", "PagerDuty"],
    problem_statement: "Unexpected production downtime outside office hours causes reputational harm and immediate revenue leakage.",
    turnaround_estimate: "Ongoing SLA",
    starting_price_hint: "Monthly SLA tier",
  },
  {
    id: "branding-design",
    slug: "branding-and-digital-design",
    title: "Branding & Digital Design",
    category: "Design",
    short_description: "Memorable brand identities, typography guidelines, vector icon sets, and digital brand collateral.",
    full_description: "Establish a distinct visual identity that communicates authority and quality. We design logo systems, color palettes, typographic hierarchies, and cohesive digital assets.",
    iconName: "Palette",
    popular: false,
    featured: false,
    tags: ["Identity Design", "Typography", "Style Guides", "Vector Assets"],
    deliverables: ["Comprehensive Brand Guidelines Book", "Vector Logo Marks & Lockups", "Digital Asset Library", "Pitch Deck & Collateral Templates"],
    use_cases: ["Seed-stage startup brand launch", "Corporate rebrand & repositioning", "Digital product brand extension", "Marketing collateral redesign"],
    tech_stack: ["Illustrator", "Photoshop", "Figma", "Type Design", "Motion"],
    problem_statement: "Inconsistent branding across touchpoints makes startups look amateurish and weakens enterprise buyer trust.",
    turnaround_estimate: "2 - 4 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Growth & Performance Marketing",
    category: "Strategy & Growth",
    short_description: "Technical SEO, high-intent conversion rate optimization, and analytical paid acquisition campaigns.",
    full_description: "Drive qualified customer acquisition through data-driven campaigns and rigorous technical SEO. We optimize entire conversion funnels from landing page to product activation.",
    iconName: "TrendingUp",
    popular: false,
    featured: false,
    tags: ["Technical SEO", "CRO", "Paid Search", "Funnel Analytics"],
    deliverables: ["Technical SEO Site Audit & Schema Fixes", "Landing Page A/B Testing Matrix", "Conversion Tracking Architecture", "Growth Experimentation Backlog"],
    use_cases: ["B2B SaaS customer acquisition", "Organic search traffic recovery", "Checkout funnel bounce reduction", "New product launch campaigns"],
    tech_stack: ["Google Analytics 4", "PostHog", "Semrush", "Google Tag Manager"],
    problem_statement: "Marketing budgets get wasted on generic ad spend without proper funnel tracking and technical search optimization.",
    turnaround_estimate: "Monthly retainer",
    starting_price_hint: "Campaign-based quote",
  },
  {
    id: "tech-content",
    slug: "technical-content-and-documentation",
    title: "Technical Content & Docs",
    category: "Strategy & Growth",
    short_description: "Developer-focused API docs, architectural whitepapers, interactive tutorials, and technical blog writing.",
    full_description: "Engage technical decision-makers and developers with lucid, accurate documentation. We produce interactive API references, SDK documentation, case studies, and engineering blog posts.",
    iconName: "BookOpen",
    popular: false,
    featured: false,
    tags: ["API Docs", "Developer Relations", "Whitepapers", "Tutorials"],
    deliverables: ["Interactive Developer Documentation Site", "OpenAPI Specification Cleanup", "Deep-dive Architecture Whitepaper", "Technical Onboarding Guides"],
    use_cases: ["Developer API launch", "Open-source library documentation", "Enterprise compliance whitepapers", "Engineering thought leadership"],
    tech_stack: ["Markdown", "Mintlify", "Docusaurus", "OpenAPI", "Mermaid"],
    problem_statement: "Poor developer documentation creates friction during onboarding, causing developers to abandon trial integrations.",
    turnaround_estimate: "2 - 4 weeks",
    starting_price_hint: "Project-based quote",
  },
];

export const FEATURED_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "case-fintech-core",
    slug: "fintech-payment-modernization",
    title: "Modernizing High-Throughput Payment Orchestration",
    client: "StrataPay Global",
    industry: "Financial Services",
    summary: "Re-architected a legacy transaction gateway into an event-driven microservices architecture handling 12,000 requests/sec with zero downtime.",
    services: ["Web Development", "API Development", "Cloud Computing & DevOps"],
    outcome_metric: "99.995%",
    outcome_label: "Uptime Achieved Under Peak Loads",
    challenge: "A monolithic billing system was dropping transactions during peak global shopping surges, causing revenue loss and customer friction.",
    solution: "Designed an event-driven distributed system on AWS EKS with Redis caching, Kafka message streams, and automated blue-green deployments.",
    technologies: ["Go", "Next.js", "Kubernetes", "AWS", "Kafka", "PostgreSQL"],
  },
  {
    id: "case-health-ai",
    slug: "ai-clinical-document-triage",
    title: "Clinical Document Intelligence & Semantic Search",
    client: "CarePulse Health",
    industry: "Healthcare & MedTech",
    summary: "Built a HIPAA-compliant AI retrieval pipeline that extracts insights from unformatted clinical reports, cutting physician review times by 64%.",
    services: ["AI and Machine Learning", "Cybersecurity", "UI/UX Design"],
    outcome_metric: "-64%",
    outcome_label: "Physician Document Review Time",
    challenge: "Clinicians were spending up to 3 hours daily manually sifting through scanned lab records, delaying patient care plans.",
    solution: "Engineered an on-premise vector embeddings pipeline with role-based access control, medical ontology parsing, and an intuitive audit UI.",
    technologies: ["Python", "PyTorch", "FastAPI", "Pinecone", "React", "Docker"],
  },
  {
    id: "case-logistics-scale",
    slug: "global-logistics-dispatch-portal",
    title: "Global Supply Chain Dispatch & Tracking Suite",
    client: "OmniFreight Logistics",
    industry: "Logistics & Transport",
    summary: "Designed and developed an end-to-end dispatch dashboard connecting 4,200 fleet operators with real-time GPS and automated route planning.",
    services: ["Web Development", "Mobile App Development", "UI/UX Design"],
    outcome_metric: "3.4x",
    outcome_label: "Faster Dispatch Allocation",
    challenge: "Dispatchers were coordinating freight routes via phone calls and spreadsheets, leading to route deadheads and missed delivery SLAs.",
    solution: "Created a unified responsive web portal and cross-platform driver app with live WebSocket telematics and automated dispatch queues.",
    technologies: ["React Native", "Next.js", "WebSockets", "Node.js", "PostGIS"],
  },
  {
    id: "case-saas-rebrand",
    slug: "enterprise-saas-design-system",
    title: "Enterprise SaaS Design System & Portal Redesign",
    client: "Vektor Analytics",
    industry: "B2B SaaS",
    summary: "Consolidated four separate product acquisitions into a coherent design system and modern frontend, boosting customer NPS by 42 points.",
    services: ["UI/UX Design", "Web Development", "Software Architecture Consulting"],
    outcome_metric: "+42 pts",
    outcome_label: "Net Promoter Score Increase",
    challenge: "Rapid acquisitions created four disconnected user interfaces with conflicting design paradigms, confusing enterprise customers.",
    solution: "Audited workflows, built an open-source-grade design system in Figma, and implemented production React components across all suites.",
    technologies: ["Figma", "React", "TypeScript", "Tailwind CSS", "Storybook"],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "StrataPay Global",
    feedback: "SolutionDesk completely transformed our core payment gateway. Instead of dealing with vague sales pitches, their engineers immediately understood our latency bottlenecks and delivered production code ahead of schedule.",
    service: "Web Development & Cloud",
    rating: 5,
    avatarText: "ER",
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    role: "Head of Product",
    company: "CarePulse Health",
    feedback: "The guided project brief made scoping effortless. We didn't have to specify internal AI algorithms; we simply described our clinical workflow challenge, and the team proposed a compliant solution that exceeded expectations.",
    service: "AI and Machine Learning",
    rating: 5,
    avatarText: "MV",
  },
  {
    id: "test-3",
    name: "Sophia Chen",
    role: "VP Operations",
    company: "OmniFreight Logistics",
    feedback: "Having web, mobile, and design specialists in one unified platform saved us months of vendor management headaches. The dispatch portal they built has become our company's competitive edge.",
    service: "Mobile & UI/UX Design",
    rating: 5,
    avatarText: "SC",
  },
  {
    id: "test-4",
    name: "David Kross",
    role: "Founder & CEO",
    company: "Vektor Analytics",
    feedback: "Finding senior software architects who can both think at a strategic level and execute immaculate code is rare. SolutionDesk delivers top-tier agency quality with the clarity and speed of modern SaaS.",
    service: "Software Consulting",
    rating: 5,
    avatarText: "DK",
  },
];

export const INSIGHTS_DATA: InsightItem[] = [
  {
    id: "insight-1",
    slug: "evaluating-rag-vs-fine-tuning",
    title: "Enterprise RAG vs. Model Fine-Tuning: Making the Practical Choice",
    excerpt: "When should your organization invest in custom LLM weights, and when does a low-latency vector retrieval architecture yield better ROI and data control?",
    category: "AI & Machine Learning",
    author: {
      name: "Dr. Maya Patel",
      role: "Lead AI Research Engineer",
    },
    published_at: "Oct 8, 2026",
    read_time: "6 min read",
    tags: ["Artificial Intelligence", "Architecture", "Enterprise"],
  },
  {
    id: "insight-2",
    slug: "zero-downtime-nextjs-kubernetes",
    title: "Zero-Downtime Deployments for High-Traffic Next.js Applications",
    excerpt: "A practical guide to orchestrating Next.js container instances on Kubernetes with graceful shutdown hooks and edge cache revalidation strategies.",
    category: "DevOps & Cloud",
    author: {
      name: "Tariq Mansour",
      role: "Principal Cloud Architect",
    },
    published_at: "Oct 2, 2026",
    read_time: "8 min read",
    tags: ["Next.js", "Kubernetes", "DevOps"],
  },
  {
    id: "insight-3",
    slug: "design-system-tokens-scaling",
    title: "Building Design Systems That Engineers Actually Enjoy Using",
    excerpt: "How we bridge the gap between Figma design tokens and production React components to prevent styling drift across multi-team codebases.",
    category: "UI/UX Design",
    author: {
      name: "Clara Dubois",
      role: "Director of Product Design",
    },
    published_at: "Sep 24, 2026",
    read_time: "5 min read",
    tags: ["Design Systems", "Figma", "Frontend"],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Explore",
    description: "Discover services or describe your specific business challenge in our interactive catalog.",
    highlight: "15+ service domains available",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Tell Us About Your Project",
    description: "Complete an intuitive, guided project brief sharing your goals, requirements, timeline, and budget.",
    highlight: "No technical jargon needed",
    iconName: "FileEdit",
  },
  {
    step: "03",
    title: "Review Your Options",
    description: "Receive a tailored service proposal with clear deliverables, solution architecture, and proposed milestones.",
    highlight: "Transparent scope & timeline",
    iconName: "CheckSquare",
  },
  {
    step: "04",
    title: "Get Started",
    description: "Finalize your engagement, kick off collaboration with senior engineers, and track progress through clear milestones.",
    highlight: "Dedicated execution team",
    iconName: "Rocket",
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    title: "Tailored Solutions",
    description: "Every engagement is adapted directly to your specific technical requirements, existing infrastructure, and business outcomes.",
    iconName: "Sliders",
  },
  {
    title: "Multi-Service Ecosystem",
    description: "Access web developers, AI researchers, cloud architects, and security auditors under one unified service relationship.",
    iconName: "Layers",
  },
  {
    title: "Clear Discovery & Scoping",
    description: "We eliminate ambiguity early through structured requirements gathering, preventing scope creep and surprise costs.",
    iconName: "FileCheck",
  },
  {
    title: "Transparent Expectations",
    description: "Upfront communication on feasibility, timeline estimates, and deliverables before you commit engineering resources.",
    iconName: "Eye",
  },
  {
    title: "Vetted Senior Specialists",
    description: "Work directly with experienced software engineers and product designers who have built and scaled production systems.",
    iconName: "Award",
  },
  {
    title: "Structured Delivery Path",
    description: "A predictable progression from consultation to architecture design, milestone delivery, and post-launch verification.",
    iconName: "Milestone",
  },
];

export const RECOMMENDATION_QUESTIONS = {
  businessTypes: [
    { id: "startup", label: "Startup / High-growth", desc: "Building a new product or MVP quickly" },
    { id: "ecommerce", label: "E-commerce & Retail", desc: "Selling goods, subscriptions, or digital items" },
    { id: "small-biz", label: "Small & Mid Business", desc: "Modernizing operations or customer portals" },
    { id: "enterprise", label: "Enterprise Corporation", desc: "Complex systems, security, scale & compliance" },
    { id: "agency", label: "Agency or Studio", desc: "Needing specialized engineering partner capacity" },
  ],
  goals: [
    { id: "web-app", label: "Build a Web Application or SaaS", serviceMatch: "web-dev" },
    { id: "mobile-app", label: "Launch a Mobile App (iOS / Android)", serviceMatch: "mobile-dev" },
    { id: "ai-tool", label: "Implement AI, LLMs or Automation", serviceMatch: "ai-ml" },
    { id: "cloud-devops", label: "Modernize Cloud Infrastructure & CI/CD", serviceMatch: "cloud-devops" },
    { id: "security-audit", label: "Perform Security Audit & Hardening", serviceMatch: "cybersecurity" },
    { id: "redesign-ui", label: "Redesign Product UX & Design System", serviceMatch: "ui-ux" },
    { id: "integrate-apis", label: "Connect Systems & Build Custom APIs", serviceMatch: "api-integration" },
    { id: "scale-store", label: "Build or Scale an Online Store", serviceMatch: "ecommerce" },
  ],
};

