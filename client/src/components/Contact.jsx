import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 6,
  padding: "10px 14px",
  color: "var(--text)",
  fontFamily: "var(--font)",
  fontSize: 13,
  outline: "none",
  transition: "border-color 0.2s",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (data.success) {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
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
    <section
      id="contact"
      className="section"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="section-header" data-cmd="./contact.sh" />

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "32px 36px",
          maxWidth: 560,
        }}
      >
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 28 }}>
          <span style={{ color: "var(--green)" }}># </span>
          Open to freelance, full-time roles, or just a good chat about web
          development.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              color: "var(--muted)",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            --name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="your name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              color: "var(--muted)",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            --email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              color: "var(--muted)",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            --message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="what's on your mind?"
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            background: status === "ok" ? "var(--green-muted)" : "transparent",
            border: `1px solid ${status === "ok" ? "var(--green)" : "var(--green)"}`,
            color: "var(--green)",
            fontFamily: "var(--font)",
            fontSize: 13,
            padding: "10px 24px",
            borderRadius: 6,
            cursor: status === "sending" ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            opacity: status === "sending" ? 0.6 : 1,
          }}
        >
          {status === "sending"
            ? "$ sending..."
            : status === "ok"
              ? "✓ message sent"
              : "$ send message →"}
        </button>

        {status === "error" && (
          <p style={{ color: "#f85149", fontSize: 12, marginTop: 12 }}>
            ✗ {errMsg}
          </p>
        )}

        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 24,
          }}
        >
          {[
            { label: "github", href: "https://github.com" },
            { label: "linkedin", href: "https://linkedin.com" },
            { label: "twitter", href: "https://twitter.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--muted)", fontSize: 12 }}
              onMouseEnter={(e) => (e.target.style.color = "var(--green)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
            >
              ./{l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
