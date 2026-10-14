import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  FiSend,
  FiCheck,
  FiLoader,
  FiMail,
  FiTerminal,
  FiChevronDown,
  FiGlobe,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

const links = [
  {
    label: "whatsapp",
    href: "https://wa.me/923481157315",
  },
  {
    label: "github",
    href: "https://github.com/mmuneeb1000",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/m-muneeb-a9984633b/",
  },
  {
    label: "twitter",
    href: "https://x.com/Kiwitourist",
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/webdevpkstore",
  },
  {
    label: "instagram",
    href: "https://instagram.com/webdevstore",
  },
  {
    label: "tiktok",
    href: "https://www.tiktok.com/@web.dev.store",
  },
];

const services = [
  "Website development",
  "Website redesign",
  "WordPress maintenance",
  "Bug fixing and error resolution",
  "Website speed optimization",
  "Technical SEO and indexing",
  "Feature additions and integrations",
  "Ongoing maintenance",
  "Other",
];

const budgets = [
  "Under PKR 15,000 ($50)",
  "PKR 15,000–30,000 ($100)",
  "PKR 30,000–75,000 ($250)",
  "PKR 75,000–150,000 ($400)",
  "PKR 150,000+ ($600)",
  "Not sure yet",
];

const initialForm = {
  name: "",
  email: "",
  service: "",
  budget: "",
  website: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({});

  const textareaRef = useRef(null);

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
      y: 24,
      scale: 0.985,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.62,
        ease: [0.2, 0.72, 0.18, 1],
      },
    },
  };

  const inputClasses =
    "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-all duration-200 placeholder:text-muted/60 hover:border-green/60 focus:border-green focus:ring-2 focus:ring-green/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClasses = "mb-2 block text-xs font-medium text-muted";

  const isSending = status === "sending";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (status === "error") {
      setStatus(null);
      setErrMsg("");
    }

    if (name === "message" && textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = "auto";

      const lineHeight =
        parseFloat(getComputedStyle(textarea).lineHeight) || 24;

      const minHeight = lineHeight * 4;
      const maxHeight = lineHeight * 8;

      textarea.style.height = `${Math.min(
        Math.max(textarea.scrollHeight, minHeight),
        maxHeight,
      )}px`;

      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (form.name.trim().length > 100) {
      nextErrors.name = "Name must be 100 characters or fewer.";
    }

    const email = form.email.trim();

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (form.website.trim()) {
      try {
        const url = new URL(form.website.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid protocol");
        }
      } catch {
        nextErrors.website = "Enter a valid website URL, including https://.";
      }
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please describe your project.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Please provide at least 10 characters of detail.";
    } else if (form.message.trim().length > 5000) {
      nextErrors.message =
        "Please keep your description under 5,000 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setStatus(null);
    setErrMsg("");

    if (!validateForm()) {
      setStatus("error");
      setErrMsg("Please correct the highlighted fields.");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          budget: form.budget || "Not specified",
          website: form.website.trim() || "Not provided",
          message: form.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("ok");
      setForm(initialForm);
      setErrors({});

      if (textareaRef.current) {
        textareaRef.current.style.height = "";
        textareaRef.current.style.overflowY = "hidden";
      }

      // Keep the success message visible, then restore the form button.
      window.setTimeout(() => {
        setStatus((current) => (current === "ok" ? null : current));
      }, 4000);
    } catch (err) {
      console.error("Contact form submission failed:", err);

      setStatus("error");
      setErrMsg(
        "Unable to send your inquiry. Please try again or contact me directly.",
      );
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-xs text-[#f85149]">
        {errors[name]}
      </p>
    ) : null;

  const errorProps = (name) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="p-6 lg:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.22,
          margin: "0px 0px -8% 0px",
        }}
        className="mx-auto max-w-4xl"
      >
        <motion.div variants={revealVariants} className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-green">
            <FiTerminal />
            <span>contact.sh</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Let's build something.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-[15px]">
            Need a new website, a redesign, or help fixing an existing one? Tell
            me what you're working on and I'll help you figure out the next
            steps.
          </p>
        </motion.div>

        <motion.div
          variants={revealVariants}
          className="overflow-hidden rounded-xl border border-border bg-surface2 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-green/60" />
            </div>

            <div className="flex items-center gap-2 text-xs text-muted">
              <FiMail />
              <span>project-inquiry</span>
            </div>
          </div>

          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSending}
            className="p-5 md:p-7"
          >
            <motion.div
              variants={revealVariants}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <label htmlFor="name" className={labelClasses}>
                  <span className="text-green">$</span> name *
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  disabled={isSending}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClasses}
                  {...errorProps("name")}
                />

                {fieldError("name")}
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  <span className="text-green">$</span> email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={isSending}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClasses}
                  {...errorProps("email")}
                />

                {fieldError("email")}
              </div>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <label htmlFor="service" className={labelClasses}>
                  <span className="text-green">$</span> service *
                </label>

                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    required
                    disabled={isSending}
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none pr-10 ${
                      !form.service ? "text-muted/60" : ""
                    }`}
                    {...errorProps("service")}
                  >
                    <option value="" disabled>
                      What do you need help with?
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  <FiChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>

                {fieldError("service")}
              </div>

              <div>
                <label htmlFor="budget" className={labelClasses}>
                  <span className="text-green">$</span> budget
                </label>

                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    disabled={isSending}
                    value={form.budget}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none pr-10 ${
                      !form.budget ? "text-muted/60" : ""
                    }`}
                  >
                    <option value="">Select a budget (optional)</option>

                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>

                  <FiChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>

                <p className="mt-1.5 text-xs leading-5 text-muted">
                  Small fixes and maintenance are assessed by scope.
                </p>
              </div>
            </motion.div>

            <motion.div variants={revealVariants} className="mt-5">
              <label htmlFor="website" className={labelClasses}>
                <span className="text-green">$</span> existing website
                <span className="ml-2 font-normal opacity-60">(optional)</span>
              </label>

              <div className="relative">
                <FiGlobe
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  maxLength={2048}
                  disabled={isSending}
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className={`${inputClasses} pl-10`}
                  {...errorProps("website")}
                />
              </div>

              {fieldError("website")}
            </motion.div>

            <motion.div variants={revealVariants} className="mt-5">
              <label htmlFor="message" className={labelClasses}>
                <span className="text-green">$</span> project details *
              </label>

              <textarea
                ref={textareaRef}
                id="message"
                name="message"
                rows={4}
                minLength={10}
                maxLength={5000}
                required
                disabled={isSending}
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your project, the problem you're facing, or the changes you need..."
                className={`${inputClasses} resize-none overflow-y-hidden leading-6`}
                {...errorProps("message")}
              />

              {fieldError("message")}

              <p className="mt-1.5 text-right text-xs text-muted">
                {form.message.length}/5000
              </p>
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={!isSending ? { y: -2 } : undefined}
                whileTap={!isSending ? { scale: 0.98 } : undefined}
                transition={{ duration: 0.15 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSending ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Sending...
                  </>
                ) : status === "ok" ? (
                  <>
                    <FiCheck />
                    Message sent
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send inquiry
                  </>
                )}
              </motion.button>

              <p className="text-xs text-muted">
                Usually responds within 24 hours.
              </p>
            </motion.div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mt-5 rounded-md border border-[#f85149]/30 bg-[#f85149]/5 px-4 py-3 text-sm text-[#f85149]"
              >
                {errMsg}
              </motion.div>
            )}

            {status === "ok" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mt-5 rounded-md border border-green/30 bg-green/5 px-4 py-3 text-sm text-green"
              >
                Inquiry sent successfully. I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-3 md:flex md:gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-green focus:text-green focus:outline-none"
            >
              ./{link.label}
            </a>
          ))}

          <a href="mailto:contact@webdevpk.store" className="text-xs">
            contact@webdevpk.store
          </a>
        </div>
      </motion.div>
    </section>
  );
}
