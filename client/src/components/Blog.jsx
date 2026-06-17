import React, { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-website-muneeb.onrender.com/api/posts")
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="blog"
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="section-header" data-cmd="cat ~/blog/index.md" />

      {loading ? (
        <p style={{ color: "var(--muted)" }}>
          fetching... <span className="cursor" />
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {posts.map((post, i) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="fade-in"
                style={{
                  padding: "20px 16px",
                  borderBottom: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 24,
                  alignItems: "start",
                  transition: "background 0.15s",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.borderRadius = "6px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderRadius = "0";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "var(--green)", fontSize: 12 }}>
                      →
                    </span>
                    <span
                      style={{
                        color: "var(--text)",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {post.title}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      paddingLeft: 22,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 10,
                      paddingLeft: 22,
                    }}
                  >
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "var(--green-muted)",
                          color: "var(--green)",
                          border: "1px solid #004d2e",
                          borderRadius: 3,
                          padding: "1px 8px",
                          fontSize: 11,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: "var(--muted)", fontSize: 12 }}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 11,
                      marginTop: 4,
                    }}
                  >
                    {post.readTime}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
