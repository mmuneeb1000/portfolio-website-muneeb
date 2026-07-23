import React from "react";

export default function Footer() {
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
      className="flex flex-col gap-4 lg:flex-row lg:justify-between 
      border-t border-muted px-6 py-6 text-center text-xs text-muted"
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
      <p className="mb-4 font-mono">
        m.muneeb@portfolio:~$ echo "Built with React + Vite + Tailwind CSS ·
        {new Date().getFullYear()}"
      </p>
    </footer>
  );
}
