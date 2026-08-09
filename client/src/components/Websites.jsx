import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import RepositoryCard from "./Card";
import websitesData from "../data/websites.json";

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
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWebsites(websitesData);
    setLoading(false);
  }, []);

  return (
    <section id="websites" className="px-2 py-8 md:px-4 md:py-12">
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
          ~/websites
        </motion.p>

        {loading ? (
          <motion.p variants={revealVariants} className="text-muted">
            fetching...
          </motion.p>
        ) : (
          <motion.div variants={containerVariants}>
            <motion.div
              variants={revealVariants}
              className="mb-2 hidden grid-cols-[80px_60px_1fr_120px] gap-4 px-4 text-xs text-muted md:grid"
            >
              <span>perms</span>
              <span>size</span>
              <span>name</span>
              <span className="text-right">modified</span>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-3"
            >
              {websites.map((website) => (
                <motion.div key={website.id} variants={revealVariants}>
                  <RepositoryCard item={website} />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mt-3 text-xs text-muted"
            >
              {websites.length} directories
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
