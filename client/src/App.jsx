import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Components from "./components/Components.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useTheme from "./hooks/useTheme.js";
import Websites from "./components/Websites.jsx";
import AdminApp from "./components/admin/AdminApp.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <>
      <Navbar />

      <Hero />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:py-12">
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.04]" />

        <div className="relative z-10 space-y-8 lg:space-y-10">
          <section
            className="
                overflow-hidden rounded-2xl
                border border-border
                bg-surface2/80
                backdrop-blur-sm
              "
          >
            <Contact />
          </section>

          <section
            className="
                overflow-hidden rounded-2xl
                border border-border
                bg-surface2/70
                backdrop-blur-sm
              "
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3 md:px-7">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
              </div>

              <span className="font-mono text-[11px] text-muted">
                ~/portfolio/work
              </span>
            </div>

            <div className="p-5 md:p-7 lg:p-8">
              <Websites />
              <Projects />
              <Components />
            </div>
          </section>
        </div>
      </main>

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
