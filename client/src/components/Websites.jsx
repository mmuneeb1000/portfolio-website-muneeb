import { motion } from "motion/react";
import RepositoryCard from "./Card";
import websites from "../data/websites.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function Websites() {
  return (
    <section id="websites" className="px-2 py-8 md:px-4 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl"
      >
        <motion.p variants={revealVariants} className="mb-5 text-sm text-green">
          ~/websites
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {websites.map((website) => (
            <motion.div
              key={website.id}
              variants={revealVariants}
              className="min-w-0"
            >
              <RepositoryCard item={website} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p variants={revealVariants} className="mt-3 text-xs text-muted">
          {websites.length} directories
        </motion.p>
      </motion.div>
    </section>
  );
}
