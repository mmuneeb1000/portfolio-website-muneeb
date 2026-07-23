import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don't enable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let animationId;

    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseOver(e) {
      const target = e.target.closest(
        "a, button, input, textarea, select, .repo-card",
      );

      if (target && ringRef.current) {
        ringRef.current.classList.add("cursor-hover");
      }
    }

    function handleMouseOut(e) {
      const target = e.target.closest(
        "a, button, input, textarea, select, .repo-card",
      );

      if (target && ringRef.current) {
        ringRef.current.classList.remove("cursor-hover");
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
