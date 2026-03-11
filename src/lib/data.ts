export const SITE = {
  name: "Adrian Earl Abade",
  role: "Full Stack Developer",
  tagline:
    "Building modern, scalable web applications that drive real results — from concept to production with precision and purpose.",
  email: "adrianearl@example.com",
  github: "https://github.com/AdrianEarl000",
  linkedin: "https://linkedin.com/in/Adrian Earl",
  twitter: "https://twitter.com/Adrian Earl",
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
    id: "viowrite",
    title: "VioWrite — AI Content Generator",
    description:
      "A full-stack SaaS application that generates SEO blog posts, viral social captions, and marketing copy using Google's Gemini AI.",
    tags: ["Next.js 14", "Google Gemini", "Prisma", "PostgreSQL"],
    image: "/images/viowritre.png", 
    bgClass: "from-[#130b29] to-[#2d1b4e]",
    accentClass: "from-violet-500/20 to-fuchsia-500/20",
    label: "AI SaaS Tool",
    featured: true, 
    demo: "https://ai-content-generator-delta-three.vercel.app/",
    github: "https://github.com/AdrianEarl000/AI-content-Generator",
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
    text: "Earl delivered our platform 2 weeks ahead of schedule. The code quality was exceptional — our engineering team was genuinely impressed. He thinks like a product engineer, not just a contractor.",
  },
  {
    name: "James Okonkwo",
    role: "CTO, DataPulse",
    avatar: "👩",
    avatarClass: "from-pink-400 to-rose-500",
    text: "We hired Earl to rebuild our analytics dashboard from scratch. The result was a 60% improvement in load times and a UI our customers actually love. Truly full stack — handles design constraints like a pro.",
  },
  {
    name: "Priya Sharma",
    role: "Product Lead, ScribeAI",
    avatar: "🧑‍🦱",
    avatarClass: "from-sky-400 to-cyan-400",
    text: "Working with Earl was seamless. His communication is excellent, he asks the right questions upfront, and he consistently goes above and beyond. Our product shipped with zero post-launch bugs.",
  },
];
