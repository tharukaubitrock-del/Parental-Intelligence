import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Calendar } from 'lucide-react';
import { DarkSectionPhoneMockup } from './DarkSectionPhoneMockup';

export function DarkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "start -50%"]
  });

  const contentScale = useTransform(scrollYProgress, [0.25, 0.8], [0.8, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.8], [150, 0]);

  const securityScale = useTransform(scrollYProgress, [0.25, 0.5], [0.6, 1]);
  const securityY = useTransform(scrollYProgress, [0.25, 0.5], [200, 0]);
  const securityOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="relative z-10 pb-20 pt-[72vh] md:pb-28 md:pt-[88vh] lg:pb-32 lg:pt-[100vh]"
    >
      <motion.div 
        style={{ 
          scale: contentScale, 
          opacity: contentOpacity,
          y: contentY
        }}
        className="relative z-20 mx-auto flex max-w-[1200px] flex-col gap-4 px-4 text-white sm:gap-6 sm:px-6"
      >
        {/* Section 1: Security */}
        <motion.div 
          style={{
            scale: securityScale,
            y: securityY,
            opacity: securityOpacity,
            transformOrigin: "bottom center"
          }}
          className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[30px] py-20 text-center sm:rounded-[40px] sm:py-24 md:py-32"
        >
          {/* Giant Lock Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
             <svg viewBox="0 0 24 24" fill="currentColor" className="h-[500px] w-[500px] text-white sm:h-[640px] sm:w-[640px] md:h-[800px] md:w-[800px]">
               <path d="M17 8V7c0-2.76-2.24-5-5-5S7 4.24 7 7v1H5v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9h-2zm-5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V7c0-1.66 1.34-3 3-3s3 1.34 3 3v1H9z"/>
             </svg>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#4A90E2]/30 bg-gradient-to-b from-[#1A3B6E] to-[#0A1931] shadow-[0_0_40px_rgba(74,144,226,0.2)] sm:mb-8 sm:h-24 sm:w-24">
              <Shield className="h-8 w-8 text-[#70A8F4] sm:h-10 sm:w-10" fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="mt-[-2px] h-4 w-4 text-[#0A1931]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:mb-6 sm:text-5xl md:text-[80px]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#70A8F4]">Privacy-first</span><br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#70A8F4] to-[#A0C4F8]">by design</span>
            </h2>
            <p className="max-w-lg text-base text-gray-400 sm:text-lg md:text-xl">
              Your conversations are private.<br />
              <span className="text-white font-medium">PI does not store chats, so your parenting questions remain completely confidential.</span>
            </p>
          </div>
        </motion.div>

        {/* Section 2: Low Commission */}
        <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[30px] bg-[#15171E] p-6 sm:min-h-[520px] sm:rounded-[40px] sm:p-10 md:p-14 lg:min-h-[500px] lg:p-16">
          <div className="z-10 w-full max-w-md">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-white">Built for </span>
              <span className="text-gray-500">Sri Lankan<br />parents</span><br />
              <span className="text-gray-500">with a </span>
              <span className="text-white">calm voice</span>
            </h2>
          </div>

          <div className="mt-10 flex justify-center lg:hidden">
            <div className="h-[350px] sm:h-[430px] md:h-[520px]">
              <div className="origin-top scale-[0.42] sm:scale-[0.52] md:scale-[0.62]">
                <DarkSectionPhoneMockup />
              </div>
            </div>
          </div>
          
          {/* Phone Mockup */}
          <div className="pointer-events-none absolute bottom-[-100px] right-[-50px] hidden rotate-[-15deg] lg:block">
            <DarkSectionPhoneMockup />
          </div>
        </div>

        {/* Section 3: Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[30px] bg-[#15171E] p-6 sm:min-h-[480px] sm:rounded-[40px] sm:p-8 md:p-10 lg:min-h-[500px] lg:p-12">
            <h3 className="mb-4 font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              <span className="text-white">Support without overwhelm.</span>{' '}
              <span className="text-gray-500">
                No overwhelming articles. No judgment. Just helpful answers when you need them most — so you can feel “this will help me immediately.”
              </span>
            </h3>
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-8 sm:right-8 md:bottom-12 md:left-10 md:right-10 lg:left-12 lg:right-12">
              <div className="relative h-[160px] sm:h-[180px]">
                <div className="absolute bottom-0 left-0 right-0 scale-[0.85] translate-y-12 rounded-2xl border border-white/5 bg-[#1C1C1E] p-4 opacity-30 sm:p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-gray-500">Late-night worry</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 sm:text-sm"><Calendar className="h-4 w-4" /> Jan 30</div>
                  </div>
                  <div className="flex h-1.5 gap-1.5">
                    <div className="flex-1 bg-[#00D06C] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 scale-[0.92] translate-y-6 rounded-2xl border border-white/5 bg-[#22242A] p-4 opacity-60 shadow-lg sm:p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium text-gray-400">Confusing advice</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm"><Calendar className="h-4 w-4" /> Jan 24</div>
                  </div>
                  <div className="flex h-1.5 gap-1.5">
                    <div className="flex-1 bg-[#00D06C] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-10 rounded-2xl border border-white/10 bg-[#2A2D35] p-5 shadow-2xl sm:p-6">
                  <div className="mb-1 text-sm text-gray-300">A clear, calm answer</div>
                  <div className="mb-5 text-xs text-gray-500 sm:mb-6">(tailored for Sri Lankan families)</div>
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-lg font-bold text-white sm:text-xl">Try it now</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 sm:text-sm">
                      <Calendar className="h-4 w-4" />
                      Jan 3
                    </div>
                  </div>
                  <div className="flex h-2 gap-1.5">
                    <div className="flex-1 bg-[#00D06C] rounded-full"></div>
                    <div className="flex-1 bg-[#00D06C] rounded-full"></div>
                    <div className="flex-1 bg-[#00D06C] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                    <div className="flex-1 bg-[#2C2C2E] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Designed for wise control */}
            <div className="flex min-h-[240px] flex-1 flex-col justify-center rounded-[30px] bg-[#0084FF] p-6 sm:min-h-[280px] sm:rounded-[40px] sm:p-8 md:p-10 lg:p-12">
              <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                <span className="text-blue-200/80">For the parent</span><br />
                <span className="text-white">in all of us</span> <span className="text-blue-200/80">— calm, practical guidance.</span>
              </h3>
            </div>

            {/* Real-time notifications */}
            <div className="flex min-h-[200px] flex-col justify-center rounded-[30px] bg-[#15171E] p-6 sm:rounded-[40px] sm:p-8 md:p-10 lg:p-12">
              <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                <span className="text-white">Built for Sri Lankan Parents</span><br />
                <span className="text-gray-500">No judgment. No overwhelming articles. Just helpful answers when you need them most.</span>
              </h3>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
