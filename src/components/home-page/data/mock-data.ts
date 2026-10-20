export type CoreFieldId =
  | "web-development"
  | "cybersecurity"
  | "iot"
  | "robotics"
  | "ml"
  | "ai"
  | "hardware";

export type CoreFieldCategory =
  | "Web Development"
  | "Cybersecurity"
  | "IoT"
  | "Robotics"
  | "ML"
  | "AI"
  | "Hardware";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: CoreFieldCategory;
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

export interface CoreField {
  id: CoreFieldId;
  name: string;
  shortTitle: string;
  category: CoreFieldCategory;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    glow: string;
  };
  subDisciplines: ServiceItem[];
  bridgeToIoT: string;
  stats: { label: string; value: string };
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  fieldId: CoreFieldId;
  fieldCategory: CoreFieldCategory;
  subDisciplineTitle: string;
  status: "Live Hosted Demo" | "Active R&D" | "Hardware Testbed" | "Production System";
  liveDemoUrl?: string;
  githubUrl?: string;
  summary: string;
  previewType:
    | "fleet-telematics"
    | "sensor-stream"
    | "security-audit"
    | "robot-sim"
    | "ml-forecast"
    | "ai-copilot"
    | "pcb-blueprint";
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  techStack: string[];
  connectedTwin?: {
    fieldId: CoreFieldId;
    fieldName: string;
    projectId: string;
    projectTitle: string;
    relationship: string;
  };
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

