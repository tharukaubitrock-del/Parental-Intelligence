import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Calm guidance", "Sri Lankan context", "Sinhala | English", "24/7 support", "Age-specific advice", "Privacy-first", "Quick answers", "No judgment"
];

export function LogoMarquee() {
  return (
    <div className="flex w-full items-center overflow-hidden border-t border-gray-100 bg-white py-8 sm:py-12">
      <motion.div 
        className="flex items-center gap-10 whitespace-nowrap px-4 sm:gap-16 md:gap-24"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center gap-2 font-display text-lg font-bold text-gray-300 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:text-xl md:text-2xl">
            <div className="h-6 w-6 rounded-full border-[3px] border-current sm:h-7 sm:w-7 md:h-8 md:w-8 md:border-4"></div>
            <span>{logo}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
