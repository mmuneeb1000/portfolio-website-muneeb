import React, { useState, useEffect } from "react";

const lines = [
  {
    prompt: "whoami",
    delay: 400,
    output: "M. Muneeb",
  },
  {
    prompt: "cat role.txt",
    delay: 1200,
    output: "Frontend Developer building modern web applications",
  },
  {
    prompt: "stack --current",
    delay: 2000,
    output:
      "React • Next.js • Node.js • Express • MongoDB • Supabase • Tailwind CSS",
  },
  {
    prompt: "tools --list",
    delay: 2800,
    output: "Vite • Git • REST APIs • OpenAI API • EmailJS • Figma",
  },
  {
    prompt: "ls projects/",
    delay: 3600,
    output:
      "CloserKit • Frontpage • Portfolio • Weather • Currency • IP-Tracker",
  },
  {
    prompt: "cat experience.md",
    delay: 4400,
    output: "5+ years building websites, dashboards and SaaS applications",
  },
  {
    prompt: "echo $STATUS",
    delay: 5200,
    output: "Open to interesting projects and collaborations.",
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
    "WordPress",
    "PHP",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Supabase",
    "Tailwind CSS",
    "Vite",
    "REST APIs",
    "OpenAI API",
    "Git",
    "Figma",
    "Responsive UI",
  ];

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center py-12">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT: PROFILE */}
        <div>
          <p className="mb-4 font-mono text-sm text-green">
            <span className="text-muted">~/</span>portfolio
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-text md:text-6xl">
            M. Muneeb
          </h1>

          <p className="mt-4 text-xl text-green">Frontend Developer</p>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            I build modern web applications, responsive interfaces, dashboards,
            and SaaS products using modern JavaScript technologies.
          </p>

          <div className="mt-8 flex gap-3">
            <a
              href="#projects"
              className="rounded border border-green bg-green px-4 py-2 text-sm text-surface"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded border border-border px-4 py-2 text-sm text-text transition hover:border-green hover:text-green"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            <div>
              <p className="text-2xl font-semibold text-text">5+</p>
              <p className="mt-1 text-xs text-muted">Years Experience</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-text">20+</p>
              <p className="mt-1 text-xs text-muted">Projects</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-text">∞</p>
              <p className="mt-1 text-xs text-muted">Things to Build</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs text-muted">
              <span className="text-green"># </span>
              skills /
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="tech-pill rounded border px-3 py-1 text-xs bg-green-muted text-green border-[#004d2e]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: TERMINAL */}
        <div>
          <div className="overflow-hidden rounded-[10px] border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border bg-surface2 px-4 py-2.5">
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

            <div className="min-h-[300px] p-4 md:p-6 md:px-7">
              {visibleLines.map((line, i) => (
                <div key={i} className="mb-1">
                  <div>
                    <span className="select-none text-green">
                      webdevpk@store:~${" "}
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
                    <div className="mb-2 text-text text-[14px]">
                      {line.output}
                    </div>
                  )}
                </div>
              ))}

              {typingIndex >= lines.length && (
                <div>
                  <span className="select-none text-green">
                    webdevpk@store:~${" "}
                  </span>
                  <span className="cursor" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-xs">
            <span className="text-green">webdevpk@store:~$ </span>
            <span className="text-muted">ls projects/</span>
            <span className="cursor" />
          </div>
        </div>
      </div>
    </section>
  );
}
