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
      "Set up, deploy, and connect websites so they are live, stable, secure, and ready for real visitors.",
    points: ["Domain setup", "Netlify/Vercel hosting", "SSL and redirects"],
  },
  {
    title: "Website Maintenance",
    icon: FiRefreshCw,
    command: "maintain --monthly",
    description:
      "Keep existing websites healthy with updates, bug fixes, content edits, backups, and performance checks.",
    points: ["Bug fixes", "Content updates", "Speed checks"],
  },
  {
    title: "Website Redesign",
    icon: FiEdit3,
    command: "redesign --modern",
    description:
      "Refresh outdated pages with cleaner layouts, stronger messaging, responsive design, and a more professional feel.",
    points: ["UI cleanup", "Mobile redesign", "Conversion-focused pages"],
  },
  {
    title: "WordPress & PHP Work",
    icon: FiServer,
    command: "wp --custom",
    description:
      "Build or improve WordPress sites, custom PHP features, REST API connections, and content-driven websites.",
    points: ["WordPress setup", "PHP fixes", "CMS integrations"],
  },
  {
    title: "React & Next.js Development",
    icon: FiCode,
    command: "build --frontend",
    description:
      "Create modern interfaces, landing pages, dashboards, and full web apps using React, Next.js, and Tailwind CSS.",
    points: ["React apps", "Next.js pages", "Tailwind UI"],
  },
  {
    title: "Backend & API Integration",
    icon: FiCpu,
    command: "connect --api",
    description:
      "Connect frontend products to databases, authentication, third-party APIs, OpenAI features, and server routes.",
    points: ["Node/Express", "MongoDB/Supabase", "OpenAI API"],
  },
  {
    title: "Frontend Fixes & Improvements",
    icon: FiTool,
    command: "patch --frontend",
    description:
      "Repair broken layouts, improve responsiveness, clean up components, and smooth out rough user experiences.",
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
            Clear Web Services
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Hosting, maintenance, redesigns, and custom development backed by
            the same stack used across my websites, dashboards, publishing
            platforms, and SaaS-style projects.
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
