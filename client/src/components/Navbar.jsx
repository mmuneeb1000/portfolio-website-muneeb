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
    <header className=" relative flex  items-center md:justify-between p-6">
      <h1 className="mx-auto md:mx-2 text-green text-center">
        muneeb@portfolio:~$
      </h1>

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
      </nav>
    </header>
  );
}
