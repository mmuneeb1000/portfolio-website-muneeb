import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setStatus("sending");

    try {
      const res = await fetch(
        "https://portfolio-website-muneeb.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (data.success) {
        setStatus("ok");
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error — are you running the server?");
    }
  };

  return (
    <section id="contact" className=" m-10">
      <div className="max-w-[560px] rounded-[10px] border bg-surface border-border px-9 py-8">
        <p className="mb-7 text-[13px] text-muted">
          <span className="text-green"># </span>
          Open to freelance, full-time roles, or just a good chat about web
          development.
        </p>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs text--muted">--name</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="your name"
            className="w-full rounded-md border bg-surface
            px-[14px] py-[10px] text-[13px] text-text border-border
            outline-none transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "var(--color-green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs text-[var(--muted)]">
            --email
          </label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-md border bg-surface
            px-[14px] py-[10px] text-[13px] text-text border-border
            outline-none transition-colors"
            onFocus={(e) => (e.target.style.borderColor = "var(--color-green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-xs text-[var(--muted)]">
            --message
          </label>

          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="what's on your mind?"
            className={`w-full rounded-md border bg-surface
            px-[14px] py-[10px] text-[13px] text-text border-border
            outline-none transition-colors resize-y`}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className="rounded-md border px-6 py-[10px] text-[13px] border-green text-green
          transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending"
            ? "$ sending..."
            : status === "ok"
              ? "✓ message sent"
              : "$ send message →"}
        </button>

        {status === "error" && (
          <p className="mt-3 text-xs text-[#f85149]">✗ {errMsg}</p>
        )}

        <div className="mt-8 flex gap-6 border-t pt-6 border-border">
          {[
            { label: "github", href: "https://github.com/mmuneeb1000" },
            {
              label: "linkedin",
              href: "https://www.linkedin.com/in/m-muneeb-a9984633b/",
            },
            { label: "twitter", href: "https://x.com/Kiwitourist" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted transition-colors hover:text-green"
            >
              ./{link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
