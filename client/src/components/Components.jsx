import React, { useEffect, useState } from "react";

export default function Components() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-website-muneeb.onrender.com/api/posts")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="mb-16">
      <h2 className="mb-6">~/components</h2>

      {loading ? (
        <p className="text-muted">fetching...</p>
      ) : (
        <div>
          <div className="mb-3 hidden grid-cols-[60px_60px_1fr_120px] gap-4 border-b border-border pb-2 text-xs text-muted md:grid">
            <span>perms</span>
            <span>size</span>
            <span>name</span>
            <span className="text-right">modified</span>
          </div>

          {projects.map((p, i) => (
            <div
              key={p.id}
              className="fade-in mb-4 rounded-md border border-border bg-surface p-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid gap-2 md:grid-cols-[60px_60px_1fr_120px] md:items-center md:gap-4">
                <div className="flex items-center justify-between md:contents">
                  <span className="text-xs text-green">drwxr-xr-x</span>

                  <span className="text-xs text-muted md:hidden">{p.date}</span>
                </div>

                <div className="flex items-center justify-between md:contents">
                  <span className="text-xs text-muted mr-8">{p.size}</span>

                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-text text-right lg:text-left"
                  >
                    {p.name}/
                  </a>

                  <span className="hidden text-right text-xs text-muted md:block">
                    {p.date}
                  </span>
                </div>
              </div>

              <p className="mt-4 mb-3 text-[13px] text-muted">
                <span className="text-green"># </span>
                {p.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-surface2 px-2 py-1 text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-5">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-green transition-colors hover:text-text"
                >
                  $ git clone →
                </a>
              </div>
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
