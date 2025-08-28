import React from "react";
import { Badge } from ".";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle }) => (
  <div className="mx-auto max-w-2xl text-center">
    {eyebrow && <Badge>{eyebrow}</Badge>}
    <h2 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-white sm:mt-4">{title}</h2>
    {subtitle && <p className="mt-2 text-base sm:text-lg text-[#DAF1DE]/70">{subtitle}</p>}
  </div>
);

export default SectionTitle;



