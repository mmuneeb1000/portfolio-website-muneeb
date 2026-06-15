import React, { useState, useEffect } from "react";

const links = [
  { label: "~/projects", href: "#projects" },
  { label: "~/blog", href: "#blog" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(13,17,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <span style={{ color: "var(--green)", fontWeight: 500, fontSize: 15 }}>
        muneeb@portfolio:~$
      </span>
      <div style={{ display: "flex", gap: 28 }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: "var(--muted)",
              fontSize: 13,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--green)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
