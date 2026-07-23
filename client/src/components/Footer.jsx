import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
export default function Footer({ theme, toggleTheme }) {
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
  ];

  return (
    <footer
      className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between 
      border-t border-muted px-6 py-6 text-center text-xs text-text"
    >
      <div className="flex justify-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-green focus:text-green focus:outline-none"
          >
            ./{link.label}
          </a>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative flex h-6 w-20 items-center rounded-full border border-border transition-colors ${
            theme === "dark" ? "bg-surface2" : "bg-green-muted"
          }`}
        >
          <div
            className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-green text-bg shadow transition-transform duration-300 ${
              theme === "dark" ? "translate-x-1" : "translate-x-12"
            }`}
          >
            {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
          </div>

          <div className="flex w-full justify-between px-2 text-muted">
            <FiMoon size={14} />
            <FiSun size={14} />
          </div>
        </button>
        <p className="font-mono">
          m.muneeb@portfolio:~$ echo "Built with React + Vite + Tailwind CSS ·
          {new Date().getFullYear()}"
        </p>
      </div>
    </footer>
  );
}
