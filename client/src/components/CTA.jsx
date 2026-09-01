import { motion } from "motion/react";
import { FiArrowRight, FiCheckCircle, FiMail, FiTerminal } from "react-icons/fi";

const highlights = [
  "Hosting and launch support",
  "Ongoing website maintenance",
  "Redesigns for outdated websites",
  "Custom React, Next.js, WordPress, and PHP development",
];

export default function CTA() {
  return (
    <section id="start-project" className="px-2 py-8 md:px-4 md:py-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.24,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="repo-card mx-auto overflow-hidden rounded-xl border border-border bg-surface"
      >
        <div className="flex items-center justify-between border-b border-border bg-surface2 px-5 py-3 md:px-7">
          <div className="flex items-center gap-2 text-sm text-green">
            <FiTerminal />
            <span>~/start-project</span>
          </div>

          <div className="hidden items-center gap-2 text-xs text-muted sm:flex">
            <FiMail />
            <span>project-inquiry</span>
          </div>
        </div>

        <div className="grid gap-7 p-5 md:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
              Ready to improve your website?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-[15px]">
              Share your current website, project goals, or launch requirements.
              I can help define the right scope and deliver a clean,
              production-ready solution.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-green bg-green px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
              >
                Request a Quote
                <FiArrowRight aria-hidden="true" />
              </motion.a>

              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface2 px-5 py-2.5 text-sm text-text transition-colors hover:border-green hover:text-green"
              >
                Review Services
              </motion.a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface2 p-5">
            <p className="mb-4 font-mono text-xs text-muted">
              <span className="text-green">$</span> services available
            </p>

            <div className="space-y-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <FiCheckCircle
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-green"
                  />
                  <span className="text-sm leading-6 text-muted">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
