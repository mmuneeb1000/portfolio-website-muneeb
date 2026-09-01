import { motion } from "motion/react";
import { FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    question: "Can you host and launch my website?",
    answer:
      "Yes. I can set up hosting, connect your domain, configure SSL, handle redirects, and make sure the site is ready for visitors.",
  },
  {
    question: "Do you maintain existing websites?",
    answer:
      "Yes. Maintenance can include content updates, bug fixes, responsive repairs, speed checks, WordPress support, and small feature improvements.",
  },
  {
    question: "Can you redesign an old website without rebuilding everything?",
    answer:
      "Yes. I can improve layout, spacing, mobile experience, visuals, and messaging while keeping useful existing content and structure where it makes sense.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "My core stack includes WordPress, PHP, React, Next.js, Node.js, Express, MongoDB, Supabase, TypeScript, Tailwind CSS, REST APIs, and OpenAI API integrations.",
  },
  {
    question: "Can you build a full web app?",
    answer:
      "Yes. I build frontend interfaces, dashboards, forms, API-connected apps, database-backed products, and SaaS-style tools.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Send your website link, idea, or project scope through the contact form. I can review what you need and suggest the clearest next step.",
  },
];

export default function FAQ() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="faq" className="px-2 py-8 md:px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-sm text-green">~/faq</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Quick answers for hosting, maintenance, redesigns, and custom web
            development work.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.16,
            margin: "0px 0px -8% 0px",
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          {faqs.map((faq) => (
            <motion.article
              key={faq.question}
              variants={itemVariants}
              className="repo-card rounded-xl border border-border bg-surface p-5"
            >
              <div className="mb-3 flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-green/25 bg-green/10 text-green">
                  <FiHelpCircle aria-hidden="true" />
                </span>

                <h3 className="text-base font-semibold leading-6 text-text">
                  {faq.question}
                </h3>
              </div>

              <p className="text-sm leading-6 text-muted">{faq.answer}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
