import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Components from "./components/Components.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useTheme from "./hooks/useTheme.js";
import Websites from "./components/Websites.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar />

      <main
        className="relative overflow-hidden rounded-3xl border border-emerald-900/20
        bg-emerald-950/30 mx-4 my-6 p-4 lg:px-10 lg:mx-auto lg:w-240 [html[data-theme='light']_&]:border-emerald-900/10
    [html[data-theme='light']_&]:bg-emerald-50/60 "
      >
        {/* Grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.045] noise" />

        {/* Content */}
        <div className="relative z-10">
          <Hero />
          <Contact />
          <Websites />
          <Projects />
          <Components />
        </div>
      </main>

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
