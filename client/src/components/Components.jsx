import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import RepositoryCard from "./Card";
import componentsInfo from "../data/components.json";

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

export default function Components() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(componentsInfo);
    setLoading(false);
  }, []);

  return (
    <section id="components" className="px-2 py-8 md:px-4 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="mx-auto max-w-7xl"
      >
        <motion.p variants={revealVariants} className="mb-5 text-sm text-green">
          ~/components
        </motion.p>

        {loading ? (
          <motion.p variants={revealVariants} className="text-muted">
            fetching...
          </motion.p>
        ) : (
          <motion.div variants={containerVariants}>
            <motion.div
              variants={containerVariants}
              className=" grid md:grid-cols-2 gap-3"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={revealVariants}>
                  <RepositoryCard item={project} />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mt-3 text-xs text-muted"
            >
              {projects.length} directories
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
