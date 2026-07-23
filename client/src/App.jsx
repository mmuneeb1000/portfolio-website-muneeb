import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Components from "./components/Components.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useTheme from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Navbar />
      <main className="mx-auto px-6 py-4 md:py-10 lg:w-200">
        <Hero />
        <Projects />
        <Components />
        <Contact />
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
