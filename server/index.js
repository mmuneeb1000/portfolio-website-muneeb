const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    name: "react-dashboard",
    description: "Analytics dashboard with real-time data visualization",
    tech: ["React", "D3.js", "WebSocket", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
    size: "84K",
    date: "Dec 12",
  },
  {
    id: 2,
    name: "component-library",
    description: "Accessible UI component library with 60+ components",
    tech: ["React", "TypeScript", "Storybook", "Radix UI"],
    github: "https://github.com",
    live: "https://example.com",
    size: "210K",
    date: "Nov 03",
  },
  {
    id: 3,
    name: "dev-portfolio-v2",
    description: "Terminal-style portfolio — the one you're looking at",
    tech: ["React", "Express", "Node.js", "CSS"],
    github: "https://github.com",
    live: "https://example.com",
    size: "32K",
    date: "Jan 01",
  },
  {
    id: 4,
    name: "markdown-editor",
    description: "Live markdown editor with syntax highlighting and export",
    tech: ["React", "CodeMirror", "Marked.js"],
    github: "https://github.com",
    live: "https://example.com",
    size: "56K",
    date: "Oct 18",
  },
];

const posts = [
  {
    id: 1,
    slug: "css-container-queries",
    title: "CSS Container Queries are a game changer",
    excerpt:
      "How I replaced half my JavaScript layout logic with pure CSS container queries and why you should too.",
    date: "2025-01-08",
    readTime: "5 min read",
    tags: ["CSS", "Frontend"],
  },
  {
    id: 2,
    slug: "react-server-components",
    title: "React Server Components: 6 months in",
    excerpt:
      "A practical look at what RSC gets right, what still trips you up, and patterns I've settled on.",
    date: "2024-12-21",
    readTime: "8 min read",
    tags: ["React", "Performance"],
  },
  {
    id: 3,
    slug: "typescript-tips-2024",
    title: "TypeScript tricks I wish I knew earlier",
    excerpt:
      "Conditional types, template literal types, and infer — finally demystified with real examples.",
    date: "2024-11-14",
    readTime: "6 min read",
    tags: ["TypeScript"],
  },
];

app.get("/api/projects", (req, res) => {
  res.json({ success: true, data: projects });
});

app.get("/api/posts", (req, res) => {
  res.json({ success: true, data: posts });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }
  console.log(`[contact] from=${email} name=${name}`);
  res.json({ success: true, message: "Message received. I'll be in touch!" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime().toFixed(2) + "s" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
