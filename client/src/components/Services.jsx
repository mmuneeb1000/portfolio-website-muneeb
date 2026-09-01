import { motion } from "motion/react";
import {
  FiCloud,
  FiCode,
  FiCpu,
  FiEdit3,
  FiRefreshCw,
  FiServer,
  FiTool,
} from "react-icons/fi";

const skillset = [
  "WordPress",
  "PHP",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Supabase",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "OpenAI API",
];

const services = [
  {
    title: "Website Hosting & Launch",
    icon: FiCloud,
    command: "deploy --live",
    description:
      "Production deployment for business websites, including hosting configuration, domain connection, SSL, and launch checks.",
    points: ["Domain setup", "Hosting configuration", "SSL and redirects"],
  },
  {
    title: "Website Maintenance",
    icon: FiRefreshCw,
    command: "maintain --monthly",
    description:
      "Ongoing support to keep your website secure, current, and reliable after launch.",
    points: ["Content updates", "Bug fixes", "Performance checks"],
  },
  {
    title: "Website Redesign",
    icon: FiEdit3,
    command: "redesign --modern",
    description:
      "Modern redesigns for outdated websites, focused on stronger presentation, clearer messaging, and improved mobile experience.",
    points: ["Visual refresh", "Mobile improvements", "Conversion pages"],
  },
  {
    title: "WordPress & PHP Work",
    icon: FiServer,
    command: "wp --custom",
    description:
      "Custom WordPress and PHP development for content-managed websites, integrations, fixes, and structured publishing workflows.",
    points: ["WordPress setup", "PHP fixes", "CMS integrations"],
  },
  {
    title: "React & Next.js Development",
    icon: FiCode,
    command: "build --frontend",
    description:
      "Production-ready frontend development for responsive websites, dashboards, landing pages, and application interfaces.",
    points: ["React apps", "Next.js pages", "Tailwind UI"],
  },
  {
    title: "Backend & API Integration",
    icon: FiCpu,
    command: "connect --api",
    description:
      "Database, authentication, server route, and third-party API integration for websites and web applications.",
    points: ["Node/Express", "MongoDB/Supabase", "OpenAI API"],
  },
  {
    title: "Frontend Fixes & Improvements",
    icon: FiTool,
    command: "patch --frontend",
    description:
      "Targeted improvements for broken layouts, inconsistent styling, slow pages, and rough user experiences.",
    points: ["Responsive fixes", "Code cleanup", "UI polish"],
  },
];

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.2, 0.72, 0.18, 1],
      },
    },
  };

  return (
    <section id="services" className="px-2 py-8 md:px-4 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-sm text-green">~/services</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text md:text-3xl">
            Web Development Services
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Production-focused website services for businesses that need a
            reliable launch, ongoing support, a cleaner redesign, or a custom
            web product built with a modern stack.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {skillset.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-green/20 bg-green-muted px-2.5 py-1 text-[11px] text-green"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.18,
            margin: "0px 0px -8% 0px",
          }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                className="repo-card flex min-h-full flex-col rounded-xl border border-border bg-surface p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-green/25 bg-green/10 text-green">
                    <Icon aria-hidden="true" className="text-xl" />
                  </div>

                  <span className="rounded-md border border-border bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted">
                    {service.command}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <span
                      key={point}
                      className="tech-pill rounded-md border border-border bg-surface2 px-2.5 py-1 text-xs text-muted"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
