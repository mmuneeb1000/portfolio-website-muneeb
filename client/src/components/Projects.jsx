import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch("https://portfolio-website-muneeb.onrender.com/api/projects")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects">
      {loading ? (
        <p className="text-muted">
          fetching... <span className="cursor" />
        </p>
      ) : (
        <div className="p-3 rounded-xl">
          <div
            className="mb-2 grid grid-cols-[60px_60px_1fr_120px] gap-4 
            border-b border-border pb-2 text-xs text-muted"
            s
          >
            <span>perms</span>
            <span>size</span>
            <span>name</span>
            <span className="text-right">modified</span>
          </div>

          {projects.map((p, i) => (
            <div
              key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="fade-in mb-1 cursor-pointer rounded-md border p-3 transition-all duration-150"
              style={{
                background:
                  hovered === p.id ? "var(--color-surface)" : "transparent",
                borderColor:
                  hovered === p.id ? "var(--color-border)" : "transparent",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className={`grid grid-cols-[60px_60px_1fr_120px] items-center gap-4 ${
                  hovered === p.id ? "mb-3" : ""
                }`}
              >
                <span className="text-xs text-green">drwxr-xr-x</span>

                <span className="text-xs text-muted">{p.size}</span>

                <span className="font-medium text-text">{p.name}/</span>

                <span className="text-right text-xs text-muted">{p.date}</span>
              </div>

              {hovered === p.id && (
                <div>
                  <p className="mb-2.5 text-[13px] text-muted">
                    <span className="text-green"># </span>
                    {p.description}
                  </p>

                  <div className="mb-3.5 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-[3px] bg-surface2 border-border
                         border px-2 py-0.5 text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-green"
                    >
                      $ git clone →
                    </a>

                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-text"
                    >
                      $ open live →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          <p className="mt-4 text-xs text-muted">
            {projects.length} directories
          </p>
        </div>
      )}
    </section>
  );
}
