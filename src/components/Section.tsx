import React, { useEffect, useRef, useState } from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
}

const Section = ({ id, children, className = "", direction }: SectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!direction);

  useEffect(() => {
    if (!direction || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [direction]);

  // Check if className includes a max-width override
  const hasMaxWidthOverride = className.includes('max-w-');
  const baseClasses = hasMaxWidthOverride
    ? `relative mx-auto w-full px-4 ${className}`
    : `relative mx-auto w-full max-w-screen-md px-4 ${className}`;

  const animationClasses = direction
    ? `transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : direction === "left"
          ? "opacity-0 -translate-x-16"
          : "opacity-0 translate-x-16"
      }`
    : "";

  return (
    <section id={id} ref={ref} className={`${baseClasses} ${animationClasses}`}>
      {children}
    </section>
  );
};

export default Section;


