const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = require("./data/projects");
const posts = require("./data/posts");

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