// ----------------------------------------------------------------------
// CATALOG OF SERVICES (Organized cleanly under the 7 Core Fields)
// ----------------------------------------------------------------------
export const SERVICES_CATALOG: ServiceItem[] = [
  // 1. Web Development (All Software, Mobile, UI/UX, APIs, Platforms)
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development & SaaS Platforms",
    category: "Web Development",
    short_description: "High-performance web applications, customer portals, and responsive SaaS frontends built with Next.js and TypeScript.",
    full_description: "We build enterprise-grade web applications designed for speed, security, and scale. From custom SaaS platforms to internal portals and client dashboards, we utilize modern frameworks like Next.js, React, and Node.js with rigorous code quality.",
    iconName: "Globe",
    popular: true,
    featured: true,
    tags: ["Next.js", "React", "SaaS", "Full-Stack", "TypeScript"],
    deliverables: ["Custom Web Application Architecture", "Responsive Multi-device UI", "API Integration & Backend", "SEO & Core Web Vitals Optimization"],
    use_cases: ["SaaS platforms", "Customer & partner portals", "Internal admin dashboards", "Interactive booking systems"],
    tech_stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    problem_statement: "Legacy web applications suffer from slow load times, poor mobile responsiveness, and fragile monolithic architectures.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "mobile-dev",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Web Development",
    short_description: "Native and cross-platform mobile apps for iOS and Android with offline-ready state sync and hardware integration.",
    full_description: "Turn your product vision into polished mobile experiences. We architect cross-platform applications using React Native and Flutter with real-time sync, biometric auth, and seamless device hardware integration.",
    iconName: "Smartphone",
    popular: true,
    featured: true,
    tags: ["React Native", "iOS", "Android", "Cross-Platform", "Offline-First"],
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
    title: "UI/UX & Design Systems",
    category: "Web Development",
    short_description: "Human-centric user research, interactive wireframing, production Figma design systems, and conversion-focused UX.",
    full_description: "We craft digital products that blend aesthetic elegance with intuitive workflows. Our methodology combines user research, interactive prototyping, and comprehensive Figma design systems ready for developer handoff.",
    iconName: "Layout",
    popular: true,
    featured: false,
    tags: ["Figma", "Design Systems", "User Research", "Wireframing"],
    deliverables: ["Interactive Figma Prototypes", "Production Design System Tokens", "User Journey & Usability Audits", "Developer Handoff Specifications"],
    use_cases: ["New product discovery", "Complex dashboard simplification", "Conversion funnel redesign", "Mobile app usability refinement"],
    tech_stack: ["Figma", "FigJam", "Framer", "Storybook", "Zeroheight"],
    problem_statement: "Cluttered user interfaces and confusing navigation create high user drop-off rates and excessive support ticket volumes.",
    turnaround_estimate: "2 - 5 weeks",
    starting_price_hint: "Milestone-based quote",
  },
  {
    id: "api-integration",
    slug: "api-development-and-integration",
    title: "API Development & Integration",
    category: "Web Development",
    short_description: "Robust REST & GraphQL APIs with high throughput, OpenAPI documentation, and rate-limiting security layers.",
    full_description: "Build clean, developer-friendly backend APIs that power web frontends, mobile clients, and external partner integrations. We prioritize clear schemas, semantic versioning, and rigorous unit and integration tests.",
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
    title: "E-Commerce & High-Conversion Storefronts",
    category: "Web Development",
    short_description: "High-converting headless commerce storefronts with fast checkouts, internationalization, and ERP inventory sync.",
    full_description: "Custom commerce experiences built for conversions and high transaction volumes. We implement headless commerce stacks with blazing-fast search, localized checkouts, and resilient inventory bridges.",
    iconName: "ShoppingBag",
    popular: false,
    featured: false,
    tags: ["Headless Commerce", "Shopify API", "Stripe", "Checkout Optimization"],
    deliverables: ["Headless Storefront Architecture", "Custom Payment Gateway Integrations", "Real-time Inventory & ERP Bridge", "Conversion Funnel Optimization"],
    use_cases: ["High-volume DTC brands", "B2B wholesale customer portals", "Multi-currency global retail stores"],
    tech_stack: ["Next.js Commerce", "Shopify API", "Stripe", "Algolia", "Sanity"],
    problem_statement: "Off-the-shelf theme bloat slows down page speeds, hurting SEO rankings and depressing checkout conversion rates.",
    turnaround_estimate: "4 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "software-consulting",
    slug: "software-consulting",
    title: "Software Architecture Consulting",
    category: "Web Development",
    short_description: "Senior technical advisory on architecture choices, technical debt remediation, and technology due diligence.",
    full_description: "Senior engineering guidance before committing major capital. We conduct technical audits, evaluate vendor platforms, and architect resilient software roadmaps that scale smoothly.",
    iconName: "Compass",
    popular: false,
    featured: false,
    tags: ["Architecture Audit", "Tech Due Diligence", "Code Review", "CTO Advisory"],
    deliverables: ["Comprehensive Architecture Audit", "Refactoring & Technical Debt Roadmap", "Technology Evaluation Matrix", "Engineering Standards Guide"],
    use_cases: ["Pre-acquisition technical due diligence", "Scaling bottlenecks diagnosis", "Technology stack migration planning"],
    tech_stack: ["System Design", "Cloud Economics", "Microservices", "Event-Driven Arch"],
    problem_statement: "Costly technology missteps and architectural dead-ends cost companies months of engineering time and millions in rebuilds.",
    turnaround_estimate: "1 - 3 weeks",
    starting_price_hint: "Advisory engagement",
  },

  // 2. Cybersecurity (Compliance, Safety, IAM, Firewalls, Threat Intel)
  {
    id: "cybersecurity",
    slug: "cybersecurity-compliance",
    title: "Compliance, Safety & Auditing",
    category: "Cybersecurity",
    short_description: "Penetration testing, cloud security hardening, SOC 2 / ISO 27001 readiness audits, and zero-trust vulnerability assessments.",
    full_description: "Protect customer data and verify regulatory compliance. Our certified security engineers perform vulnerability assessments, API security testing, threat modeling, and infrastructure hardening across clouds and edge nodes.",
    iconName: "ShieldCheck",
    popular: true,
    featured: true,
    tags: ["Penetration Testing", "SOC 2", "OWASP", "Zero Trust", "Audit"],
    deliverables: ["Detailed Vulnerability Assessment Report", "Remediation Code & Infrastructure Fixes", "SOC 2 / ISO 27001 Readiness Matrix", "Continuous Security Monitoring Setup"],
    use_cases: ["Enterprise vendor security reviews", "Cloud posture compliance auditing", "Post-incident forensic hardening", "Pre-launch penetration tests"],
    tech_stack: ["Burp Suite", "Trivy", "Terraform Compliance", "Wiz", "Kali Linux"],
    problem_statement: "Unpatched vulnerabilities and misconfigured cloud buckets expose companies to data leaks, ransom attacks, and failed compliance reviews.",
    turnaround_estimate: "2 - 6 weeks",
    starting_price_hint: "Assessment-based quote",
  },
  {
    id: "cyber-firewall",
    slug: "firewalls-and-network-defense",
    title: "Firewalls & Perimeter Network Defense",
    category: "Cybersecurity",
    short_description: "Next-gen web application firewalls (WAF), DDoS mitigation, rate-limiting rules, and perimeter micro-segmentation.",
    full_description: "Shield your digital applications, APIs, and edge gateways from DDoS attacks, SQL injections, credential stuffing, and malicious scraping through automated firewall rules and real-time packet inspection.",
    iconName: "Lock",
    popular: false,
    featured: false,
    tags: ["WAF", "DDoS Mitigation", "Cloudflare", "Micro-Segmentation", "Network Defense"],
    deliverables: ["Cloudflare / AWS WAF Configuration", "Automated IP Blacklisting & Rate Limits", "DDoS Mitigation Architecture", "Network Traffic Anomaly Alerts"],
    use_cases: ["High-traffic API perimeter protection", "Payment portal brute-force prevention", "Multi-region edge gateway defense"],
    tech_stack: ["AWS WAF", "Cloudflare Ruleset", "Suricata", "iptables", "Envoy Proxy"],
    problem_statement: "Exposed API endpoints and unprotected web assets are constantly battered by automated botnets and malicious exploit attempts.",
    turnaround_estimate: "1 - 3 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "cyber-iam",
    slug: "authentication-and-identity-access-management",
    title: "Authentication & Identity Management (IAM)",
    category: "Cybersecurity",
    short_description: "Enterprise single sign-on (SSO), multi-factor authentication (MFA), OAuth2/OIDC, and fine-grained RBAC.",
    full_description: "Implement zero-trust identity frameworks for web platforms, mobile clients, and IoT gateway fleets. We configure secure token rotation, biometrics, SAML 2.0 / OIDC integrations, and granular role-based access control.",
    iconName: "Key",
    popular: false,
    featured: false,
    tags: ["OAuth2", "OIDC", "SAML", "RBAC", "Zero Trust", "MFA"],
    deliverables: ["Zero-Trust IAM Architecture", "OAuth2 & OIDC Provider Configuration", "Enterprise SSO & MFA Setup", "Role-Based Access Control Rules"],
    use_cases: ["Enterprise B2B customer SSO", "Field operator biometric authentication", "Machine-to-machine mTLS certificates for IoT"],
    tech_stack: ["Supabase Auth", "Auth0 / Okta", "Vault by HashiCorp", "JWT / mTLS"],
    problem_statement: "Weak authentication and lax token lifecycles are the #1 attack vector for account takeovers and internal data exfiltration.",
    turnaround_estimate: "2 - 4 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "cyber-threat-intel",
    slug: "threat-intelligence-and-surveillance",
    title: "Threat Intelligence & Active Surveillance",
    category: "Cybersecurity",
    short_description: "Continuous 24/7 security event monitoring, log surveillance, dark web credential alerts, and automated incident triage.",
    full_description: "Proactive threat intelligence scanning for early indicators of compromise (IoC). We integrate SIEM systems, collect distributed server and IoT telemetry logs, and configure automated alert triage so zero attacks slip through.",
    iconName: "Eye",
    popular: false,
    featured: false,
    tags: ["SIEM", "Threat Intel", "Log Monitoring", "Incident Response", "IoC"],
    deliverables: ["Centralized SIEM Log Pipeline", "Automated Security Alert Rules", "Dark Web Credential Leak Scanner", "Rapid Incident Response Runbook"],
    use_cases: ["Continuous enterprise monitoring", "Critical infrastructure telemetry monitoring", "Regulatory compliance log retention"],
    tech_stack: ["Elastic SIEM", "Wazuh", "Grafana Loki", "Sigma Rules", "PagerDuty"],
    problem_statement: "Average breach dwell times exceed 200 days when companies lack automated surveillance and real-time threat alert pipelines.",
    turnaround_estimate: "3 - 5 weeks",
    starting_price_hint: "Retainer-based quote",
  },

  // 3. IoT (Cloud, Automation, Security, Telemetry, Connected Devices)
  {
    id: "cloud-devops",
    slug: "cloud-infrastructure-and-iot-backends",
    title: "Cloud Infrastructure & Scalable IoT Backends",
    category: "IoT",
    short_description: "Resilient cloud infrastructure on AWS and GCP with Kubernetes, Terraform IaC, and high-throughput MQTT/telemetry ingestion.",
    full_description: "Modernize your cloud infrastructure for high availability and low-latency device communication. We implement Infrastructure as Code (IaC), container orchestration with Kubernetes, and automated deployment pipelines tailored to handle millions of concurrent device connections.",
    iconName: "Cloud",
    popular: true,
    featured: true,
    tags: ["AWS IoT Core", "GCP", "Kubernetes", "Terraform", "MQTT", "CI/CD"],
    deliverables: ["Terraform Infrastructure as Code", "Production Kubernetes (EKS/GKE)", "Automated GitHub Actions CI/CD", "High-Throughput MQTT Broker Configuration"],
    use_cases: ["Distributed sensor data ingestion", "Multi-region disaster recovery", "Auto-scaling web architecture", "Cloud expenditure reduction"],
    tech_stack: ["AWS IoT Core", "Google Cloud", "Terraform", "Docker", "EMQX", "Datadog"],
    problem_statement: "Manual deployments and fragile cloud setups cause unexpected downtimes, slow release cycles, and spiraling cloud bills when scaling device connections.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "automation",
    slug: "device-automation-and-workflow-integration",
    title: "Device Automation & Workflow Pipelines",
    category: "IoT",
    short_description: "Eliminate manual intervention by bridging connected devices, webhooks, and cloud data pipelines with resilient automation.",
    full_description: "Connect disjointed physical sensors and SaaS applications. We design webhooks, event-driven microservices, and automated workflows that react to sensor threshold breaches, automate device reboots, and trigger operational alerts.",
    iconName: "Workflow",
    popular: false,
    featured: false,
    tags: ["Webhooks", "Event-Driven", "MQTT Actions", "Microservices", "Temporal"],
    deliverables: ["Custom Integration Middleware", "Error Handling & Dead-letter Queues", "Device-to-Cloud Event Automation", "Operational Monitoring Dashboards"],
    use_cases: ["Automated environmental climate controls", "Fleet maintenance trigger alerts", "Smart building occupancy optimization"],
    tech_stack: ["Node.js", "Python", "Temporal", "Node-RED", "AWS Lambda"],
    problem_statement: "Isolated hardware devices operating without integrated cloud automation require constant human intervention and miss critical fault events.",
    turnaround_estimate: "2 - 5 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "iot-security",
    slug: "iot-cloud-security-and-edge-hardening",
    title: "IoT Cloud Security & Edge Hardening",
    category: "IoT",
    short_description: "End-to-end device identity, secure boot verification, mTLS encryption, and OTA firmware integrity checking.",
    full_description: "Securing Internet of Things devices requires defense-in-depth from silicon to cloud. We configure mutual TLS certificate authentication, secure element key storage, tamper-evident communication, and cryptographically verified Over-The-Air (OTA) firmware update pipelines.",
    iconName: "Shield",
    popular: false,
    featured: false,
    tags: ["mTLS", "Secure Boot", "OTA Updates", "Cryptographic Identity", "Edge Security"],
    deliverables: ["Device Certificate Authority Setup", "Secure OTA Firmware Distribution Pipeline", "Edge Node Hardening Guide", "Cryptographic Key Rotation System"],
    use_cases: ["Medical device edge protection", "Smart meter grid encryption", "Automotive telematics integrity"],
    tech_stack: ["X.509 Certificates", "mTLS", "AWS IoT Device Defender", "Vault", "OpenSSL"],
    problem_statement: "Compromised edge devices can be hijacked into massive botnets or used as backdoors into corporate enterprise networks.",
    turnaround_estimate: "3 - 6 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "iot-telemetry",
    slug: "telemetry-and-smart-sensor-networks",
    title: "Telemetry & Smart Sensor Networks",
    category: "IoT",
    short_description: "Real-time sensor telemetry dashboards, time-series data storage, edge caching, and live WebSocket streaming.",
    full_description: "Transform raw sensor readings into live operational clarity. We architect high-frequency data pipelines using MQTT and WebSockets, storing metrics in optimized time-series databases like TimescaleDB and InfluxDB with sub-second dashboard rendering.",
    iconName: "Activity",
    popular: true,
    featured: false,
    tags: ["Time-Series", "WebSockets", "InfluxDB", "Grafana", "Telemetry", "MQTT"],
    deliverables: ["Sub-second Live Sensor Dashboard", "Time-series Database Schema", "Edge Gateway Buffering Service", "Configurable Threshold Alert Engine"],
    use_cases: ["Industrial vibration & temperature monitoring", "Solar energy inverter telematics", "Cold chain logistics temperature verification"],
    tech_stack: ["TimescaleDB", "InfluxDB", "WebSockets", "Grafana", "Next.js", "EMQX"],
    problem_statement: "Traditional relational databases choke under millions of continuous sensor data points, causing laggy dashboards and lost telemetry packets.",
    turnaround_estimate: "3 - 7 weeks",
    starting_price_hint: "Scope-based quote",
  },

  // 4. Robotics (Automation, Embedded, Autonomous Navigation, Tele-Op)
  {
    id: "robotics-automation",
    slug: "robotics-automation-and-motion-control",
    title: "Robotics Automation & Industrial Control",
    category: "Robotics",
    short_description: "Programmable logic, PLC integration, PID motor controllers, and automated robotic arm trajectory planning.",
    full_description: "Bridge digital intelligence into physical motion. We design and program robotic automation routines for pick-and-place tasks, CNC integrations, and custom Cartesian gantry systems with microsecond repeatability.",
    iconName: "Bot",
    popular: true,
    featured: true,
    tags: ["ROS 2", "Motion Control", "PID Tuning", "Trajectory Planning", "Kinematics"],
    deliverables: ["Kinematic Model & Trajectory Controller", "PLC & Relay Integration Code", "Safety Interlock Software Architecture", "Simulation Model in Gazebo"],
    use_cases: ["Assembly line robotic sorting", "Precision lab sample liquid handling", "Automated packaging and palletizing"],
    tech_stack: ["ROS 2", "C++", "Python", "Gazebo", "OpenCV", "CAN Bus"],
    problem_statement: "Off-the-shelf robotics hardware lacks flexible software integration, leading to rigid workflows that cannot adapt to product variations.",
    turnaround_estimate: "4 - 10 weeks",
    starting_price_hint: "Engineering engagement",
  },
  {
    id: "robotics-teleop",
    slug: "autonomous-navigation-and-tele-operation",
    title: "Autonomous Navigation & Tele-Operation",
    category: "Robotics",
    short_description: "SLAM mapping, LiDAR obstacle avoidance, autonomous rover pathfinding, and ultra-low latency browser tele-operation.",
    full_description: "Enable mobile robotic rovers and drones to navigate unfamiliar environments safely. We implement LiDAR SLAM, visual odometry, dynamic obstacle evasion, and responsive web browser tele-operation consoles.",
    iconName: "Compass",
    popular: false,
    featured: false,
    tags: ["SLAM", "LiDAR", "Nav2", "Tele-Operation", "WebRTC", "Obstacle Avoidance"],
    deliverables: ["Nav2 SLAM Configuration", "Low-latency WebRTC Video & Control Stream", "3D LiDAR Point Cloud Filter", "Mobile Tele-operation Web Console"],
    use_cases: ["Warehouse autonomous mobile robots (AMRs)", "Agricultural inspection rovers", "Hazardous area remote reconnaissance"],
    tech_stack: ["ROS 2 Nav2", "WebRTC", "C++", "Python", "Cartographer SLAM"],
    problem_statement: "Robotic navigation fails in dynamic environments without reliable sensor fusion and low-latency manual override capabilities.",
    turnaround_estimate: "6 - 12 weeks",
    starting_price_hint: "Scope-based quote",
  },

  // 5. ML (Machine Learning: Predictive, Pipelines, MLOps, Anomaly Detection)
  {
    id: "ml-predictive",
    slug: "predictive-modeling-and-anomaly-detection",
    title: "Predictive Analytics & Anomaly Detection",
    category: "ML",
    short_description: "Predictive maintenance models, time-series forecasting, equipment failure detection, and automated alerting.",
    full_description: "Anticipate equipment failures and business disruptions before they happen. We build tailored machine learning models that analyze sensor feeds and historical telemetry to detect micro-anomalies and predict remaining useful life (RUL).",
    iconName: "BarChart3",
    popular: true,
    featured: true,
    tags: ["Predictive Maintenance", "Anomaly Detection", "Scikit-Learn", "Time-Series", "PyTorch"],
    deliverables: ["Trained Anomaly Detection Model", "Model Evaluation & Precision/Recall Metrics", "Real-Time Inference Microservice", "Automated Retraining Pipeline"],
    use_cases: ["Bearing & motor vibration failure forecasting", "Energy grid load balancing", "Transaction fraud scoring"],
    tech_stack: ["Python", "Scikit-learn", "LightGBM", "PyTorch", "FastAPI", "Docker"],
    problem_statement: "Unplanned machinery downtime costs industrial operations thousands of dollars per hour, yet failures exhibit detectable warning patterns weeks in advance.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "data-analytics",
    slug: "data-pipelines-warehousing-and-mlops",
    title: "Data Pipelines, Warehousing & MLOps",
    category: "ML",
    short_description: "Scalable ETL/ELT pipelines, feature stores, central data lakes, and continuous MLOps deployment workflows.",
    full_description: "Clean data is the fuel for machine learning. We construct automated data transformation pipelines using dbt, Kafka, and Snowflake, establishing continuous model validation and drift detection so algorithms remain accurate over time.",
    iconName: "Database",
    popular: false,
    featured: false,
    tags: ["Snowflake", "dbt", "Kafka", "MLOps", "Feature Store", "Apache Airflow"],
    deliverables: ["Unified Data Warehouse Schema", "Real-time Kafka Event Stream", "Automated dbt Transformation Pipelines", "Model Drift & Performance Alerts"],
    use_cases: ["Cross-system operational data lakes", "Real-time streaming telemetry aggregation", "Automated regulatory reporting pipelines"],
    tech_stack: ["Snowflake", "dbt", "Apache Kafka", "BigQuery", "Airflow", "MLflow"],
    problem_statement: "Scattered, uncleaned data creates massive bottlenecks, forcing data scientists to spend 80% of their time munging formats instead of improving models.",
    turnaround_estimate: "4 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },

  // 6. AI (Artificial Intelligence: LLMs, Multi-Agent, Vision, Copilots)
  {
    id: "ai-llm",
    slug: "generative-ai-and-custom-llm-pipelines",
    title: "Generative AI & LLM Systems",
    category: "AI",
    short_description: "Applied generative AI, RAG pipelines, fine-tuned domain models, and deterministic enterprise copilots.",
    full_description: "Integrate pragmatic artificial intelligence into your business operations. We build customized RAG (Retrieval-Augmented Generation) pipelines, embeddings systems, and guardrailed LLM workflows with rigorous accuracy benchmarking.",
    iconName: "Sparkles",
    popular: true,
    featured: true,
    tags: ["Generative AI", "LLMs", "RAG Pipelines", "LangChain", "Vector DB"],
    deliverables: ["Custom AI Agent Architecture", "Vector Database & Embeddings Pipeline", "Deterministic Guardrails & Evaluation", "API Endpoints for Product Integration"],
    use_cases: ["Customer support autonomous triage", "Internal enterprise knowledge copilots", "Complex technical document extraction", "Semantic code search"],
    tech_stack: ["Python", "OpenAI / Claude / Gemini API", "LangChain", "Pinecone", "FastAPI"],
    problem_statement: "Generic LLM prompts hallucinate and leak sensitive corporate data without grounded retrieval pipelines and evaluation guardrails.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "ai-agents",
    slug: "autonomous-multi-agent-orchestration",
    title: "Autonomous Multi-Agent Orchestration",
    category: "AI",
    short_description: "Collaborative AI agents with tool use, multi-step reasoning, memory retention, and automated task execution.",
    full_description: "Move beyond single chat prompts to autonomous agent teams. We orchestrate cooperating agents equipped with specialized tools (database lookup, code execution, API dispatch) that solve multi-step problems autonomously.",
    iconName: "Bot",
    popular: false,
    featured: false,
    tags: ["Agentic AI", "Tool Calling", "Autonomous Workflows", "LangGraph", "Multi-Agent"],
    deliverables: ["Multi-Agent Execution Graph", "Tool Calling & Sandbox Integrations", "Audit Trail & Human-in-the-Loop Hooks", "Interactive Agent Sandbox UI"],
    use_cases: ["Automated technical support ticket resolution", "Automated code review & test generation", "Multi-source research synthesis"],
    tech_stack: ["Python", "LangGraph", "Anthropic Claude", "CrewAI", "Docker"],
    problem_statement: "Complex multi-step processes break down in simple chat interfaces because traditional LLMs lack tool-calling memory and self-correction loops.",
    turnaround_estimate: "4 - 9 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "ai-vision",
    slug: "computer-vision-and-edge-inspection",
    title: "Computer Vision & Edge Visual Inspection",
    category: "AI",
    short_description: "YOLO object detection, defect inspection cameras, facial recognition verification, and edge TPU optimization.",
    full_description: "Give software and physical devices visual perception. We train lightweight convolutional and transformer vision models optimized to run on Raspberry Pi, NVIDIA Jetson, or cloud streams with sub-30ms inference times.",
    iconName: "Camera",
    popular: false,
    featured: false,
    tags: ["YOLO", "Edge Vision", "OpenCV", "Object Detection", "Jetson"],
    deliverables: ["Custom Trained YOLO Model", "Edge Deployment Package (ONNX/TensorRT)", "Real-Time Video Inference Pipeline", "Annotation & Retraining Dataset Guide"],
    use_cases: ["Manufacturing defect inspection", "Security perimeter optical tripwires", "Automated inventory barcode scanning"],
    tech_stack: ["PyTorch", "YOLOv8", "OpenCV", "TensorRT", "NVIDIA Jetson"],
    problem_statement: "Human visual inspection is slow, expensive, and prone to fatigue-induced errors in high-speed manufacturing environments.",
    turnaround_estimate: "4 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },

  // 7. Hardware (PCB Design, Microcontrollers, Sensors, Enclosures)
  {
    id: "hardware-pcb",
    slug: "custom-pcb-design-and-prototyping",
    title: "Custom PCB Design & Rapid Prototyping",
    category: "Hardware",
    short_description: "Schematic capture, multi-layer PCB layout, signal integrity routing, and rapid surface-mount prototype fabrication.",
    full_description: "Turn custom circuit designs into physical hardware. We architect schematics, layout multi-layer printed circuit boards (PCBs) in KiCad/Altium, generate Gerber manufacturing files, and coordinate rapid prototyping and pick-and-place assembly.",
    iconName: "Layers",
    popular: true,
    featured: true,
    tags: ["KiCad", "Altium", "PCB Layout", "Gerber Files", "Hardware Prototyping"],
    deliverables: ["Complete KiCad / Altium Project Files", "Gerber & Drill Files for Fab Houses", "Bill of Materials (BOM) with Sourcing", "Physical Assembled Prototype Boards"],
    use_cases: ["Custom IoT telemetry sensor nodes", "Wearable health monitor circuit boards", "Industrial motor controller boards"],
    tech_stack: ["KiCad", "Altium Designer", "JLCPCB / PCBWay", "SMD Assembly", "Multimeter & Scope"],
    problem_statement: "Breadboard prototypes are too fragile, noisy, and power-hungry for real-world deployments without custom PCB engineering.",
    turnaround_estimate: "3 - 6 weeks",
    starting_price_hint: "Engineering engagement",
  },
  {
    id: "hardware-firmware",
    slug: "microcontroller-and-firmware-engineering",
    title: "Microcontroller & Firmware Engineering",
    category: "Hardware",
    short_description: "Bare-metal C/C++, FreeRTOS, ESP32, STM32, ARM Cortex, power-saving sleep modes, and peripheral drivers.",
    full_description: "Write ultra-reliable embedded software that runs continuously for years on low-power battery nodes. We develop bare-metal C and FreeRTOS firmware with deep-sleep modes, hardware watchdog timers, and SPI/I2C/UART sensor drivers.",
    iconName: "Cpu",
    popular: true,
    featured: false,
    tags: ["ESP32", "STM32", "FreeRTOS", "Embedded C++", "Firmware", "Deep Sleep"],
    deliverables: ["Modular C/C++ Firmware Codebase", "Hardware Peripheral Driver Library", "Battery Life & Power Profiling Analysis", "Automated Flashing & Testing Scripts"],
    use_cases: ["Low-power agricultural battery sensors", "Smart lock biometric firmware", "Automotive telemetry CAN bus loggers"],
    tech_stack: ["ESP-IDF", "STM32CubeIDE", "FreeRTOS", "C/C++", "JTAG / SWD Debuggers"],
    problem_statement: "Poorly written firmware with memory leaks and unhandled exceptions can permanently brick remote hardware devices deployed in the field.",
    turnaround_estimate: "3 - 8 weeks",
    starting_price_hint: "Scope-based quote",
  },
  {
    id: "hardware-enclosure",
    slug: "sensor-hardware-and-edge-enclosures",
    title: "Sensor Hardware & Edge Enclosures",
    category: "Hardware",
    short_description: "Environmental sensor calibration (temp, vibration, gas), IP67 weatherproof enclosures, and 3D CAD modeling.",
    full_description: "Protect electronics in harsh industrial and outdoor environments. We integrate precision industrial sensors, design rugged IP65/IP67 enclosures in Fusion 360, and 3D print or CNC machine production-grade housing.",
    iconName: "Box",
    popular: false,
    featured: false,
    tags: ["CAD", "Fusion 360", "IP67 Enclosure", "Sensors", "3D Printing"],
    deliverables: ["3D CAD Enclosure Files (STEP / STL)", "IP65/IP67 Ingress Protection Testing", "Sensor Calibration & Accuracy Benchmarks", "Pre-production 3D Printed Samples"],
    use_cases: ["Harsh outdoor weather telemetry stations", "Submersible liquid level monitors", "Heavy machinery vibration pods"],
    tech_stack: ["Autodesk Fusion 360", "SLA / FDM 3D Printing", "CNC Milling", "Gore Vents"],
    problem_statement: "Moisture, vibration, and dust frequently destroy field electronics when housed in generic, unsealed commercial boxes.",
    turnaround_estimate: "2 - 5 weeks",
    starting_price_hint: "Project-based quote",
  },
];

// ----------------------------------------------------------------------
// 7 CORE FIELDS TAXONOMY
// ----------------------------------------------------------------------
export const CORE_FIELDS: CoreField[] = [
  {
    id: "web-development",
    category: "Web Development",
    name: "Web Development",
    shortTitle: "Web Dev",
    tagline: "High-Performance Software, Mobile Apps & SaaS Systems",
    description: "The digital foundation. We engineer responsive web applications, mobile platforms, intuitive UI/UX systems, and robust APIs that serve as the control centers for modern operations.",
    iconName: "Globe",
    accentColor: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      border: "border-blue-500/30",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      glow: "from-blue-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "Web Development"),
    bridgeToIoT: "Our web platforms serve as the responsive control centers and multi-tenant portals that visualize and command IoT hardware fleets in real time.",
    stats: { label: "Sub-Disciplines", value: "6 Capabilities" },
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity",
    name: "Cybersecurity",
    shortTitle: "Security",
    tagline: "Safety, Compliance, Zero-Trust & Active Surveillance",
    description: "End-to-end security posture. We protect systems with rigorous compliance audits (SOC 2, ISO 27001), zero-trust architecture, multi-factor IAM, firewalls, and 24/7 threat intelligence surveillance.",
    iconName: "ShieldCheck",
    accentColor: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      border: "border-emerald-500/30",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      glow: "from-emerald-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "Cybersecurity"),
    bridgeToIoT: "Hardware and cloud gateways require hardened cryptographic handshakes and mutual TLS (mTLS) to secure sensor payloads against tampering.",
    stats: { label: "Defense Layers", value: "4 Safeguards" },
  },
  {
    id: "iot",
    category: "IoT",
    name: "IoT (Internet of Things)",
    shortTitle: "IoT",
    tagline: "Cloud Gateways, Automation & Real-Time Sensor Telemetry",
    description: "The convergence layer. We bridge web platforms into physical devices via resilient cloud infrastructure, event-driven automation, secure mTLS device handshakes, and sub-second telemetry streams.",
    iconName: "Wifi",
    accentColor: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-600",
      border: "border-cyan-500/30",
      badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
      glow: "from-cyan-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "IoT"),
    bridgeToIoT: "The pivotal milestone where web software engineering converges with real-world sensors, turning continuous physical measurements into actionable digital intelligence.",
    stats: { label: "IoT Domains", value: "4 Key Pillars" },
  },
  {
    id: "robotics",
    category: "Robotics",
    name: "Robotics",
    shortTitle: "Robotics",
    tagline: "Autonomous Navigation, Motion Control & Fleet Operations",
    description: "Physical intelligence in action. We design industrial motion control, embedded Micro-ROS motor kinematics, LiDAR SLAM obstacle evasion, and ultra-low latency browser tele-operation consoles.",
    iconName: "Bot",
    accentColor: {
      bg: "bg-amber-500/10",
      text: "text-amber-600",
      border: "border-amber-500/30",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      glow: "from-amber-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "Robotics"),
    bridgeToIoT: "Robotics represents the physical actuation arm of IoT—translating sensor streams into autonomous movement, grasping, and robotic coordination.",
    stats: { label: "Robotic Suites", value: "2 Systems" },
  },
  {
    id: "ml",
    category: "ML",
    name: "ML (Machine Learning)",
    shortTitle: "ML",
    tagline: "Predictive Analytics, Anomaly Detection & High-Scale MLOps",
    description: "Data-driven foresight. We build predictive modeling pipelines, automated feature lakes, time-series anomaly detection, and continuous MLOps deployment cycles for continuous system optimization.",
    iconName: "BarChart3",
    accentColor: {
      bg: "bg-violet-500/10",
      text: "text-violet-600",
      border: "border-violet-500/30",
      badge: "bg-violet-50 text-violet-700 border-violet-200",
      glow: "from-violet-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "ML"),
    bridgeToIoT: "Processes high-frequency time-series streams from IoT sensor nodes to detect micro-vibration anomalies, predict wear, and avoid downtime.",
    stats: { label: "ML Pipelines", value: "2 Core Engines" },
  },
  {
    id: "ai",
    category: "AI",
    name: "AI (Artificial Intelligence)",
    shortTitle: "AI",
    tagline: "Generative AI, Autonomous Multi-Agents & Vision Systems",
    description: "Cognitive computational power. We architect enterprise LLM pipelines with deterministic RAG guardrails, cooperating multi-agent teams with tool execution, and edge computer vision.",
    iconName: "Sparkles",
    accentColor: {
      bg: "bg-purple-500/10",
      text: "text-purple-600",
      border: "border-purple-500/30",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      glow: "from-purple-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "AI"),
    bridgeToIoT: "Integrates lightweight neural models directly onto edge devices and cloud controllers for real-time vision, voice commands, and autonomous edge reasoning.",
    stats: { label: "AI Engines", value: "3 Modules" },
  },
  {
    id: "hardware",
    category: "Hardware",
    name: "Hardware",
    shortTitle: "Hardware",
    tagline: "Custom PCB Design, Firmware & Rugged Enclosures",
    description: "The silicon foundation. We engineer multi-layer PCB circuits, write bare-metal and FreeRTOS firmware for ESP32/STM32 microcontrollers, and design weatherproof IP67 field enclosures.",
    iconName: "Layers",
    accentColor: {
      bg: "bg-orange-500/10",
      text: "text-orange-600",
      border: "border-orange-500/30",
      badge: "bg-orange-50 text-orange-700 border-orange-200",
      glow: "from-orange-600/20",
    },
    subDisciplines: SERVICES_CATALOG.filter((s) => s.category === "Hardware"),
    bridgeToIoT: "The physical starting point. Every cloud dashboard and IoT telemetry pipeline begins with precision silicon, low-power PCB routing, and reliable sensor hardware.",
    stats: { label: "Hardware Labs", value: "3 Disciplines" },
  },
];

// ----------------------------------------------------------------------
// ACTIVE PROJECTS (Hosted on Frontend / Live Simulations)
// ----------------------------------------------------------------------
export const ACTIVE_PROJECTS: ProjectItem[] = [
  {
    id: "proj-fleet-portal",
    slug: "nexttechgen-cloud-fleet-portal",
    title: "NextTechGen Cloud Fleet Portal",
    tagline: "High-Throughput Web Telematics & Device Control Center",
    fieldId: "web-development",
    fieldCategory: "Web Development",
    subDisciplineTitle: "Web Applications & SaaS Platforms",
    status: "Live Hosted Demo",
    liveDemoUrl: "#fleet-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/nexttechgen-cloud-portal",
    summary: "Our flagship responsive web application delivering real-time telemetry rendering, device status monitoring, multi-tenant role access, and remote command dispatch across thousands of connected endpoints.",
    previewType: "fleet-telematics",
    metrics: [
      { label: "Throughput", value: "15,000 req/s" },
      { label: "Latency", value: "< 45ms P99" },
      { label: "Frontend", value: "Next.js 16" },
    ],
    keyFeatures: [
      "Real-time WebSocket telemetry pipeline with sub-second dashboard updates",
      "Interactive multi-device status map with regional health heatmaps",
      "Granular RBAC with cryptographic session authentication",
      "One-click remote command trigger & firmware deployment queue",
    ],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "WebSockets", "TypeScript", "PostgreSQL"],
    connectedTwin: {
      fieldId: "iot",
      fieldName: "IoT (Internet of Things)",
      projectId: "proj-edgepulse-gateway",
      projectTitle: "EdgePulse IoT Sensor Gateway",
      relationship: "This web portal ingests live telemetry streamed directly from our EdgePulse IoT Gateway.",
    },
  },
  {
    id: "proj-edgepulse-gateway",
    slug: "edgepulse-iot-sensor-gateway",
    title: "EdgePulse IoT Sensor Gateway",
    tagline: "Real-Time Telemetry Broker & Edge Stream Ingestion",
    fieldId: "iot",
    fieldCategory: "IoT",
    subDisciplineTitle: "Real-Time Telemetry & Smart Sensor Networks",
    status: "Live Hosted Demo",
    liveDemoUrl: "#telemetry-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/edgepulse-iot-gateway",
    summary: "Our central IoT ingestion engine buffering and streaming high-frequency temperature, pressure, vibration, and power telematics with zero packet loss.",
    previewType: "sensor-stream",
    metrics: [
      { label: "Protocol", value: "MQTT 5.0" },
      { label: "Packet Drop", value: "0.000%" },
      { label: "Edge Buffer", value: "Offline-Ready" },
    ],
    keyFeatures: [
      "Ultra-fast MQTT & WebSocket bidirectional message broker",
      "Automated edge buffering during intermittent internet outages",
      "mTLS certificate authentication per physical device",
      "Direct bridge to time-series database and live frontend telemetry charts",
    ],
    techStack: ["MQTT", "EMQX", "Docker", "Node.js", "InfluxDB", "WebSockets"],
    connectedTwin: {
      fieldId: "hardware",
      fieldName: "Hardware",
      projectId: "proj-sensornode-pcb",
      projectTitle: "Modular SensorNode V2 PCB",
      relationship: "Collects and translates physical sensor signals read by the Modular SensorNode V2 circuit.",
    },
  },
  {
    id: "proj-sentinel-security",
    slug: "sentinelshield-zero-trust-audit",
    title: "SentinelShield Compliance & Threat Monitor",
    tagline: "Real-Time Vulnerability & SOC 2 Security Auditing",
    fieldId: "cybersecurity",
    fieldCategory: "Cybersecurity",
    subDisciplineTitle: "Compliance, Safety & Auditing",
    status: "Live Hosted Demo",
    liveDemoUrl: "#security-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/sentinelshield-security",
    summary: "An interactive security dashboard performing automated zero-trust compliance posture audits, cloud configuration checks, and active intrusion alerts.",
    previewType: "security-audit",
    metrics: [
      { label: "SOC 2 Score", value: "98.4%" },
      { label: "Vulnerabilities", value: "0 Critical" },
      { label: "mTLS State", value: "Enforced" },
    ],
    keyFeatures: [
      "Automated compliance scoring against SOC 2 Type II and ISO 27001",
      "Real-time IP firewall blocklist & DDoS rate-limiting monitor",
      "Cryptographic token integrity and session revocation inspector",
      "Active surveillance feed highlighting unauthorized access probes",
    ],
    techStack: ["Zero Trust", "Vault", "Cloudflare WAF", "TypeScript", "React"],
  },
  {
    id: "proj-roverone-sim",
    slug: "roverone-autonomous-teleop",
    title: "RoverOne Autonomous Navigation & Tele-Op Sim",
    tagline: "Interactive 2D/3D Mobile Robot Simulator & Web Tele-Op",
    fieldId: "robotics",
    fieldCategory: "Robotics",
    subDisciplineTitle: "Autonomous Navigation & Tele-Operation",
    status: "Live Hosted Demo",
    liveDemoUrl: "#robotics-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/roverone-sim",
    summary: "In-browser robotics tele-operation and autonomous obstacle avoidance sandbox with real-time waypoint steering, LiDAR point simulation, and motor encoder telemetry.",
    previewType: "robot-sim",
    metrics: [
      { label: "Nav Stack", value: "ROS 2 / Nav2" },
      { label: "Control Latency", value: "18ms" },
      { label: "Obstacle Avoidance", value: "Dynamic 360°" },
    ],
    keyFeatures: [
      "Interactive browser joystick and keyboard drive controls",
      "Simulated 360-degree LiDAR raycasting with dynamic collision avoidance",
      "Waypoint navigation planner with optimal trajectory generation",
      "Real-time motor encoder velocity and battery state feedback",
    ],
    techStack: ["ROS 2", "Canvas API", "WebSockets", "C++", "Python", "React"],
    connectedTwin: {
      fieldId: "iot",
      fieldName: "IoT (Internet of Things)",
      projectId: "proj-edgepulse-gateway",
      projectTitle: "EdgePulse IoT Sensor Gateway",
      relationship: "Streams robot health, battery, and location telemetry through the IoT Gateway to the Web Portal.",
    },
  },
  {
    id: "proj-predictech-ml",
    slug: "predictech-anomaly-forecast-engine",
    title: "PredicTech Anomaly Forecast Engine",
    tagline: "Time-Series Predictive Maintenance & Equipment Wear Forecast",
    fieldId: "ml",
    fieldCategory: "ML",
    subDisciplineTitle: "Predictive Analytics & Anomaly Detection",
    status: "Live Hosted Demo",
    liveDemoUrl: "#ml-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/predictech-engine",
    summary: "Machine learning engine trained on sensor telemetry that forecasts motor and bearing failures up to 14 days in advance with 94.2% precision.",
    previewType: "ml-forecast",
    metrics: [
      { label: "Accuracy", value: "94.2% ROC" },
      { label: "Forecast Window", value: "14 Days" },
      { label: "Inference Time", value: "4.8ms" },
    ],
    keyFeatures: [
      "Time-series decomposition identifying micro-vibration frequency spikes",
      "Remaining Useful Life (RUL) probability curves",
      "Interactive threshold adjustment demonstrating false positive suppression",
      "Automated maintenance ticket dispatch to the engineering team",
    ],
    techStack: ["PyTorch", "Scikit-learn", "FastAPI", "Python", "Recharts", "Docker"],
    connectedTwin: {
      fieldId: "iot",
      fieldName: "IoT (Internet of Things)",
      projectId: "proj-edgepulse-gateway",
      projectTitle: "EdgePulse IoT Sensor Gateway",
      relationship: "Consumes real-time sensor streams from the IoT Gateway to execute live ML inference.",
    },
  },
  {
    id: "proj-genagent-ai",
    slug: "genagent-autonomous-copilot",
    title: "GenAgent Multi-Agent Knowledge Copilot",
    tagline: "Multi-Agent System with Tool Calling & Document Synthesis",
    fieldId: "ai",
    fieldCategory: "AI",
    subDisciplineTitle: "Autonomous Multi-Agent Orchestration",
    status: "Live Hosted Demo",
    liveDemoUrl: "#ai-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/genagent-copilot",
    summary: "Interactive AI agent playground featuring autonomous tool-calling, semantic vector search, code synthesis, and explainable multi-step reasoning steps.",
    previewType: "ai-copilot",
    metrics: [
      { label: "Agents", value: "4 Cooperating" },
      { label: "Hallucination Rate", value: "< 0.8%" },
      { label: "Tool Call Speed", value: "Sub-Second" },
    ],
    keyFeatures: [
      "Cooperating agent graph: Planner, Coder, Verifier, and Synthesizer",
      "Dynamic tool invocation (system status, vector lookup, shell simulation)",
      "Strict deterministic guardrails preventing sensitive information leakage",
      "Interactive step-by-step reasoning inspector for complete transparency",
    ],
    techStack: ["LangChain", "Claude API", "Pinecone", "Python", "Next.js"],
  },
  {
    id: "proj-sensornode-pcb",
    slug: "modular-sensornode-v2-hardware",
    title: "Modular SensorNode V2 PCB",
    tagline: "Ultra-Low Power ESP32-S3 Telemetry Circuit & Enclosure",
    fieldId: "hardware",
    fieldCategory: "Hardware",
    subDisciplineTitle: "Custom PCB Design & Rapid Prototyping",
    status: "Hardware Testbed",
    liveDemoUrl: "#hardware-demo",
    githubUrl: "https://github.com/AMADIVHACKERDON/sensornode-v2-hardware",
    summary: "Our custom 4-layer PCB design featuring the ESP32-S3 microcontroller, I2C temperature/humidity/vibration sensors, LiPo solar charger, and IP67 weather housing.",
    previewType: "pcb-blueprint",
    metrics: [
      { label: "Sleep Current", value: "14 µA" },
      { label: "Battery Life", value: "3+ Years" },
      { label: "Form Factor", value: "48 x 32 mm" },
    ],
    keyFeatures: [
      "4-layer impedance-controlled PCB layout optimized for 2.4GHz RF",
      "Onboard power management with solar harvesting and LiPo protection",
      "I2C header bus supporting modular environmental & motion sensor pods",
      "IP67 CAD enclosure with breathable Gore pressure vent",
    ],
    techStack: ["KiCad 8", "ESP32-S3", "FreeRTOS", "Fusion 360", "Embedded C++"],
    connectedTwin: {
      fieldId: "iot",
      fieldName: "IoT (Internet of Things)",
      projectId: "proj-edgepulse-gateway",
      projectTitle: "EdgePulse IoT Sensor Gateway",
      relationship: "Transmits raw environmental and vibration telemetry to the EdgePulse IoT Gateway.",
    },
  },
];

// ----------------------------------------------------------------------
// FEATURED CASE STUDIES (Rebranded to The NextTechGen Foundation)
// ----------------------------------------------------------------------
export const FEATURED_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "case-fintech-core",
    slug: "fintech-payment-modernization",
    title: "Modernizing High-Throughput Payment Orchestration",
    client: "StrataPay Global",
    industry: "Financial Services",
    summary: "Re-architected a legacy transaction gateway into an event-driven microservices architecture handling 12,000 requests/sec with zero downtime.",
    services: ["Web Development", "API Development & Integration", "Cybersecurity"],
    outcome_metric: "99.995%",
    outcome_label: "Uptime Achieved Under Peak Loads",
    challenge: "A monolithic billing system was dropping transactions during peak global shopping surges, causing revenue loss and customer friction.",
    solution: "Designed an event-driven distributed system on AWS EKS with Redis caching, Kafka message streams, and automated blue-green deployments.",
    technologies: ["Go", "Next.js", "Kubernetes", "AWS", "Kafka", "PostgreSQL"],
  },
  {
    id: "case-iot-telemetry",
    slug: "industrial-iot-sensor-fleet",
    title: "Industrial IoT Telemetry & Predictive Maintenance Gateway",
    client: "AeroPrecision Dynamics",
    industry: "Industrial Manufacturing",
    summary: "Engineered an end-to-end telemetry system linking 2,400 ESP32 sensor pods with a cloud web portal and real-time ML anomaly detection.",
    services: ["IoT", "Hardware", "ML", "Web Development"],
    outcome_metric: "-78%",
    outcome_label: "Reduction in Unscheduled Equipment Downtime",
    challenge: "Industrial bearings and pump units were failing without warning, halting production lines and costing $45k per incident.",
    solution: "Developed custom low-power PCB sensor nodes that stream high-frequency vibration data via MQTT to a live Next.js web portal with PyTorch anomaly models.",
    technologies: ["Next.js", "ESP32", "MQTT", "TimescaleDB", "PyTorch", "Docker"],
  },
  {
    id: "case-health-ai",
    slug: "ai-clinical-document-triage",
    title: "Clinical Document Intelligence & Semantic Search",
    client: "CarePulse Health",
    industry: "Healthcare & MedTech",
    summary: "Built a HIPAA-compliant AI retrieval pipeline that extracts insights from unformatted clinical reports, cutting physician review times by 64%.",
    services: ["AI", "Cybersecurity", "Web Development"],
    outcome_metric: "-64%",
    outcome_label: "Physician Document Review Time",
    challenge: "Clinicians were spending up to 3 hours daily manually sifting through scanned lab records, delaying patient care plans.",
    solution: "Engineered an on-premise vector embeddings pipeline with role-based access control, medical ontology parsing, and an intuitive audit UI.",
    technologies: ["Python", "PyTorch", "FastAPI", "Pinecone", "React", "Docker"],
  },
  {
    id: "case-robotics-fleet",
    slug: "autonomous-warehouse-rover-fleet",
    title: "Autonomous Warehouse Mobile Robot Fleet Navigation",
    client: "OmniLogistics Hubs",
    industry: "Logistics & Transport",
    summary: "Deployed 24 autonomous rovers with LiDAR SLAM and a centralized web dispatch tele-operation portal managing automated order fulfillment.",
    services: ["Robotics", "IoT", "Web Development"],
    outcome_metric: "3.4x",
    outcome_label: "Faster Order Fulfillment Speed",
    challenge: "Manual warehouse picking was unable to keep pace with e-commerce order volumes, creating multi-day shipping backlogs.",
    solution: "Created ROS 2 autonomous navigation routines paired with a real-time web tele-operation console that allows operators to supervise the entire fleet.",
    technologies: ["ROS 2", "C++", "Next.js", "WebRTC", "LiDAR", "PostGIS"],
  },
];

// ----------------------------------------------------------------------
// TESTIMONIALS (The NextTechGen Foundation)
// ----------------------------------------------------------------------
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "StrataPay Global",
    feedback: "The NextTechGen Foundation completely transformed our core payment gateway. Their engineering discipline bridges clean web software with ironclad security, delivering production code ahead of schedule.",
    service: "Web Development & Cybersecurity",
    rating: 5,
    avatarText: "ER",
  },
  {
    id: "test-2",
    name: "Dr. Marcus Vance",
    role: "Head of Product",
    company: "CarePulse Health",
    feedback: "The guided project brief made scoping effortless. We didn't have to guess how to connect our web portal to edge sensors; The NextTechGen Foundation provided a cohesive architecture spanning software, AI, and hardware.",
    service: "AI & IoT Architecture",
    rating: 5,
    avatarText: "MV",
  },
  {
    id: "test-3",
    name: "Sophia Chen",
    role: "VP Operations",
    company: "OmniLogistics Hubs",
    feedback: "Finding an engineering team that excels at both modern Next.js web applications and physical IoT hardware is almost impossible. The NextTechGen Foundation seamlessly connected our web dashboard to our warehouse rovers.",
    service: "Web Development & Robotics",
    rating: 5,
    avatarText: "SC",
  },
  {
    id: "test-4",
    name: "David Kross",
    role: "Founder & CEO",
    company: "Vektor Analytics",
    feedback: "Their transition roadmap from Web Development to IoT is brilliant. It allowed us to launch a responsive SaaS web portal first, and then integrate smart hardware sensor pods without rebuilding our software architecture.",
    service: "Software & IoT Consulting",
    rating: 5,
    avatarText: "DK",
  },
];

