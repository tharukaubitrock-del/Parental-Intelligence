import React from 'react';

function HamburgerIcon() {
  return (
    <div className="flex flex-col gap-[7px]" aria-hidden="true">
      <span className="block h-[4px] w-[46px] rounded-full bg-white" />
      <span className="block h-[4px] w-[46px] rounded-full bg-white" />
      <span className="block h-[4px] w-[46px] rounded-full bg-white" />
    </div>
  );
}

function PaperPlaneIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[30px] w-[30px] text-white" fill="none" aria-hidden="true">
      <path
        d="M5.5 8.5L26.5 8.5L16.6 16.7M5.5 8.5L14.4 27L16.6 16.7M16.6 16.7L26.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PiWelcomeScreen() {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#F7FBFD]"
      style={{
        fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[126px] bg-[#1E516D]" />

      <div className="relative z-10 px-[26px] pt-[58px]">
        <div className="flex items-center gap-[24px] text-white">
          <HamburgerIcon />
          <div className="text-[54px] font-[300] leading-none tracking-[-0.05em]">PI</div>
        </div>
      </div>

      <div className="absolute inset-x-[22px] top-[48.5%] -translate-y-1/2 text-center">
        <div className="text-[72px] font-[400] leading-[0.95] tracking-[-0.06em] text-[#183A58]">Hi, Sahan!</div>
        <div className="mt-[18px] text-[21px] font-[300] leading-[1.12] tracking-[-0.04em] text-[#315D7E]">
          Parenting isn’t easy—you’re not alone <span aria-hidden="true">💙</span>
        </div>
      </div>

      <div className="absolute inset-x-[22px] bottom-[28px]">
        <div className="flex items-center justify-between rounded-[42px] border-[2px] border-[#161616] bg-white pl-[20px] pr-[8px] py-[7px] shadow-[0_12px_32px_rgba(19,44,58,0.08)]">
          <div className="text-[18px] font-[300] tracking-[-0.04em] text-[#7D7F84]">Ask me anything...</div>
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#1E516D] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <PaperPlaneIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
