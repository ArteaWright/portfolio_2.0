import React from "react";

interface PillProps {
  children: React.ReactNode;
}

const Pill = ({ children }: PillProps) => (
  <span className="rounded-full px-3 py-1 text-xs" style={{ color: "#c4a287", border: "1px solid #c4a287" }}>
    {children}
  </span>
);

export default Pill;