// ----------------------------------------------------------------------
// INSIGHTS & ENGINEERING ARTICLES
// ----------------------------------------------------------------------
export const INSIGHTS_DATA: InsightItem[] = [
  {
    id: "insight-1",
    slug: "bridging-web-development-to-iot",
    title: "Bridging the Gap: Moving From Web Development to Physical IoT",
    excerpt: "Why modern web architects are uniquely positioned to build connected hardware systems—and how WebSockets, MQTT, and edge computing make it possible.",
    category: "IoT & Web Architecture",
    author: {
      name: "Victory Amadi",
      role: "Lead Systems Architect, NextTechGen Foundation",
    },
    published_at: "Oct 18, 2026",
    read_time: "7 min read",
    tags: ["IoT", "Web Development", "Architecture", "MQTT"],
  },
  {
    id: "insight-2",
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
    id: "insight-3",
    slug: "zero-trust-iot-microcontroller-security",
    title: "Hardening Edge Silicon: Zero-Trust Security for Microcontrollers",
    excerpt: "Implementing mTLS cryptographic certificates, secure bootloaders, and tamper-resistant key storage on ESP32 and ARM Cortex nodes.",
    category: "Cybersecurity & Hardware",
    author: {
      name: "Tariq Mansour",
      role: "Principal Security Architect",
    },
    published_at: "Oct 2, 2026",
    read_time: "8 min read",
    tags: ["Cybersecurity", "Hardware", "IoT", "mTLS"],
  },
];

