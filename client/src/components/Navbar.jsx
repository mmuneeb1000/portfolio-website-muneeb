import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "~/projects", href: "#projects" },
  { label: "~/components", href: "#components" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm text-text transition-colors hover:text-green"
        >
          muneeb@portfolio:~$
        </a>

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
