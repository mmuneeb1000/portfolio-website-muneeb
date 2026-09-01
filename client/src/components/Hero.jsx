import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const lines = [
  {
    prompt: "whoami",
    output: "M. Muneeb",
  },
  {
    prompt: "cat role.txt",
    output: "Web Developer building modern web applications",
  },
  {
    prompt: "stack --current",
    output:
      "PHP • WordPress • React • Next.js • Node.js • Express • MongoDB • Supabase • Tailwind CSS",
  },
  {
    prompt: "tools --list",
    output: "Vite • Git • REST APIs • OpenAI API • EmailJS • Figma",
  },
  {
    prompt: "ls projects/",
    output:
      "CloserKit • Frontpage • Portfolio • Weather • Currency • IP-Tracker",
  },
  {
    prompt: "cat experience.md",
    output: "5+ years building websites, dashboards and SaaS applications",
  },
  {
    prompt: "echo $STATUS",
    output: "Open to projects and collaborations.",
  },
];

const skills = [
  "WordPress",
  "PHP",
  "MERN",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Supabase",
  "Tailwind CSS",
  "Vite",
  "REST APIs",
  "OpenAI API",
  "Git",
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

function TerminalLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="mt-2 flex items-center gap-2 font-mono text-[13px] md:text-sm"
    >
      <span className="select-none text-green">webdevpk@store:~$</span>

      <span className="flex items-center gap-1">
        {[0, 0.15, 0.3].map((delay, index) => (
          <motion.span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-green"
            animate={{
              opacity: [0.25, 1, 0.25],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
    </motion.div>
  );
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
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    const next = lines[typingIndex];

    if (!next) return;

    const timeout = setTimeout(
      () => {
        setVisibleLines((prev) => [
          ...prev,
          {
            ...next,
            typing: true,
            showOutput: false,
          },
        ]);
      },
      typingIndex === 0 ? 500 : 180,
    );

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

      const hasNextLine = index < lines.length - 1;

      if (!hasNextLine) {
        setTimeout(() => {
          setTypingIndex(lines.length);
        }, 300);

        return;
      }

      setLoadingNext(true);

      setTimeout(() => {
        setLoadingNext(false);
        setTypingIndex((prev) => prev + 1);
      }, 650);
    }, 120);
  }

  return (
    <section className="relative px-4 py-8 md:px-6 lg:py-12">
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-2 lg:items-stretch">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center p-5 md:p-7 lg:p-8"
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
            M.Muneeb
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mt-4 font-mono text-sm text-green md:text-base"
          >
            Web Developer
          </motion.p>

          <motion.p
            variants={revealVariants}
            className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base"
          >
            I build and ship websites, web applications and SaaS products, from
            interface and CMS work to APIs, authentication and deployment.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="mt-7 flex flex-wrap gap-3"
          >
            <motion.a
              href="#websites"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                rounded-md border border-green
                bg-green px-5 py-2.5
                text-sm font-medium text-surface
                transition-opacity hover:opacity-90
              "
            >
              View Websites
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
              <p className="text-xl font-semibold text-text md:text-2xl">30+</p>

              <p className="mt-1 text-[11px] text-muted md:text-xs">Projects</p>
            </div>

            <div className="pl-4">
              <p className="text-xl font-semibold text-text md:text-2xl">
                FE | BE
              </p>

              <p className="mt-1 text-[11px] text-muted md:text-xs">
                Build Range
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
              flex min-h-[360px] w-full flex-col
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

              <AnimatePresence>
                {loadingNext && <TerminalLoader />}
              </AnimatePresence>

              {typingIndex >= lines.length && !loadingNext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  <span className="select-none text-green">
                    webdevpk@store:~${" "}
                  </span>

                  <motion.span
                    className="inline-block h-[1em] w-[7px] translate-y-[2px] bg-green"
                    animate={{
                      opacity: [1, 1, 0, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </div>

            <div className="border-t border-border bg-surface2/60 px-5 py-3 font-mono text-[11px] md:px-7">
              <span className="text-green">webdevpk@store:~$ </span>

              <span className="text-muted">
                {loadingNext ? "processing..." : "ls projects/"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
