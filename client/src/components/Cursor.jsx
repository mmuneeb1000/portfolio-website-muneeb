import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    function move(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }

    function animate() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.current.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", move);
    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
