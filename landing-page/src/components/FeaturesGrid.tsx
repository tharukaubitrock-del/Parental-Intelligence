import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Baby,
  Clock3,
  Home,
  Languages,
  MapPin,
  MoonStar,
  School,
  Sparkles,
  SunMedium,
  Users,
} from 'lucide-react';
import { cn } from '../lib/utils';

function floatTransition(duration: number, delay = 0) {
  return {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };
}

function FeatureCard({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  children,
}: {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  className?: string;
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[30px] border border-[#dbe5f0] bg-white p-6 text-center shadow-[0_30px_90px_-40px_rgba(18,52,86,0.25)] sm:rounded-[42px] sm:p-8 lg:p-12',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,239,255,0.95),rgba(255,255,255,0)_38%),radial-gradient(circle_at_bottom_right,rgba(232,243,252,0.95),rgba(255,255,255,0)_45%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(238,245,252,0.95))]" />

      <div className="relative z-10 flex h-full flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e3ef] bg-[#f8fbff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5d7b99] shadow-[0_14px_28px_rgba(40,92,148,0.08)]">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </div>

        <h3
          className={cn(
            'mt-6 font-display text-[clamp(2.35rem,9vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.07em] text-[#0f1115] sm:mt-7',
            titleClassName
          )}
        >
          {title}
        </h3>

        <p className="mt-4 max-w-[490px] text-[clamp(0.98rem,3.7vw,1.55rem)] font-medium leading-[1.32] text-[#707784]">
          {description}
        </p>

        <div className="mt-auto flex w-full items-center justify-center pt-8 sm:pt-10">{children}</div>
      </div>
    </article>
  );
}

function StagePillar({
  icon: Icon,
  label,
  age,
  height,
  active = false,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  age: string;
  height: number;
  active?: boolean;
  delay?: number;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={floatTransition(4.6, delay)}
        className={cn(
          'relative flex w-full max-w-[88px] items-start justify-center rounded-[28px] px-3 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]',
          active
            ? 'bg-[linear-gradient(180deg,#2a7ef0_0%,#1755ad_100%)] text-white shadow-[0_18px_30px_rgba(23,85,173,0.24)]'
            : 'bg-[linear-gradient(180deg,#e6effa_0%,#c9d8ef_100%)] text-[#325278]'
        )}
        style={{ height }}
      >
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-2xl border',
            active ? 'border-white/20 bg-white/15' : 'border-white/70 bg-white/80'
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={cn(
            'absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold tracking-[-0.03em]',
            active ? 'text-white' : 'text-[#385474]'
          )}
        >
          {age}
        </div>
      </motion.div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e88a1]">{label}</div>
    </div>
  );
}

function AgeSpecificVisual() {
  return (
    <div className="relative h-[390px] w-full max-w-[470px] overflow-hidden rounded-[38px] border border-white/70 bg-[linear-gradient(180deg,#f4f8fd_0%,#e7eff9_100%)] px-4 pb-5 pt-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:h-[380px] sm:px-7 sm:pb-6 sm:pt-12">
      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-[#d8e6f5] bg-white/85 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-[#4f6f93] shadow-[0_10px_24px_rgba(42,83,128,0.08)] sm:top-5 sm:text-xs">
        Tailors replies as your child grows
      </div>

      <div className="absolute inset-x-4 bottom-5 top-[118px] rounded-[30px] border border-[#dbe6f2] bg-white/35 sm:inset-x-6 sm:bottom-6 sm:top-[88px]" />

      <div className="relative z-10 flex h-full origin-bottom items-end gap-2 px-1 pt-10 sm:gap-3 sm:px-0 sm:pt-0">
        <StagePillar icon={Baby} label="Newborn" age="0-6 mo" height={144} delay={0.1} />
        <StagePillar icon={Home} label="Toddler" age="1-3 yrs" height={182} delay={0.3} />
        <StagePillar icon={School} label="School age" age="4-12" height={236} active delay={0.5} />
        <StagePillar icon={Users} label="Teen" age="13+" height={170} delay={0.7} />
      </div>
    </div>
  );
}

function ContextTag({
  text,
  className,
  delay,
}: {
  text: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -9, 0], rotate: ['0deg', '1.2deg', '0deg'] }}
      transition={floatTransition(5.2, delay)}
      className={cn(
        'absolute rounded-[24px] px-5 py-4 text-[clamp(1rem,1.4vw,1.35rem)] font-semibold tracking-[-0.04em] shadow-[0_18px_30px_rgba(25,70,120,0.12)]',
        className
      )}
    >
      {text}
    </motion.div>
  );
}

