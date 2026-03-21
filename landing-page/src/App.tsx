/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PhoneMockup } from './components/PhoneMockup';
import { LogoMarquee } from './components/LogoMarquee';
import { FeaturesGrid } from './components/FeaturesGrid';
import { Integrations } from './components/Integrations';
import { Testimonials } from './components/Testimonials';
import { DarkSection } from './components/DarkSection';
import { Footer } from './components/Footer';
import { Star } from 'lucide-react';
import piLogo from '../assets/1.png';

const LOGIN_ROUTE = '/login';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm sm:px-4">
        <img src={piLogo} alt="Parental Intelligence" className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="truncate font-display text-sm font-bold tracking-tight sm:text-xl">Parental Intelligence</span>
      </div>
      <div className="ml-3 flex items-center">
        <a
          href={LOGIN_ROUTE}
          className="flex items-center gap-2 rounded-full bg-[#1A73E8] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span className="sm:hidden">Start Now</span>
          <span className="hidden sm:inline">Start Chatting Now</span>
        </a>
      </div>
    </nav>
  );
}

export default function App() {
  const desktopHeroRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: desktopHeroRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: darkProgress } = useScroll({
    target: darkSectionRef,
    offset: ["start start", "start -50%"]
  });

  const bgColor = useTransform(darkProgress, [0, 0.25], ["#ffffff", "#0A0A0A"]);

  // Phone Animations
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1.8, 0.75]);
  const phoneX = useTransform(scrollYProgress, [0, 1], ["0%", "-25vw"]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["48vh", "0vh"]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 1], ["72deg", "0deg"]);
  const phoneBoxShadow = useTransform(
    scrollYProgress, 
    [0, 1], 
    [
      "0 100px 150px -20px rgba(0,0,0,0.6), 0 50px 80px -30px rgba(0,0,0,0.4)", 
      "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 0 rgba(0,0,0,0)"
    ]
  );
  const statsScale = useTransform(scrollYProgress, [0.38, 0.75, 1], [0.52, 1, 1]);
  const statsY = useTransform(scrollYProgress, [0.38, 0.75, 1], ['10vh', '0vh', '0vh']);
  const statsPanel = (
    <>
      <h2 className="mb-8 font-display text-3xl font-bold leading-[1.02] tracking-[-0.05em] text-[#111] sm:mb-10 sm:text-4xl md:text-5xl lg:mb-12 lg:text-6xl">
        Parenting doesn’t
        <br />
        <span className="text-[#0084FF]">come with a manual</span>
      </h2>

      <div className="flex w-full flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-[520px] flex-col gap-3 rounded-[28px] border border-gray-200 bg-white/70 px-6 py-6 text-left backdrop-blur-sm sm:rounded-[32px] sm:px-8 sm:py-7">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-black sm:text-lg">Parents often wonder:</div>
          </div>
          <ul className="space-y-1 text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
            <li>Is my baby sleeping enough?</li>
            <li>What should I do about picky eating?</li>
            <li>How much screen time is too much?</li>
            <li>How do I handle school stress?</li>
            <li>What works for Sri Lankan families?</li>
          </ul>
          <div className="text-sm text-gray-600 sm:text-base">
            Instead of searching through dozens of articles, Parental Intelligence gives you clear answers instantly.
          </div>
          <div className="flex items-center gap-2 text-[#FFC107]">
            <Star fill="currentColor" size={20} />
            <span className="text-base font-bold text-black sm:text-lg">Instant clarity</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-blue-200">
      <Navbar />
      <div className="relative z-20 bg-[#F8F9FA]">
        {/* Hero & Stats Scroll Sequence */}
        <div ref={desktopHeroRef} className="relative hidden xl:block">
          
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[#d8f4f2] rounded-full blur-[120px] opacity-80"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-[#fce4ec] rounded-full blur-[120px] opacity-80"></div>
          </div>

          {/* Sticky Phone Container */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none" style={{ perspective: "1000px" }}>
              <motion.div 
                className="origin-center pointer-events-auto"
                style={{ 
                  scale: phoneScale, 
                  x: phoneX, 
                  y: phoneY,
                  rotateX: phoneRotateX,
                  boxShadow: phoneBoxShadow,
                  borderRadius: "50px"
                }}
              >
                <PhoneMockup />
              </motion.div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="h-screen flex flex-col items-center justify-start pt-[15vh] px-4 relative z-10 w-full">
            <h1 className="font-display font-black text-[clamp(3.9rem,6.2vw,8.2rem)] tracking-[-0.07em] leading-[0.92] w-full max-w-[1680px] mx-auto px-3 md:px-6 uppercase text-center text-[#111]">
              <span className="block whitespace-nowrap">Your AI Parenting Buddy</span>
              <span className="block whitespace-nowrap">for Sri Lankan Families</span>
            </h1>
            <p className="mt-6 px-4 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium text-center leading-snug">
              A friendly AI chat assistant made just for Sri Lankan parents.
              <br />
              Parental Intelligence is here for you.
            </p>
            <a
              href={LOGIN_ROUTE}
              className="mt-10 bg-[#1A73E8] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
            >
              Try Parental Intelligence Now
            </a>
          </div>

          {/* Stats Section */}
          <div className="h-screen flex flex-col items-end justify-center px-4 relative z-10 max-w-7xl mx-auto w-full">
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center text-center md:pr-12 origin-bottom"
              style={{
                scale: statsScale,
                y: statsY,
              }}
            >
              {statsPanel}
            </motion.div>
          </div>

        </div>

        <div className="relative overflow-hidden xl:hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-18%] top-[-6%] h-[320px] w-[320px] rounded-full bg-[#d8f4f2] blur-[110px] opacity-90 sm:h-[420px] sm:w-[420px]" />
            <div className="absolute right-[-18%] top-[8%] h-[320px] w-[320px] rounded-full bg-[#fce4ec] blur-[110px] opacity-90 sm:h-[420px] sm:w-[420px]" />
          </div>

          <section className="relative z-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
            <div className="mx-auto max-w-4xl">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-display text-[clamp(2.9rem,13vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-[#111]">
                  <span className="block">Your AI Parenting Buddy</span>
                  <span className="mt-1 block">for Sri Lankan Families</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl px-2 text-base font-medium leading-snug text-gray-600 sm:mt-6 sm:text-lg md:text-xl">
                  A friendly AI chat assistant made just for Sri Lankan parents.
                  <br />
                  Parental Intelligence is here for you.
                </p>
                <a
                  href={LOGIN_ROUTE}
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1A73E8] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700 sm:mt-10 sm:w-auto sm:text-lg"
                >
                  Try Parental Intelligence Now
                </a>
              </div>

              <div className="relative mt-10 flex h-[505px] items-start justify-center sm:h-[620px] md:h-[700px]">
                <div className="origin-top scale-[0.58] sm:scale-[0.72] md:scale-[0.82]">
                  <PhoneMockup />
                </div>
              </div>

              <div className="relative -mt-3 sm:mt-0">
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">{statsPanel}</div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="bg-white">
          <LogoMarquee />
          <FeaturesGrid />
          <Integrations />
          <Testimonials />
        </div>
      </div>

      <motion.div 
        ref={darkSectionRef}
        className="relative z-30"
        style={{ backgroundColor: bgColor }}
      >
        <DarkSection />
        <Footer />
      </motion.div>
    </div>
  );
}
