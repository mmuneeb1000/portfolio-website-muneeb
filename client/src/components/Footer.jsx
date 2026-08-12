import { FiSun, FiMoon } from "react-icons/fi";

export default function Footer({ theme, toggleTheme }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="font-mono text-xs text-text">
          m.muneeb@portfolio:~$ echo "Built with React + Vite + Tailwind CSS ·{" "}
          {year}"
        </p>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`relative flex h-7 w-20 shrink-0 items-center rounded-full border border-border transition-colors ${
            theme === "dark" ? "bg-surface2" : "bg-green-muted"
          }`}
        >
          <span className="flex w-full justify-between px-2 text-muted">
            <FiMoon size={14} />
            <FiSun size={14} />
          </span>

          <span
            className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-green text-bg shadow transition-transform duration-300 ${
              theme === "dark" ? "translate-x-0.5" : "translate-x-[3.25rem]"
            }`}
          >
            {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
          </span>
        </button>
      </div>
    </footer>
  );
}