function SriLankanSavvyVisual() {
  return (
    <div className="relative h-[350px] w-full max-w-[470px] overflow-hidden rounded-[38px] border border-white/70 bg-[linear-gradient(180deg,#f4f9ff_0%,#e8f0f9_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:h-[380px]">
      <div className="absolute inset-[22px] rounded-[30px] border border-[#d7e4f2] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(235,244,252,0.9)_70%,rgba(227,238,248,0.9)_100%)]" />

      <div className="absolute left-[15%] top-[17%] h-28 w-28 rounded-full border border-[#d5e5f7] bg-white/80" />
      <div className="absolute right-[14%] top-[14%] h-24 w-24 rounded-full border border-[#d5e5f7] bg-white/60" />
      <div className="absolute left-[25%] bottom-[18%] h-20 w-20 rounded-full border border-[#d5e5f7] bg-white/60" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={floatTransition(4.8, 0.4)}
        className="absolute left-1/2 top-[47%] flex h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[34px] bg-[radial-gradient(circle_at_30%_30%,#5aaeff_0%,#1560c2_55%,#0d3d78_100%)] text-white shadow-[0_26px_40px_rgba(16,86,176,0.3)]"
      >
        <MapPin className="h-7 w-7" />
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.26em]">Sri Lanka</div>
      </motion.div>

      <ContextTag text="School routines" className="left-[10%] top-[20%] -rotate-[10deg] bg-[#0f4e95] text-white" delay={0.1} />
      <ContextTag text="Grandparents" className="right-[8%] top-[24%] rotate-[9deg] bg-[#ddebff] text-[#183a58]" delay={0.35} />
      <ContextTag text="Home life" className="left-[14%] bottom-[18%] rotate-[11deg] bg-[#7fb9ff] text-[#0f2a42]" delay={0.2} />
      <ContextTag text="Clinic visits" className="left-[33%] top-[58%] -rotate-[13deg] bg-[#0b1320] text-white" delay={0.45} />
      <ContextTag text="Sri Lankan context" className="right-[8%] bottom-[16%] rotate-[-9deg] bg-[#c7dcff] text-[#163b5a]" delay={0.65} />
      <ContextTag text="Family rhythms" className="left-[45%] top-[14%] rotate-[6deg] bg-[#a8cbff] text-[#11395c]" delay={0.55} />
    </div>
  );
}

