import React from "react";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-6 text-center text-xs text-[var(--muted)]"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-[var(--green)]">m.muneeb@portfolio:~$ </span>
      echo "built with React + Express + Node.js · {new Date().getFullYear()}"
    </footer>
  );
}
