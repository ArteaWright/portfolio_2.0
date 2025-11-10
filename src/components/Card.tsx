import React from "react";

interface CardProps {
  children: React.ReactNode;
  widthClass?: string;
  heightClass?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const Card = ({ children, widthClass = "", heightClass = "", align = "left", className = "" }: CardProps) => {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  const containerClasses = `rounded-2xl border border-black/5 p-4 shadow-sm backdrop-blur ${alignClass} ${widthClass} ${heightClass} ${className}`.trim();

  return (
    <div className={containerClasses} style={{ backgroundColor: "rgba(255,251,242,0.85)" }}>
      {children}
    </div>
  );
};

export default Card;


