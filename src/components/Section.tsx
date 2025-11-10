import React from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ id, children, className = "" }: SectionProps) => {
  // Check if className includes a max-width override
  const hasMaxWidthOverride = className.includes('max-w-');
  const baseClasses = hasMaxWidthOverride 
    ? `relative mx-auto w-full px-4 ${className}`
    : `relative mx-auto w-full max-w-screen-md px-4 ${className}`;
  
  return (
    <section id={id} className={baseClasses}>
      {children}
    </section>
  );
};

export default Section;


