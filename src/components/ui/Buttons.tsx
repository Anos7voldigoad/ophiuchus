import React from "react";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PrimaryBtn: React.FC<ButtonProps> = ({ href = "#", children, onClick, ...rest }) => (
  <a
    href={href}
    onClick={onClick}
    {...rest}
    className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#8EB69B] to-[#DAF1DE] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-[#8EB69B]/30 transition hover:from-[#7AA68A] hover:to-[#C5E5CC] focus:outline-none focus:ring-2 focus:ring-[#DAF1DE] focus:ring-offset-2 focus:ring-offset-[#8EB69B] ${rest.className ?? ""}`}
  >
    {children}
  </a>
);

export const GhostBtn: React.FC<ButtonProps> = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center rounded-2xl border border-[#8EB69B]/20 bg-[#8EB69B]/0 px-6 py-3 text-sm font-semibold text-[#8EB69B] transition hover:bg-[#8EB69B]/5 focus:outline-none focus:ring-2 focus:ring-[#8EB69B]/50"
  >
    {children}
  </a>
);



