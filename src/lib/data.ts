export const SITE = {
  name: "Alex Chen",
  role: "Full Stack Developer",
  tagline:
    "Building modern, scalable web applications that drive real results — from concept to production with precision and purpose.",
  email: "alex@example.com",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://twitter.com/alexchen",
  stats: [
    { value: "5", suffix: "+", label: "Years Experience" },
    { value: "40", suffix: "+", label: "Projects Delivered" },
    { value: "98", suffix: "%", label: "Client Satisfaction" },
  ],
};

export const TECH_STACK = {
  Frontend: [
    { icon: "⚛️", name: "React" },
    { icon: "▲", name: "Next.js" },
    { icon: "🎨", name: "Tailwind CSS" },
    { icon: "🎞️", name: "Framer Motion" },
    { icon: "📘", name: "TypeScript" },
    { icon: "🖼️", name: "Figma" },
  ],
  Backend: [
    { icon: "🟢", name: "Node.js" },
    { icon: "⚡", name: "tRPC" },
    { icon: "🔷", name: "Prisma" },
    { icon: "🐘", name: "PostgreSQL" },
    { icon: "🔥", name: "Redis" },
    { icon: "🌐", name: "REST / GraphQL" },
  ],
  "Tools & Infrastructure": [
    { icon: "🐙", name: "GitHub" },
    { icon: "🐳", name: "Docker" },
    { icon: "☁️", name: "Vercel" },
    { icon: "🔶", name: "AWS" },
    { icon: "📊", name: "Datadog" },
  ],
};

export const PROJECTS = [
  {
    id: "novabuy",
    title: "NovaBuy — Modern E-Commerce Platform",
    description:
      "A high-performance e-commerce platform built for a fashion retailer processing 10K+ daily transactions. Features real-time inventory, AI-powered recommendations, and a seamless checkout with 99.9% uptime.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    emoji: "🛒",
    bgClass: "from-[#1a1033] to-[#0d1a2e]",
    accentClass: "from-violet-500/20 to-teal-500/10",
    label: "Commerce Platform",
    featured: true,
    demo: "#",
    github: "#",
  },
  {
    id: "datapulse",
    title: "DataPulse Analytics Dashboard",
    description:
      "Real-time analytics SaaS with live data streaming, custom chart builders, and multi-tenant architecture serving 500+ businesses.",
    tags: ["React", "Node.js", "Redis"],
    emoji: "📊",
    bgClass: "from-[#0d2018] to-[#1a0d2e]",
    accentClass: "from-teal-500/15 to-violet-500/10",
    label: "Analytics SaaS",
    featured: false,
    demo: "#",
    github: "#",
  },
  {
    id: "scribeai",
    title: "ScribeAI — Content Generation Tool",
    description:
      "AI-powered content studio that generates SEO-optimized long-form content. Processes 50K+ requests/month with streaming responses.",
    tags: ["Next.js", "OpenAI", "Vercel AI SDK"],
    emoji: "🤖",
    bgClass: "from-[#1a1a0d] to-[#2e1a0d]",
    accentClass: "from-amber-500/10 to-violet-500/10",
    label: "AI Tool",
    featured: false,
    demo: "#",
    github: "#",
  },
  {
    id: "relay",
    title: "Relay — Real-time Team Chat",
    description:
      "A Slack-inspired workspace tool with real-time messaging, threads, file sharing, and role-based access. Built for async-first teams.",
    tags: ["Next.js", "WebSockets", "Prisma"],
    emoji: "💬",
    bgClass: "from-[#0d1a1a] to-[#1a0d1a]",
    accentClass: "from-teal-500/8 to-violet-500/12",
    label: "Team Chat",
    featured: false,
    demo: "#",
    github: "#",
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    icon: "🔭",
    name: "Discovery",
    desc: "Understanding your goals, users, and technical requirements before writing a single line of code.",
  },
  {
    num: "02",
    icon: "✏️",
    name: "Design",
    desc: "Crafting wireframes and high-fidelity prototypes in Figma. You approve before development begins.",
  },
  {
    num: "03",
    icon: "⚙️",
    name: "Development",
    desc: "Clean, typed, tested code with weekly demos. Full transparency through GitHub and Notion updates.",
  },
  {
    num: "04",
    icon: "🚀",
    name: "Deployment",
    desc: "CI/CD pipelines, performance optimization, monitoring setup, and post-launch support included.",
  },
];

export const ABOUT_SKILLS = [
  "Performance optimization",
  "System architecture",
  "API design & integration",
  "Database modeling",
  "UI/UX implementation",
  "DevOps & deployment",
];

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CEO, NovaBuy Inc.",
    avatar: "🧑",
    avatarClass: "from-violet-500 to-purple-700",
    text: "Alex delivered our platform 2 weeks ahead of schedule. The code quality was exceptional — our engineering team was genuinely impressed. He thinks like a product engineer, not just a contractor.",
  },
  {
    name: "James Okonkwo",
    role: "CTO, DataPulse",
    avatar: "👩",
    avatarClass: "from-pink-400 to-rose-500",
    text: "We hired Alex to rebuild our analytics dashboard from scratch. The result was a 60% improvement in load times and a UI our customers actually love. Truly full stack — handles design constraints like a pro.",
  },
  {
    name: "Priya Sharma",
    role: "Product Lead, ScribeAI",
    avatar: "🧑‍🦱",
    avatarClass: "from-sky-400 to-cyan-400",
    text: "Working with Alex was seamless. His communication is excellent, he asks the right questions upfront, and he consistently goes above and beyond. Our product shipped with zero post-launch bugs.",
  },
];
