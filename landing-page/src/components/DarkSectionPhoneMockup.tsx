import React from 'react';

function CellularIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" className={className} fill="currentColor" aria-hidden="true">
      <rect x="0.5" y="7" width="3" height="4.5" rx="1.2" />
      <rect x="5" y="5" width="3" height="6.5" rx="1.2" />
      <rect x="9.5" y="3" width="3" height="8.5" rx="1.2" />
      <rect x="14" y="1" width="3" height="10.5" rx="1.2" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 13" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M1.5 4.5C5.7 1.1 12.3 1.1 16.5 4.5" strokeLinecap="round" />
      <path d="M4 7.4C7 5.2 11 5.2 14 7.4" strokeLinecap="round" />
      <path d="M6.8 10.1C8.3 9.1 9.7 9.1 11.2 10.1" strokeLinecap="round" />
      <circle cx="9" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 13" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3.6" y="3.4" width="15.2" height="6.2" rx="1.8" fill="currentColor" />
      <rect x="24.4" y="4.2" width="2.4" height="4.6" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function DarkSectionStatusBar() {
  return (
    <div
      className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-[30px] pt-[18px] text-white pointer-events-none"
      style={{
        fontFamily: '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}
    >
      <div className="text-[16px] font-semibold leading-none tracking-[-0.02em]">9:41</div>
      <div className="flex items-center gap-[7px]">
        <CellularIcon className="h-[12px] w-[18px]" />
        <WifiIcon className="h-[12px] w-[16px]" />
        <BatteryIcon className="h-[13px] w-[28px]" />
      </div>
    </div>
  );
}

function DarkSectionDynamicIsland() {
  return (
    <div className="absolute left-1/2 top-[11px] z-20 -translate-x-1/2 pointer-events-none">
      <div className="relative h-[36px] w-[126px] rounded-full bg-black shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(23,23,23,0.95),rgba(0,0,0,1))]" />
        <div className="absolute right-[13px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-[#050505]">
          <div className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(71,112,255,0.9),rgba(18,27,70,0.45)_38%,rgba(0,0,0,0)_70%)] opacity-75" />
        </div>
      </div>
    </div>
  );
}

function DarkSectionSideButtons() {
  return (
    <>
      <div className="absolute left-[-2px] top-[152px] h-[34px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute left-[-2px] top-[212px] h-[56px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute left-[-2px] top-[282px] h-[56px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute right-[-2px] top-[236px] h-[94px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
    </>
  );
}

function DarkSectionAntennaBands() {
  return (
    <>
      <div className="absolute left-[58px] top-[7px] h-[3px] w-[64px] rounded-full bg-[#8a8177]/70" />
      <div className="absolute right-[82px] top-[7px] h-[3px] w-[62px] rounded-full bg-[#8a8177]/70" />
      <div className="absolute left-[58px] bottom-[7px] h-[3px] w-[64px] rounded-full bg-[#8a8177]/70" />
      <div className="absolute right-[82px] bottom-[7px] h-[3px] w-[62px] rounded-full bg-[#8a8177]/70" />
      <div className="absolute left-[7px] top-[216px] h-[58px] w-[3px] rounded-full bg-[#8a8177]/70" />
      <div className="absolute right-[7px] top-[216px] h-[58px] w-[3px] rounded-full bg-[#8a8177]/70" />
    </>
  );
}

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

function DarkSectionWelcomeScreen() {
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
        <div className="text-[72px] font-[400] leading-[0.95] tracking-[-0.06em] text-[#183A58]">ආයුබෝවන්, කුමාරි!</div>
        <div className="mt-[18px] text-[21px] font-[300] leading-[1.12] tracking-[-0.04em] text-[#315D7E]">
          දෙමාපිය රැකවරණය කියන්නේ ලේසි දෙයක් නෙවෙයි, ඔබ තනිවී නැහැ <span aria-hidden="true">💙</span>
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

export function DarkSectionPhoneMockup({ className }: { className?: string }) {
  return (
    <div className={['relative h-[824px] w-[402px]', className].filter(Boolean).join(' ')}>
      <div
        className="absolute inset-0 rounded-[68px] shadow-[0_56px_120px_-36px_rgba(0,0,0,0.78)]"
        style={{
          background:
            'linear-gradient(135deg, #7a7068 0%, #f2ece1 16%, #b0a69b 34%, #857d75 50%, #d3cbc2 69%, #f3ede5 84%, #8e857d 100%)',
        }}
      >
        <div className="absolute inset-[1px] rounded-[67px] border border-white/45" />
        <div
          className="absolute inset-[4px] rounded-[64px]"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -18px 32px rgba(64,55,48,0.3)',
          }}
        />

        <DarkSectionAntennaBands />
        <DarkSectionSideButtons />

        <div className="absolute inset-[9px] overflow-hidden rounded-[58px] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% -10%, rgba(255,255,255,0.2), rgba(255,255,255,0) 36%)',
            }}
          />
          <DarkSectionStatusBar />
          <DarkSectionDynamicIsland />
          <div className="absolute inset-0">
            <DarkSectionWelcomeScreen />
          </div>
        </div>
      </div>
    </div>
  );
}
