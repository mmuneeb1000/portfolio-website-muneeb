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
      <main className="mx-4 my-6 lg:mx-auto lg:w-280">
        <Hero />
        <Contact />
        <div
          className="relative overflow-hidden rounded-3xl p-4 lg:px-10 
          border border-border bg-emerald-950/30  
         [html[data-theme='light']_&]:bg-emerald-50/60 "
        >
          {/* Grain */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.045] noise" />

          {/* Content */}
          <div className="relative z-10">
            <Websites />
            <Projects />
            <Components />
          </div>
        </div>
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
