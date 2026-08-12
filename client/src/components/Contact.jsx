import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { FiSend, FiCheck, FiLoader, FiMail, FiTerminal } from "react-icons/fi";
import emailjs from "@emailjs/browser";
const links = [
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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (status === "error") {
      setStatus(null);
      setErrMsg("");
    }

    if (e.target.name === "message") {
      const textarea = e.target;

      textarea.style.height = "auto";

      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrMsg("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setStatus("error");
      setErrMsg("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrMsg("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("ok");

      setForm({
        name: "",
        email: "",
        message: "",
      });

      if (textareaRef.current) {
        textareaRef.current.style.height = "";
        textareaRef.current.style.overflowY = "hidden";
      }

      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrMsg("Failed to send your message. Please try again.");
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const inputClasses =
    "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition-all duration-200 placeholder:text-muted/60 hover:border-green/60 focus:border-green focus:ring-2 focus:ring-green/10 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <section id="contact" className="p-6 lg:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
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
            Open to freelance projects and web development opportunities. Send
            over your project scope, requirements, or anything you'd like to
            discuss.
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
              <span>new-message</span>
            </div>
          </div>

          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={status === "sending"}
            className="p-5 md:p-7"
          >
            <motion.div
              variants={revealVariants}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-muted"
                >
                  <span className="text-green">$</span> name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={status === "sending"}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={status === "error" && !form.name.trim()}
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-muted"
                >
                  <span className="text-green">$</span> email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={status === "sending"}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={
                    status === "error" &&
                    (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                  }
                  className={inputClasses}
                />
              </div>
            </motion.div>

            <motion.div variants={revealVariants} className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium text-muted"
              >
                <span className="text-green">$</span> message
              </label>

              <textarea
                ref={textareaRef}
                id="message"
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                aria-invalid={status === "error" && !form.message.trim()}
                className={`${inputClasses} resize-none overflow-y-hidden leading-6`}
              />
            </motion.div>

            <motion.div
              variants={revealVariants}
              className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={
                  status !== "sending"
                    ? {
                        y: -2,
                      }
                    : undefined
                }
                whileTap={
                  status !== "sending"
                    ? {
                        scale: 0.98,
                      }
                    : undefined
                }
                transition={{
                  duration: 0.15,
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? (
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
                    Send message
                  </>
                )}
              </motion.button>

              <p className="text-xs text-muted">
                Usually responds within 24 hours.
              </p>
            </motion.div>

            {status === "error" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                role="alert"
                className="mt-5 rounded-md border border-[#f85149]/30 bg-[#f85149]/5 px-4 py-3 text-sm text-[#f85149]"
              >
                {errMsg}
              </motion.div>
            )}

            {status === "ok" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                role="status"
                className="mt-5 rounded-md border border-green/30 bg-green/5 px-4 py-3 text-sm text-green"
              >
                Message sent successfully. I'll get back to you soon.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
        <div className="grid grid-cols-3 md:flex gap-2 md:gap-6 mt-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-xs hover:text-green focus:text-green focus:outline-none"
            >
              ./{link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