// ----------------------------------------------------------------------
// HOW IT WORKS STEPS
// ----------------------------------------------------------------------
export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Explore the 7 Fields",
    description: "Browse our 7 core technological domains or inspect live hosted projects built by the foundation.",
    highlight: "7 unified technology fields",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Define Your Project Brief",
    description: "Use our guided project scoping wizard to specify your goals, target hardware or software, timeline, and budget.",
    highlight: "No technical jargon required",
    iconName: "FileEdit",
  },
  {
    step: "03",
    title: "Review Architecture & Roadmap",
    description: "Receive a tailored blueprint connecting your software requirements to cloud, IoT, robotics, or hardware components.",
    highlight: "End-to-end technical clarity",
    iconName: "CheckSquare",
  },
  {
    step: "04",
    title: "Build & Deploy",
    description: "Collaborate with specialized senior engineers through rapid milestone sprints with live frontend previews and testbeds.",
    highlight: "Verified engineering execution",
    iconName: "Rocket",
  },
];

// ----------------------------------------------------------------------
// WHY CHOOSE US PILLARS
// ----------------------------------------------------------------------
export const WHY_CHOOSE_US_PILLARS = [
  {
    title: "7 Unified Tech Fields",
    description: "No fragmented vendors. We integrate Web Development, Cybersecurity, IoT, Robotics, ML, AI, and Hardware under one coherent engineering standard.",
    iconName: "Layers",
  },
  {
    title: "Web to IoT Strategic Bridge",
    description: "We help organizations transition from pure software applications into connected smart hardware, telemetry devices, and autonomous systems.",
    iconName: "Cpu",
  },
  {
    title: "Real Hosted Projects",
    description: "Every capability we offer is proven through real projects hosted directly on the frontend, featuring live interactive demos and public code repos.",
    iconName: "CheckCircle2",
  },
  {
    title: "End-to-End Security & Compliance",
    description: "From browser HTTPS encryption to microcontroller mTLS certificates, we implement zero-trust protocols across every digital and physical touchpoint.",
    iconName: "ShieldCheck",
  },
  {
    title: "Vetted Senior Specialists",
    description: "Work with proven software architects, embedded systems engineers, and AI researchers who write clean, maintainable, production-ready code.",
    iconName: "Award",
  },
  {
    title: "Transparent Milestones",
    description: "Predictable engineering roadmaps with regular interactive staging deployments, clear deliverables, and zero surprise costs.",
    iconName: "Milestone",
  },
];

