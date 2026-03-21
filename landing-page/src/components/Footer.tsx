import React from 'react';
import piLogo from '../../assets/5.png';

export function Footer() {
  return (
    <div className="relative overflow-hidden px-4 pb-10 pt-20 text-white sm:px-6 sm:pb-12 sm:pt-24 md:pt-32">
      
      {/* Background Grid */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-6 gap-2 p-4 sm:grid-cols-8 sm:gap-3 sm:p-8 md:grid-cols-12 md:gap-4 md:p-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="relative aspect-square w-full rounded-xl bg-[#1A1A1A] md:rounded-2xl">
              {/* Random glowing squares */}
              {i === 24 && <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-[20px]"></div>}
              {i === 38 && <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-[20px]"></div>}
              {i === 72 && <div className="absolute inset-0 bg-green-500 rounded-2xl blur-[20px]"></div>}
              {i === 115 && <div className="absolute inset-0 bg-yellow-500 rounded-2xl blur-[20px]"></div>}
              {i === 130 && <div className="absolute inset-0 bg-pink-500 rounded-2xl blur-[20px]"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <h2 className="mb-5 max-w-5xl font-display text-4xl font-bold leading-[0.96] sm:mb-6 sm:text-6xl md:text-8xl">
          Parenting support is just one message away
        </h2>
        <p className="mb-12 max-w-2xl text-base text-gray-400 sm:mb-16 sm:text-lg md:text-xl">
          Start chatting with Parental Intelligence and get helpful parenting guidance instantly.
        </p>

        <a
          href="https://www.chatpi.lk"
          className="mb-16 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-center text-base font-semibold text-black shadow-[0_0_100px_rgba(255,255,255,0.1)] transition-colors hover:bg-gray-200 sm:mb-24 sm:w-auto sm:px-10 sm:py-5 sm:text-lg md:mb-32"
        >
          Start Now → www.chatpi.lk
        </a>

        {/* Footer Bottom */}
        <div className="flex w-full flex-col items-start justify-between gap-10 border-t border-white/10 pt-10 md:flex-row md:gap-8 md:pt-12">
          <div className="flex flex-col items-start gap-6 max-w-md text-left">
            <div className="flex items-center gap-2">
              <img src={piLogo} alt="Parental Intelligence" className="w-8 h-8" />
              <span className="font-display font-bold text-2xl tracking-tight">Parental Intelligence</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-wider">
              Your AI parenting companion for Sri Lankan families.
            </p>
            <a href="https://www.chatpi.lk" className="text-white/80 hover:text-white text-sm font-medium">
              https://www.chatpi.lk
            </a>
            <div className="text-gray-500 text-xs tracking-wider">© Parental Intelligence. Powered by <a href="https://www.thisisbitrock.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">BITROCK</a> </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-4 md:mt-0 md:justify-end">
            <a
              href="https://www.instagram.com/chatpi.lk/"
              target="_blank"
              rel="noreferrer"
              aria-label="Parental Intelligence on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E1306C] text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a
              href="https://www.youtube.com/@ParentalIntelligence"
              target="_blank"
              rel="noreferrer"
              aria-label="Parental Intelligence on YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578207350997#"
              target="_blank"
              rel="noreferrer"
              aria-label="Parental Intelligence on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.022 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.021 1.792-4.69 4.533-4.69 1.313 0 2.686.236 2.686.236v2.967H15.83c-1.491 0-1.956.93-1.956 1.885v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.099 24 12.073z"/></svg>
            </a>
            <a
              href="https://www.tiktok.com/@chatpi.lk"
              target="_blank"
              rel="noreferrer"
              aria-label="Parental Intelligence on TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.17v13.59a2.72 2.72 0 1 1-1.86-2.58V9.79a5.93 5.93 0 1 0 5.03 5.86V8.73a8 8 0 0 0 4.77 1.57V7.14c-.34 0-.67-.03-1.01-.1z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
