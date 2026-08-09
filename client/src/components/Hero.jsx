import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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

function TypedLine({ text, speed = 40, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setDisplayed("");

    let i = 0;

    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(id);
        onDoneRef.current?.();
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const next = lines[typingIndex];

    if (!next) return;

    const timeout = setTimeout(() => {
      setVisibleLines((prev) => [
        ...prev,
        {
          ...next,
          typing: true,
        },
      ]);
    }, next.delay);

    return () => clearTimeout(timeout);
  }, [typingIndex]);

  function handlePromptDone(index) {
    setTimeout(() => {
      setVisibleLines((prev) =>
        prev.map((line, lineIndex) =>
          lineIndex === index
            ? {
                ...line,
                typing: false,
                showOutput: true,
              }
            : line,
        ),
      );

      setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 200);
    }, 120);
  }

  return (
    <section className="p-6 md:px-8 lg:py-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={revealVariants}
            className="mb-5 text-sm text-green"
          >
            ~/portfolio
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="text-5xl font-bold tracking-tightest text-text md:text-6xl"
          >
            M.Muneeb
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mt-4 text-xl text-green"
          >
            Frontend Developer
          </motion.p>

          <motion.p
            variants={revealVariants}
            className="mt-6 max-w-xl text-base leading-7 text-muted"
          >
            I build modern web applications, responsive interfaces, dashboards,
            and SaaS products using modern JavaScript technologies.
          </motion.p>

          <motion.div variants={revealVariants} className="mt-8 flex gap-3">
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded border border-green bg-green px-4 py-2 text-sm text-surface"
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded border border-border px-4 py-2 text-sm text-text transition hover:border-green hover:text-green"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6"
          >
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
          </motion.div>

          <motion.div variants={revealVariants} className="mt-10">
            <p className="mb-3 text-xs text-muted">
              <span className="text-green"># </span>
              skills /
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                  }}
                  className="tech-pill rounded border border-[#004d2e] bg-green-muted px-3 py-1 text-xs text-green"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="overflow-hidden rounded-[10px] border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border bg-surface2 px-4 py-2.5">
              {["#ff5f57", "#ffbd2e", "#28ca41"].map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full"
                  style={{ background: color }}
                />
              ))}

              <span className="ml-2 text-xs text-muted">
                portfolio — zsh — 80×24
              </span>
            </div>

            <div className="min-h-[300px] p-4 md:p-6 md:px-7">
              {visibleLines.map((line, i) => (
                <div key={`${line.prompt}-${i}`} className="mb-1">
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
                    <motion.div
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-2 text-[14px] text-text"
                    >
                      {line.output}
                    </motion.div>
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
        </motion.div>
      </div>
    </section>
  );
}
