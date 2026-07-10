import React, { useState, useEffect } from "react";

const links = [
  { label: "~/projects", href: "#projects" },
  { label: "~/blog", href: "#blog" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="flex justify-between px-6 py-3.5 transition-all duration-300">
      <span className="text-base font-medium text-green">
        muneeb@portfolio:~$
      </span>

      <div className="flex gap-5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[13px] text-muted transition-colors duration-200 hover:text-green"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
