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
      "PHP • Wordpress • React • Next.js • Node.js • Express • MongoDB • Supabase • Tailwind CSS",
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
    output: "Open to projects and collaborations.",
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
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
    <section className="px-4 py-8 md:px-6 lg:py-12">
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative max-w-[1200px] mx-auto z-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
              flex flex-col justify-center
              p-5
              md:p-7
              lg:p-8
            "
        >
          <motion.div
            variants={revealVariants}
            className="mb-6 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="font-mono text-xs text-green">~/portfolio</span>
          </motion.div>

          <motion.h1
            variants={revealVariants}
            className="text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl"
          >
            M. Muneeb
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mt-4 font-mono text-sm text-green md:text-base"
          >
            Frontend Developer
          </motion.p>

          <motion.p
            variants={revealVariants}
            className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base"
          >
            I build modern web applications, responsive interfaces, dashboards,
            and SaaS products using modern JavaScript technologies.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="mt-7 flex flex-wrap gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                  rounded-md border border-green
                  bg-green px-5 py-2.5
                  text-sm font-medium text-surface
                  transition-opacity hover:opacity-90
                "
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                  rounded-md border border-border
                  bg-surface px-5 py-2.5
                  text-sm text-text
                  transition-colors
                  hover:border-green hover:text-green
                "
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="
                mt-8 grid grid-cols-3
                border-y border-border
                py-5
              "
          >
            <div>
              <p className="text-xl font-semibold text-text md:text-2xl">5+</p>
              <p className="mt-1 text-[11px] text-muted md:text-xs">
                Years Experience
              </p>
            </div>

            <div className="border-x border-border px-4">
              <p className="text-xl font-semibold text-text md:text-2xl">20+</p>
              <p className="mt-1 text-[11px] text-muted md:text-xs">Projects</p>
            </div>

            <div className="pl-4">
              <p className="text-xl font-semibold text-text md:text-2xl">∞</p>
              <p className="mt-1 text-[11px] text-muted md:text-xs">
                Things to Build
              </p>
            </div>
          </motion.div>

          <motion.div variants={revealVariants} className="mt-8">
            <p className="mb-3 font-mono text-xs text-muted">
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
                  transition={{
                    duration: 0.15,
                  }}
                  className="
                      rounded-md border border-border
                      bg-green-muted
                      px-2.5 py-1.5
                      text-[11px] text-green
                      transition-colors
                      hover:border-green
                    "
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
            x: 32,
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
          className="flex"
        >
          <div
            className="
                flex min-h-[430px] w-full flex-col
                overflow-hidden rounded-2xl
                border border-border
                bg-surface
              "
          >
            <div
              className="
                  flex items-center justify-between
                  border-b border-border
                  bg-surface2
                  px-4 py-3
                "
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28ca41]" />
              </div>

              <span className="font-mono text-[11px] text-muted">
                portfolio — zsh
              </span>
            </div>

            <div className="flex-1 p-5 font-mono text-[13px] leading-6 md:p-7 md:text-sm">
              {visibleLines.map((line, i) => (
                <div key={`${line.prompt}-${i}`} className="mb-2">
                  <div className="break-words">
                    <span className="select-none text-green">
                      webdevpk@store:~${" "}
                    </span>

                    {line.typing ? (
                      <TypedLine
                        text={line.prompt}
                        onDone={() => handlePromptDone(i)}
                      />
                    ) : (
                      <span className="text-text">{line.prompt}</span>
                    )}
                  </div>

                  {line.showOutput && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -3,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="mt-0.5 break-words text-muted"
                    >
                      {line.output}
                    </motion.div>
                  )}
                </div>
              ))}

              {typingIndex >= lines.length && (
                <div className="mt-2">
                  <span className="select-none text-green">
                    webdevpk@store:~${" "}
                  </span>
                  <span className="cursor" />
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface2/60 px-5 py-3 font-mono text-[11px] md:px-7">
              <span className="text-green">webdevpk@store:~$ </span>
              <span className="text-muted">ls projects/</span>
              <span className="cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
