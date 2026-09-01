import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import siteLogo from "/sitelogo.png";

const links = [
  { label: "~/contact", href: "#contact" },
  { label: "~/services", href: "#services" },
  { label: "~/faq", href: "#faq" },
  { label: "~/websites", href: "#websites" },
  { label: "~/projects", href: "#projects" },
  { label: "~/components", href: "#components" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border bg-bg/90 px-6 py-4 backdrop-blur">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <img src={siteLogo} className="w-14 h-14 rounded-xl" />
          <a
            href="#"
            className="font-mono text-base text-text transition-colors hover:text-green"
          >
            webdevpk@store:~$
          </a>
        </div>
        <nav aria-label="Primary navigation">
          <div className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-text transition-colors hover:text-green focus:text-green focus:outline-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-xl text-text md:hidden"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mt-4 flex flex-col gap-4 border-t border-border pt-4 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-text transition-colors hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
