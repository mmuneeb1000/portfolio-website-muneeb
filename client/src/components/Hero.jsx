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

  useEffect(() => {
    const next = lines[typingIndex];

    if (!next) return;

    const t = setTimeout(() => {
      setVisibleLines((prev) => [...prev, { ...next, typing: true }]);
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
    <section className="px-6 py-20">
      <div className="mb-12 overflow-hidden rounded-[10px] border border-border bg-surface">
        <div className="flex items-center gap-2 border-b bg-surface2 border-border px-4 py-2.5">
          {["#ff5f57", "#ffbd2e", "#28ca41"].map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-full"
              style={{ background: c }}
            />
          ))}

          <span className="ml-2 text-xs text-muted">
            portfolio — zsh — 80×24
          </span>
        </div>

        <div className="min-h-[200px] p-6 md:px-7">
          {visibleLines.map((line, i) => (
            <div key={i} className="mb-1">
              <div>
                <span className="select-none text-green">
                  muneeb@portfolio:~${" "}
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
                <div className="mb-2 text-text">{line.output}</div>
              )}
            </div>
          ))}

          {typingIndex >= lines.length && (
            <div>
              <span className="select-none text-green">
                muneeb@portfolio:~${" "}
              </span>
              <span className="cursor" />
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="mb-3.5 text-xs text-muted">
          <span className="text-green"># </span>
          skills /
        </p>

        <div className="flex flex-wrap justify-center gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded border px-3 py-1 text-xs bg-green-muted text-green border-[#004d2e]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <p
        className="mt-10 text-xs text-muted"
        style={{
          animation: "blink 2s step-end infinite",
        }}
      >
        scroll down or run
        <span className="text-green"> ls projects/</span>
      </p>
    </section>
  );
}
