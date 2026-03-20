import React from 'react';

type StatusBarTone = 'dark' | 'light';

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

function IOSStatusBar({ tone = 'dark' }: { tone?: StatusBarTone }) {
  const colorClass = tone === 'light' ? 'text-white' : 'text-[#090909]';

  return (
    <div
      className={`absolute inset-x-0 top-0 z-30 flex items-start justify-between px-[30px] pt-[18px] ${colorClass} pointer-events-none`}
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

function DynamicIsland() {
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

function SideButtons() {
  return (
    <>
      <div className="absolute left-[-2px] top-[152px] h-[34px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute left-[-2px] top-[212px] h-[56px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute left-[-2px] top-[282px] h-[56px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
      <div className="absolute right-[-2px] top-[236px] h-[94px] w-[5px] rounded-full bg-[linear-gradient(180deg,#bcb4a9,#8e877f_65%,#d6cdc3)] shadow-[0_0_0_1px_rgba(44,34,27,0.2)]" />
    </>
  );
}

function AntennaBands() {
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

export function IPhone15ProFrame({
  className,
  children,
  statusBar = 'dark',
  contentClassName = 'pt-[54px]',
}: {
  className?: string;
  children: React.ReactNode;
  statusBar?: StatusBarTone;
  contentClassName?: string;
}) {
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

        <AntennaBands />
        <SideButtons />

        <div className="absolute inset-[9px] overflow-hidden rounded-[58px] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% -10%, rgba(255,255,255,0.2), rgba(255,255,255,0) 36%)',
            }}
          />
          <IOSStatusBar tone={statusBar} />
          <DynamicIsland />
          <div className={['absolute inset-0', contentClassName].filter(Boolean).join(' ')}>{children}</div>
        </div>
      </div>
    </div>
  );
}
