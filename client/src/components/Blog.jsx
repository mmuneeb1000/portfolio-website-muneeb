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
    <section id="blog" className="border-t mt-10 border-border">
      {loading ? (
        <p className="text-muted">
          fetching... <span className="cursor" />
        </p>
      ) : (
        <div className="flex flex-col gap-px">
          {posts.map((post, i) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="no-underline"
            >
              <div
                className="fade-in grid grid-cols-[1fr_auto] items-start gap-6 border-b 
                px-4 py-5 transition-colors duration-150 hover:rounded-md"
                style={{
                  borderColor: "var(--border)",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div>
                  <div className="mb-1.5 flex items-center gap-2.5 ">
                    <span className="text-xs text-text">→</span>

                    <span className="text-sm font-medium text-text">
                      {post.title}
                    </span>
                  </div>

                  <p className="pl-[22px] text-[13px] leading-[1.6] text-muted">
                    {post.excerpt}
                  </p>

                  <div className="mt-2.5 flex gap-2 pl-[22px]">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[3px] text-green bg-green-muted border-[#004d2e] border px-2 py-[1px] text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mt-1 text-[11px] color-muted">
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
