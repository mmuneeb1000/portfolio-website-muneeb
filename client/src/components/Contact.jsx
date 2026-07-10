import React, { useState } from "react";

const inputClass =
  "w-full rounded-md border bg-[var(--surface)] px-[14px] py-[10px] text-[13px] text-[var(--text)] outline-none transition-colors";

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
      <div
        className="max-w-[560px] rounded-[10px] border bg-[var(--surface)] px-9 py-8"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="mb-7 text-[13px] text-[var(--muted)]">
          <span className="text-[var(--green)]"># </span>
          Open to freelance, full-time roles, or just a good chat about web
          development.
        </p>

        <div className="mb-4">
          <label className="mb-1.5 block text-xs text-[var(--muted)]">
            --name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="your name"
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
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
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
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
            className={`${inputClass} resize-y`}
            style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          className="rounded-md border px-6 py-[10px] text-[13px] transition-all disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: status === "ok" ? "var(--green-muted)" : "transparent",
            borderColor: "var(--green)",
            color: "var(--green)",
          }}
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

        <div
          className="mt-8 flex gap-6 border-t pt-6"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { label: "github", href: "https://github.com" },
            { label: "linkedin", href: "https://linkedin.com" },
            { label: "twitter", href: "https://twitter.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--muted)] transition-colors hover:text-[var(--green)]"
            >
              ./{link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
