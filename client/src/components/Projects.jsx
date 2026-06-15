import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section">
      <div className="section-header" data-cmd="ls -la ~/projects/" />

      {loading ? (
        <p style={{ color: "var(--muted)" }}>
          fetching...{" "}
          <span className="cursor" />
        </p>
      ) : (
        <div>
          {/* ls header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px 60px 1fr 120px",
              color: "var(--muted)",
              fontSize: 12,
              padding: "0 0 8px",
              borderBottom: "1px solid var(--border)",
              marginBottom: 8,
              gap: 16,
            }}
          >
            <span>perms</span>
            <span>size</span>
            <span>name</span>
            <span style={{ textAlign: "right" }}>modified</span>
          </div>

          {projects.map((p, i) => (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:
                  hovered === p.id ? "var(--surface)" : "transparent",
                border:
                  hovered === p.id
                    ? "1px solid var(--border)"
                    : "1px solid transparent",
                borderRadius: 6,
                padding: "16px 12px",
                marginBottom: 4,
                cursor: "pointer",
                transition: "all 0.15s ease",
                animationDelay: `${i * 80}ms`,
              }}
              className="fade-in"
            >
              {/* ls row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 60px 1fr 120px",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: hovered === p.id ? 12 : 0,
                }}
              >
                <span style={{ color: "var(--green)", fontSize: 12 }}>
                  drwxr-xr-x
                </span>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>
                  {p.size}
                </span>
                <span style={{ color: "var(--text)", fontWeight: 500 }}>
                  {p.name}/
                </span>
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  {p.date}
                </span>
              </div>

              {/* Expanded detail */}
              {hovered === p.id && (
                <div style={{ paddingLeft: 0 }}>
                  <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 10 }}>
                    <span style={{ color: "var(--green)" }}># </span>
                    {p.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "var(--surface2)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                          borderRadius: 3,
                          padding: "2px 8px",
                          fontSize: 11,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--green)", fontSize: 12 }}
                    >
                      $ git clone →
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--muted)", fontSize: 12 }}
                    >
                      $ open live →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 16 }}>
            {projects.length} directories
          </p>
        </div>
      )}
    </section>
  );
}
