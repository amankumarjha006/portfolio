export const projects = [
  {
    id: "cinesync",
    title: "CineSync",
    tagline: "AI-powered movie recommendation system",
    description:
      "A full-stack, content-based recommendation engine built by cleaning and processing a dataset of over 44,000 movies.",
    image: "/projects/cinesync.png",
    github: {
      url: "https://github.com/amankumarjha006/CineSync",
      icon: "/icons/GitHub.svg",
    },
    live: {
      url: "https://cine-sync-hvnp.vercel.app/",
      icon: "/icons/Vercel.svg",
    },
    featured: true,
    stats: ["44K+ Movies", "TF-IDF", "Cosine Similarity"],
    techStack: [
      {
        name: "Python",
        icon: "/icons/Python.svg",
      },
      {
        name: "FastAPI",
        icon: "/icons/FastAPI.svg",
      },
      {
        name: "React",
        icon: "/icons/React.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "/icons/TailwindCSS.svg",
      },
      {
        name: "Jupyter Notebook",
        icon: "/icons/Jupyter.svg",
      },
    ],
    deployment: [
      {
        name: "Vercel",
        icon: "/icons/Vercel.svg",
      },
      {
        name: "Render",
        icon: "/icons/render.svg",
      },
    ],
    details: {
      problem:
        "Standard movie apps often recommend based purely on popularity rather than actual content or plot similarity.",
      solution:
        "Developed a content-based recommendation engine utilizing TF-IDF vectorization and cosine similarity to find genuinely similar films, with live posters fetched via the TMDB API.",
      challenges: [
        "Memory crashes when trying to compute a 44k×44k similarity matrix (requiring 14GB+ RAM), forcing a scale-down to 20,000 movies.",
        "Navigating complex CORS issues between the decoupled frontend and backend.",
        "Handling cold starts on free-tier backend hosting.",
      ],
      learnings: [
        "TF-IDF vs. Euclidean Distance",
        "Decoupled API Architecture",
        "Server memory management for ML models",
      ],
    },
    deepDive: [
      { label: "Dataset Size", value: "44K+ Movie Records (Kaggle)" },
      { label: "Recommendation Algorithm", value: "TF-IDF Vectorization & Cosine Similarity" },
      { label: "TMDB Integration", value: "Live Movie Poster & Metadata Fetching" },
      { label: "Deployment Strategy", value: "React on Vercel & FastAPI on Render" },
    ],
    highlights: [
      "Processed and cleaned over 44,000 movie records for similarity computation",
      "Built a content-based recommendation engine powered by TF-IDF matrices",
      "Implemented semantic poster-loading logic with full TMDB API synchronization",
      "Designed decoupled, robust system handling API CORS policy and rate-limiting",
    ],
  },
  {
    id: "chat-with-pdf",
    title: "Chat with PDF",
    tagline: "RAG-powered PDF assistant",
    description:
      "A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload any PDF and have a grounded conversation with it, complete with source page references.",
    image: "/projects/chat-with-pdf.png",
    github: {
      url: "https://github.com/amankumarjha006/chat-with-pdf",
      icon: "/icons/GitHub.svg",
    },
    live: {
      url: "https://chat-with-pdf-chi-mocha.vercel.app/",
      icon: "/icons/Vercel.svg",
    },
    featured: true,
    stats: ["Local Embeddings", "FAISS Vector Search", "Groq API"],
    techStack: [
      {
        name: "Python",
        icon: "/icons/Python.svg",
      },
      {
        name: "FastAPI",
        icon: "/icons/FastAPI.svg",
      },
      {
        name: "React",
        icon: "/icons/React.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "/icons/TailwindCSS.svg",
      },
    ],
    deployment: [
      {
        name: "Vercel",
        icon: "/icons/Vercel.svg",
      },
      {
        name: "Render",
        icon: "/icons/render.svg",
      },
    ],
    details: {
      problem:
        "Searching through large PDFs manually is inefficient, and standard LLMs often hallucinate answers without context.",
      solution:
        "Built a RAG pipeline using PyMuPDF for chunking, local sentence-transformers for free embeddings, and a FAISS index for fast semantic retrieval before passing context to Llama-3.3-70b via Groq.",
      challenges: [
        "Handling 500-character chunk overlaps to preserve context boundaries.",
        "Managing heavy memory constraints with local PyTorch/ML dependencies on free-tier hosting.",
        "In-memory FAISS indexing requiring state management without persistent storage.",
      ],
      learnings: [
        "Retrieval-Augmented Generation (RAG)",
        "Vector Embeddings & Semantic Search",
        "Handling Python ML deployment constraints",
      ],
    },
    deepDive: [
      { label: "Embedding Model", value: "sentence-transformers (all-MiniLM-L6-v2)" },
      { label: "FAISS Search", value: "In-memory Indexing & L2 Distance Search" },
      { label: "PDF Processing", value: "PyMuPDF (fitz) Chunking & Text Extraction" },
      { label: "Groq Integration", value: "Llama-3.3-70b (Context-Grounded Q&A)" },
    ],
    highlights: [
      "Configured local sentence-transformers for offline semantic vector embeddings",
      "Built a fast in-memory similarity search pipeline utilizing FAISS",
      "Structured precise PDF extraction, managing text overlapping chunk boundaries",
      "Connected Groq's high-speed API to process Llama-3.3 inference with custom system prompts",
    ],
  },
  {
    id: "ai-notes-workspace",
    title: "AI-Powered Notes Workspace",
    tagline: "Premium note-taking with intelligent insights",
    description:
      "A full-stack notes application featuring AI-powered summaries, intelligent tagging, public sharing, and a responsive workspace dashboard.",
    image: "/projects/ai-notes-workspace.png",
    github: {
      url: "https://github.com/amankumarjha006/Fullstack_notes_app",
      icon: "/icons/GitHub.svg",
    },
    live: {
      url: "https://ainotes-navy.vercel.app/",
      icon: "/icons/Vercel.svg",
    },
    featured: true,
    stats: ["Next.js App Router", "Auth.js", "Prisma ORM"],
    techStack: [
      {
        name: "Next.js",
        icon: "/icons/Next.js.svg",
      },
      {
        name: "PostgreSQL",
        icon: "/icons/PostgresSQL.svg",
      },
      {
        name: "Prisma",
        icon: "/icons/prisma.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "/icons/TailwindCSS.svg",
      },
    ],
    deployment: [
      {
        name: "Vercel",
        icon: "/icons/Vercel.svg",
      },
    ],
    details: {
      problem:
        "Users lack a centralized, secure workspace that not only stores notes but actively helps them synthesize and share information.",
      solution:
        "Engineered a Next.js 16 platform with a PostgreSQL database, integrating the Groq API to auto-generate insights and Auth.js for secure session management.",
      challenges: [
        "Implementing secure, public-facing read-only routes for shared notes.",
        "Configuring Next.js middleware to properly protect workspace routes.",
        "Designing a responsive, shell-based layout with interactive AI side-panels.",
      ],
      learnings: [
        "Next.js 16 App Router & Server Actions",
        "Relational Database Modeling with Prisma",
        "OAuth & Session Strategy implementation",
      ],
    },
    deepDive: [
      { label: "Authentication", value: "Auth.js (Session strategy & Middleware checks)" },
      { label: "Database Design", value: "PostgreSQL on Neon DB (Relational tables)" },
      { label: "Prisma ORM", value: "Database Client, Type safety, Schema Migrations" },
      { label: "AI Features", value: "Groq LLM for real-time tagging and summaries" },
    ],
    highlights: [
      "Implemented a secure session strategy using Auth.js with OAuth flow",
      "Designed relational PostgreSQL models and automated schema migrations via Prisma",
      "Integrated Groq API for lightning-fast AI summary generation and auto-tagging",
      "Built a highly responsive sidebar/panel workspace dashboard layout",
    ],
  },
];
