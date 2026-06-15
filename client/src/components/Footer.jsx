import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px",
        textAlign: "center",
        color: "var(--muted)",
        fontSize: 12,
      }}
    >
      <span style={{ color: "var(--green)" }}>m.muneeb@portfolio:~$ </span>
      echo "built with React + Express + Node.js · {new Date().getFullYear()}"
    </footer>
  );
}