// ----------------------------------------------------------------------
// GUIDED SOLUTION FINDER QUESTIONS
// ----------------------------------------------------------------------
export const RECOMMENDATION_QUESTIONS = {
  businessTypes: [
    { id: "startup", label: "Startup / High-growth", desc: "Building a new MVP or next-gen connected product" },
    { id: "iot-hardware", label: "IoT & Hardware Innovator", desc: "Connecting physical devices to cloud software and web portals" },
    { id: "enterprise", label: "Enterprise Corporation", desc: "Complex systems, security audits, scale & compliance" },
    { id: "industrial", label: "Industrial / Robotics / Logistics", desc: "Automating physical operations, mobile rovers, and predictive monitoring" },
    { id: "agency", label: "Agency or Engineering Team", desc: "Needing specialized engineering partner capacity across multiple fields" },
  ],
  goals: [
    { id: "web-app", label: "Build a Web Application, SaaS, or Portal", serviceMatch: "web-dev", field: "Web Development" },
    { id: "mobile-app", label: "Launch a Mobile App (iOS / Android)", serviceMatch: "mobile-dev", field: "Web Development" },
    { id: "iot-cloud", label: "Connect Smart Devices & Build IoT Telemetry", serviceMatch: "cloud-devops", field: "IoT" },
    { id: "security-audit", label: "Perform Security Audit & Zero-Trust Hardening", serviceMatch: "cybersecurity", field: "Cybersecurity" },
    { id: "ai-copilot", label: "Deploy Generative AI, LLMs or Multi-Agent System", serviceMatch: "ai-llm", field: "AI" },
    { id: "predictive-ml", label: "Build Predictive Analytics & Anomaly Detection", serviceMatch: "ml-predictive", field: "ML" },
    { id: "hardware-pcb", label: "Design Custom PCB & Microcontroller Firmware", serviceMatch: "hardware-pcb", field: "Hardware" },
    { id: "robotics-control", label: "Develop Robotics Motion Control or Tele-Op", serviceMatch: "robotics-automation", field: "Robotics" },
  ],
};
