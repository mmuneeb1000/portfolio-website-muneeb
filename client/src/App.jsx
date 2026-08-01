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
      <main className="mx-auto px-6 py-4 md:py-10 lg:w-220">
        <Hero />
        <Contact />
        <Websites />
        <Projects />
        <Components />
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
