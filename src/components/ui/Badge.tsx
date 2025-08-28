import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[#8EB69B]/20 bg-[#8EB69B]/10 px-3 py-1 text-[11px] font-medium text-[#8EB69B] backdrop-blur">
    {children}
  </span>
);

export default Badge;



