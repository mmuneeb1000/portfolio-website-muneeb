import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "~/projects", href: "#projects" },
  { label: "~/blog", href: "#blog" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" relative flex items-center justify-between p-6">
      <h1 className="text-green">muneeb@portfolio:~$</h1>

      <nav>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-muted transition-colors hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
          className="text-green md:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-4 w-full border border-neutral-800 bg-background md:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block border-b border-neutral-800 px-6 py-4 text-[13px] bg-bg
                text-muted transition-colors hover:bg-neutral-900 hover:text-green last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
