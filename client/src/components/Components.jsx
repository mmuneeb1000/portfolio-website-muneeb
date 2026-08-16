import { motion } from "motion/react";
import RepositoryCard from "./Card";
import projects from "../data/components.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.09,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: [0.2, 0.72, 0.18, 1],
    },
  },
};

export default function Components() {
  return (
    <section id="components" className="px-2 py-8 md:px-4 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={revealVariants} className="mb-5">
          <p className="text-sm text-green">~/components</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Reusable UI Components
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Focused interface pieces and layout patterns built for responsive,
            accessible, and reusable frontend work.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={revealVariants}
              className="min-w-0"
            >
              <RepositoryCard item={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p variants={revealVariants} className="mt-3 text-xs text-muted">
          {projects.length} directories
        </motion.p>
      </motion.div>
    </section>
  );
}
