import React from "react";
import { motion } from "framer-motion";

interface AmbientSparklesProps {
  count?: number;
}

const AmbientSparkles: React.FC<AmbientSparklesProps> = ({ count = 24 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 6 + Math.random() * 6;
        const size = 1 + Math.random() * 2;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#DAF1DE]"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, opacity: 0.35 }}
            animate={{
              y: [0, -12, 0],
              x: [0, 6, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};

export default AmbientSparkles;



