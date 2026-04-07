export const SITE = {
  name: "Adrian Earl Abade",
  role: "Full Stack Developer",
  tagline:
    "Building modern, scalable web applications that drive real results  from concept to production with precision and purpose.",
  email: "adrianearl3@gmail.com",
  github: "https://github.com/AdrianEarl000",
  linkedin: "https://linkedin.com/in/adrian-earl-abade-1040b136a",

  twitter: "https://twitter.com/Adrian Earl",
  stats: [
    { value: "4", suffix: "+", label: "Years Coding" },
    { value: "30", suffix: "+", label: "Projects Built" },
    { value: "109", suffix: "+", label: "Commits This Year" },
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
    // { icon: "⚡", name: "tRPC" },
    { icon: "🔷", name: "Prisma" },
    { icon: "🐘", name: "PostgreSQL" },
    // { icon: "🔥", name: "Redis" },
    { icon: "🌐", name: "RESTful APIs" },
  ],
  "Tools & Infrastructure": [
    { icon: "🐙", name: "GitHub" },
    // { icon: "🐳", name: "Docker" },
    { icon: "☁️", name: "Vercel" },
    // { icon: "🔶", name: "AWS" },
    // { icon: "📊", name: "Datadog" },
    { icon: "🟢", name: "Supabase" },
    { icon: "🐘", name: "Neon" },
  ],
};

export const PROJECTS = [
  {
    id: "smp-agency",
  title: "SMP Agency — Business Website",
  description:
  "Developed a high-performance, responsive business website for SMP Agency using Next.js 14 and Tailwind CSS. Optimized for fast load times, SEO, and cross-device compatibility, while delivering a clean, modern UI that enhances user engagement and brand presence.",
  tags: ["Next.js 14", "Tailwind CSS", "Figma", "GitHub"],
  image: "/images/smp-agency1.png",
  bgClass: "from-[#0f172a] to-[#1e293b]",
  accentClass: "from-blue-500/20 to-indigo-500/20",
  label: "Business Website",
  featured: true,
  demo: "https://www.smpagency.co.uk/",
  github: "https://github.com/smpagencyhub-lgtm/smp-agency.git",
  },
  
  {
    id: "syncspace",
  title: "SyncSpace — Full-Stack Real-Time Collaboration App",
  description:
    "A full-stack real-time collaboration application featuring live chat, collaborative whiteboard, and user activity tracking. Built with scalable architecture and WebSocket-based communication.",
  tags: ["Next.js", "TypeScript", "LiveBlocks", "Prisma", "PostgreSQL"],
  image: "/images/space.png",
  gClass: "from-[#0d1a1a] to-[#0d2e2e]",
  accentClass: "from-cyan-500/10 to-blue-500/10",
  label: "Full-Stack Project",
  featured: true,
  demo: "https://sync-space-phi-nine.vercel.app/",
  github: "https://github.com/AdrianEarl000/SyncSpace.git",
  },
      {
    id: "hris-intern",
    title: "HRIS — Employee Management System",
    description:
      "A Human Resources Information System built to streamline HR workflows, securely manage employee records, and optimize organizational data management.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    image: "/images/hris.png",
    bgClass: "from-[#0a111a] to-[#1a110a]", 
    accentClass: "from-blue-500/8 to-cyan-500/12", 
    label: "Internship Project",
    featured: true, 
    demo: "#",
    github: "https://github.com/pdsorote/hris-intern.git", 
},

  {
    id: "flowboard",
    title: "FlowBoard — Collaborative Task Management",
    description:
      "A collaborative task management platform designed to streamline team workflows, organize projects, and track progress seamlessly.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    image: "/images/flow.png",
    bgClass: "from-[#0d121a] to-[#120d1a]", 
    accentClass: "from-blue-500/8 to-indigo-500/12", 
    label: "Task Management",
    featured: true,
    demo: "#",
    github: "#",
  },
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
    id: "pos-inventory",
    title: "POS & Inventory Management",
    description:
      "A comprehensive Point of Sale and inventory tracking application designed to process sales transactions and manage product stock efficiently.",
    tags: ["C#", ".NET", "SQL Server"],
    emoji: "🛒",
    bgClass: "from-[#0a1a12] to-[#121a0a]",
    accentClass: "from-emerald-500/8 to-green-500/12",
    label: "Desktop App",
    featured: false,
    demo: "#",
    github: "https://github.com/AdrianEarl000/POS-InventoryManagementSystem.git", // Remember to update this URL!
},
{
      id: "cat-breed-classifier",
      title: "Cat Breed Classifier AI",
      description:
        "A desktop application featuring a custom-trained machine learning model built with ML.NET to analyze images and accurately identify various cat breeds.",
      tags: ["C#", "ML.NET", ".NET", "WinForms"],
      emoji: "🐱",
      bgClass: "from-[#1a110a] to-[#140d1a]", 
      accentClass: "from-orange-500/8 to-amber-500/12", 
      label: "Machine Learning",
      featured: false,
      demo: "#",
      github: "https://github.com/AdrianEarl000/CatBreedClassifier-FINAL-",
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
    name: "Arthur",
    role: "CEO, SMP",
    avatar: "🧑",
    avatarClass: "from-violet-500 to-purple-700",
    text: "Earl delivered beyond expectations. His ability to think in systems, not just code, made a real difference in how our platform performs. He understands execution, scalability, and user behavior — which is rare even among experienced developers.",
  },
  {
    name: "Raphael",
    role: "COO, SMP",
    avatar: "🧑",
    avatarClass: "from-pink-400 to-rose-500",
    text: "We needed someone who could move fast without compromising structure, and Earl delivered exactly that. His work improved both performance and workflow efficiency. He’s reliable, detail-oriented, and understands how to build with real business impact in mind.",
  },
  {
    name: "Philip",
    role: "Head of IT, Highland Banana Corp",
    avatar: "🧑‍🦱",
    avatarClass: "from-sky-400 to-cyan-400",
    text: "During his internship, Earl demonstrated strong technical ability and professionalism. He contributed significantly to our HRIS system and consistently showed initiative, clear communication, and a willingness to go beyond what was required.",
  },
];
