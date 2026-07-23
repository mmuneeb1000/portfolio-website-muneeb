import React, { useState } from "react";
import { FiSend, FiCheck, FiLoader } from "react-icons/fi";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (status === "error") {
      setStatus(null);
      setErrMsg("");
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

      setTimeout(() => {
        setStatus(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrMsg("Failed to send your message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-20"
      aria-labelledby="contact-heading"
    >
      <div className="rounded-xl border border-border bg-surface p-8">
        <h2 id="contact-heading" className="mb-2 text-3xl font-bold text-text">
          Contact
        </h2>

        <p className="mb-8 text-sm text-muted">
          Open to freelance, full-time roles, or just a good chat about web
          development.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={status === "sending"}
        >
          <div className="mb-4">
            <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
              --name
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
              className="w-full rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] text-text outline-none transition-colors focus:border-green disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
              --email
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
              className="w-full rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] text-text outline-none transition-colors focus:border-green disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-1.5 block text-xs text-muted"
            >
              --message
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              required
              disabled={status === "sending"}
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              aria-invalid={status === "error" && !form.message.trim()}
              className="w-full resize-y rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] text-text outline-none transition-colors focus:border-green disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center gap-2 rounded-md border border-green px-6 py-[10px] text-[13px] text-green transition-all hover:bg-green hover:text-bg disabled:cursor-not-allowed disabled:opacity-60"
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
          </button>

          {status === "error" && (
            <p role="alert" className="mt-4 text-sm text-[#f85149]">
              {errMsg}
            </p>
          )}

          {status === "ok" && (
            <p role="status" className="mt-4 text-sm text-green">
              Thanks! Your message has been sent successfully.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
