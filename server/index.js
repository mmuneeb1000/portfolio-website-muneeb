const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    name: "terraria-crafting-tree",
    description: "Terraria Crafting Trees With Dynamic Items Mapping",
    tech: ["React", "Node.js", "React Router", "Tailwind CSS"],
    github: "https://github.com/mmuneeb1000/terraria-crafting-tree",
    live: "https://playful-praline-5ad535.netlify.app/",
    size: "260MB",
    date: "July 10",
  },
  {
    id: 2,
    name: "weather-app",
    description: "Hourly, Daily and Current Weather with Open Mateo API",
    tech: ["React", "Tailwind CSS", "API"],
    github: "https://github.com/mmuneeb1000/weather-app-main",
    live: "https://weather-app-open-mateo-fm.netlify.app/",
    size: "82MB",
    date: "June 27",
  },
  {
    id: 3,
    name: "foreign-exchange-checker",
    description: "55 Currencies Dynamic Converter With Comparisons Logs",
    tech: ["React", "Tailwind CSS", "API"],
    github: "https://github.com/mmuneeb1000/foreign-exchange-checker",
    live: "https://currency-converter-app-frankfurter.netlify.app/",
    size: "112MB",
    date: "July 7",
  },
  {
    id: 4,
    name: "ip-address-tracker-with-leaflet.js",
    description: "IP Address Tracker With Map",
    tech: [
      "Leaflet.js",
      "Node.js",
      "scss",
      "Express",
      "Axios",
      "cors",
      "dotenv",
    ],
    github: "https://github.com/mmuneeb1000/ip-address-tracker-with-leafletjs",
    live: "https://stunning-toffee-e1de3d.netlify.app/",
    size: "62MB",
    date: "June 17",
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
    tags: ["React", "Database"],
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