function LanguageSwitchVisual() {
  return (
    <div className="relative h-[360px] w-full max-w-[430px] sm:h-[390px]">
      <div className="absolute bottom-0 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-[44px] bg-[#102339] shadow-[0_34px_60px_rgba(16,35,57,0.18)] sm:h-[305px] sm:w-[305px]" />

      <motion.div
        animate={{ y: [0, -8, 0], rotate: ['8deg', '10deg', '8deg'] }}
        transition={floatTransition(5.4, 0.25)}
        className="absolute right-[10%] top-[17%] h-[206px] w-[210px] rounded-[34px] bg-[linear-gradient(180deg,rgba(154,193,255,0.92),rgba(109,154,227,0.72))] shadow-[0_18px_36px_rgba(34,86,160,0.18)]"
      />

      <motion.div
        animate={{ y: [0, 8, 0], rotate: ['6deg', '7deg', '6deg'] }}
        transition={floatTransition(5, 0.45)}
        className="absolute right-[16%] top-[23%] h-[206px] w-[210px] rounded-[34px] bg-[linear-gradient(180deg,rgba(189,216,255,0.92),rgba(133,181,245,0.78))] shadow-[0_18px_36px_rgba(34,86,160,0.16)]"
      />

      <motion.div
        animate={{ y: [0, -10, 0], rotate: ['-8deg', '-6deg', '-8deg'] }}
        transition={floatTransition(5.2, 0.1)}
        className="absolute bottom-[30px] left-1/2 w-[246px] -translate-x-1/2 rounded-[32px] bg-white p-6 text-left shadow-[0_24px_46px_rgba(17,34,57,0.22)] sm:w-[266px]"
      >
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-[#0f1115]" />
          <div className="text-[15px] font-semibold tracking-[-0.03em] text-[#12151a]">Ask in either language</div>
        </div>

        <div className="mt-5 flex gap-2">
          <div className="rounded-full bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#1d4f86]">English</div>
          <div className="rounded-full bg-[#0f4e95] px-3 py-1 text-xs font-semibold text-white">සිංහල</div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="max-w-[78%] rounded-[18px] rounded-tl-[6px] bg-[#eef5ff] px-4 py-3 text-sm font-medium leading-snug text-[#17395a]">
            How much sleep does a newborn need?
          </div>
          <div className="ml-auto max-w-[72%] rounded-[18px] rounded-tr-[6px] bg-[#0f4e95] px-4 py-3 text-sm font-medium leading-snug text-white">
            පිළිතුරු ඔබට පහසු භාෂාවෙන්
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SupportBubble({
  className,
  children,
  delay,
}: {
  className: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={floatTransition(4.7, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Support247Visual() {
  return (
    <div className="relative h-[350px] w-full max-w-[430px] overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#081a30_0%,#102f4d_100%)] shadow-[0_30px_60px_rgba(8,26,48,0.22)] sm:h-[380px]">
      <div className="absolute left-1/2 top-1/2 h-[254px] w-[254px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[156px] w-[156px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />

      <SupportBubble
        delay={0.1}
        className="absolute left-[15%] top-[20%] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/92 text-[#17395a] shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
      >
        <MoonStar className="h-8 w-8" />
      </SupportBubble>

      <SupportBubble
        delay={0.35}
        className="absolute right-[15%] top-[22%] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#7cc2ff_0%,#2b7aea_100%)] text-white shadow-[0_20px_32px_rgba(22,96,187,0.28)]"
      >
        <SunMedium className="h-9 w-9" />
      </SupportBubble>

      <SupportBubble
        delay={0.5}
        className="absolute left-[9%] bottom-[7%] z-10 rounded-[24px] bg-white/92 px-5 py-4 text-left shadow-[0_18px_30px_rgba(0,0,0,0.16)]"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a8694]">Late-night</div>
        <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#11283f]">2:13 AM</div>
      </SupportBubble>

      <SupportBubble
        delay={0.7}
        className="absolute right-[8%] bottom-[9%] z-10 rounded-[24px] bg-[#ddecff] px-5 py-4 text-left shadow-[0_18px_30px_rgba(29,83,141,0.16)]"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5e7995]">Before school</div>
        <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#143557]">6:40 AM</div>
      </SupportBubble>

      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={floatTransition(5.4, 0.2)}
        className="absolute left-1/2 top-1/2 flex h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[36px] bg-[radial-gradient(circle_at_30%_30%,#73bcff_0%,#2674df_60%,#12386b_100%)] text-white shadow-[0_30px_44px_rgba(14,73,151,0.35)]"
      >
        <Clock3 className="h-8 w-8" />
        <div className="mt-2 text-[26px] font-bold tracking-[-0.05em]">24/7</div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Support</div>
      </motion.div>

      <SupportBubble
        delay={0.25}
        className="absolute left-1/2 top-[15%] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72"
      >
        Clear replies in seconds
      </SupportBubble>
    </div>
  );
}

export function FeaturesGrid() {
  const uniformCardHeight = 'min-h-[540px] md:min-h-[670px] lg:min-h-[720px]';

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#dfeeff] blur-[120px] opacity-80" />
        <div className="absolute right-[-12%] top-[30%] h-[460px] w-[460px] rounded-full bg-[#ebf4fd] blur-[140px] opacity-90" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-4 py-20 sm:px-6 md:py-28 lg:py-32">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e6f3] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5f7c98] shadow-[0_14px_28px_rgba(40,92,148,0.07)]">
            <Sparkles className="h-3.5 w-3.5" />
            Core Features
          </div>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,10vw,6rem)] font-bold leading-[0.92] tracking-[-0.08em] text-[#0f1115]">
            <span className="block">Designed for</span>
            <span className="block">Sri Lankan Families</span>
          </h2>
          <p className="mt-5 text-[clamp(1.08rem,1.6vw,1.4rem)] font-medium leading-[1.45] text-[#6e7782]">
            From local context and age-specific guidance to Sinhala & English support and 24/7 help, PI gives parents calm, practical answers for everyday family life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <FeatureCard
            eyebrow="Age Adaptive"
            title="Age-specific guidance"
            description="Choose your child’s age and PI adjusts the tone, examples, and advice from newborn stages right through the teen years."
            className={uniformCardHeight}
            titleClassName="max-w-[760px]"
          >
            <AgeSpecificVisual />
          </FeatureCard>

          <FeatureCard
            eyebrow="Bilingual Flow"
            title="Chat in both සිංහල & English"
            description={
              <>
                Switch smoothly between English and <span className="font-semibold text-[#173a58]">සිංහල</span>, so the conversation always feels natural and comfortable.
              </>
            }
            className={uniformCardHeight}
            titleClassName="max-w-[760px]"
          >
            <LanguageSwitchVisual />
          </FeatureCard>

          <FeatureCard
            eyebrow="Local Context"
            title="Sri Lankan-savvy advice"
            description="Guidance shaped around Sri Lankan routines, family dynamics, school life, and the real pace of home life instead of generic global parenting copy."
            className={uniformCardHeight}
            titleClassName="max-w-[760px]"
          >
            <SriLankanSavvyVisual />
          </FeatureCard>

          <FeatureCard
            eyebrow="Always Available"
            title="24/7 parenting support"
            description="Whether it is a school-morning rush or a midnight worry, PI stays ready with calm, practical answers whenever questions show up."
            className={uniformCardHeight}
            titleClassName="max-w-[760px]"
          >
            <Support247Visual />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
