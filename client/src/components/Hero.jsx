import React, { useState, useEffect } from "react";

const lines = [
  { prompt: "whoami", delay: 400, output: "m.muneeb" },
  { prompt: "cat role.txt", delay: 1200, output: "frontend developer" },
  {
    prompt: "cat stack.txt",
    delay: 2000,
    output: "React · TypeScript · Node.js · CSS",
  },
  {
    prompt: "uptime",
    delay: 2800,
    output: "3 years building things for the web",
  },
];

function TypedLine({ text, speed = 40, onDone }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(id);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text]);

  return <span>{displayed}</span>;
}

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const [promptDone, setPromptDone] = useState(false);

  useEffect(() => {
    const next = lines[typingIndex];
    if (!next) return;
    const t = setTimeout(() => {
      setVisibleLines((prev) => [...prev, { ...next, typing: true }]);
      setPromptDone(false);
    }, next.delay);
    return () => clearTimeout(t);
  }, [typingIndex]);

  const handlePromptDone = (i) => {
    setTimeout(() => {
      setVisibleLines((prev) =>
        prev.map((l, idx) => (idx === i ? { ...l, showOutput: true } : l)),
      );
      setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 200);
    }, 120);
  };

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "CSS / Tailwind",
    "Vite",
    "Node.js",
    "REST APIs",
    "Git",
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 24px 80px",
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 48,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "var(--surface2)",
            borderBottom: "1px solid var(--border)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {["#ff5f57", "#ffbd2e", "#28ca41"].map((c) => (
            <span
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                display: "inline-block",
              }}
            />
          ))}
          <span
            style={{
              color: "var(--muted)",
              fontSize: 12,
              marginLeft: 8,
            }}
          >
            portfolio — zsh — 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: "24px 28px", minHeight: 200 }}>
          {visibleLines.map((line, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <div>
                <span style={{ color: "var(--green)", userSelect: "none" }}>
                  m.muneeb@portfolio:~${" "}
                </span>
                {line.typing ? (
                  <TypedLine
                    text={line.prompt}
                    onDone={() => handlePromptDone(i)}
                  />
                ) : (
                  <span>{line.prompt}</span>
                )}
              </div>
              {line.showOutput && (
                <div
                  style={{
                    color: "var(--text)",
                    paddingLeft: 0,
                    marginBottom: 8,
                  }}
                >
                  {line.output}
                </div>
              )}
            </div>
          ))}

          {/* Active cursor line */}
          {typingIndex >= lines.length && (
            <div>
              <span style={{ color: "var(--green)", userSelect: "none" }}>
                m.muneeb@portfolio:~${" "}
              </span>
              <span className="cursor" />
            </div>
          )}
        </div>
      </div>

      {/* Skills grid */}
      <div>
        <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 14 }}>
          <span style={{ color: "var(--green)" }}># </span>skills /
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {skills.map((s) => (
            <span
              key={s}
              style={{
                background: "var(--green-muted)",
                color: "var(--green)",
                border: "1px solid #004d2e",
                borderRadius: 4,
                padding: "4px 12px",
                fontSize: 12,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <p
        style={{
          color: "var(--muted)",
          fontSize: 12,
          marginTop: 56,
          animation: "blink 2s step-end infinite",
        }}
      >
        scroll down or run{" "}
        <span style={{ color: "var(--green)" }}>ls projects/</span>
      </p>
    </section>
  );
}
