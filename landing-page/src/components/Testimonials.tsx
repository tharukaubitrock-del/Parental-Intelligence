import React from 'react';
import { motion } from 'framer-motion';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Sunil',
    role: 'thatha of a 7 year old boy',
    quote: 'PI helps me answer my grandson with more patience. The advice is simple, calm, and easy to use at home.',
  },
  {
    name: 'Nirmala',
    role: 'amma of a 10 year old girl',
    quote: 'Whenever I feel unsure, I can ask one quick question and get a reassuring answer that actually feels practical.',
  },
  {
    name: 'Kamal',
    role: 'thatha of a 5 year old boy',
    quote: 'I like that the answers are clear and not too long. It gives me ideas I can try straight away.',
  },
  {
    name: 'Kumari',
    role: 'amma of an 8 year old girl',
    quote: 'The tone feels kind and supportive. It never makes me feel judged, even when I ask very basic questions.',
  },
  {
    name: 'Ranjith',
    role: 'thatha of a 12 year old boy',
    quote: 'For things like screen time and school stress, PI gives balanced guidance that feels sensible for family life.',
  },
  {
    name: 'Malini',
    role: 'amma of a 6 year old girl',
    quote: 'I love that I can ask parenting questions at any time and get calm advice without searching through many articles.',
  },
  {
    name: 'Chandana',
    role: 'thatha of a 9 year old boy',
    quote: 'It feels like a steady parenting companion. Even one short answer can make a stressful moment easier.',
  },
  {
    name: 'Indrani',
    role: 'amma of an 11 year old girl',
    quote: 'The suggestions feel realistic for our day-to-day routines. It helps me respond more thoughtfully instead of reacting quickly.',
  },
  {
    name: 'Upali',
    role: 'thatha of a 4 year old boy',
    quote: 'Late at night, if something is worrying me, PI is there with quick guidance that is easy to understand.',
  },
  {
    name: 'Shyamali',
    role: 'amma of a 13 year old girl',
    quote: 'Teen parenting can be hard. PI helps me slow down, think clearly, and approach conversations with more confidence.',
  },
  {
    name: 'Sarath',
    role: 'thatha of an 8 year old boy',
    quote: 'I appreciate how practical it is. The advice feels useful for real family situations, not just ideal ones.',
  },
  {
    name: 'Deepika',
    role: 'amma of a 7 year old girl',
    quote: 'Sometimes I just need reassurance that I am handling things okay. PI gives that in a very warm way.',
  },
  {
    name: 'Lalith',
    role: 'thatha of a 6 year old boy',
    quote: 'It is helpful to have parenting support that feels relevant to Sri Lankan families and everyday home life.',
  },
  {
    name: 'Sandhya',
    role: 'amma of a 9 year old girl',
    quote: 'From picky eating to school mornings, the advice is calm, clear, and easy to try without overthinking.',
  },
  {
    name: 'Mahinda',
    role: 'thatha of a 10 year old boy',
    quote: 'PI gives me a second perspective when I need it. That little bit of guidance makes a big difference.',
  },
];

const firstRow = testimonials.slice(0, 8);
const secondRow = testimonials.slice(8);

function TestimonialCard({ item }: { item: Testimonial } & React.Attributes) {
  return (
    <div className="flex w-[280px] flex-col gap-5 rounded-[24px] border border-[#E4EBF3] bg-[#F8F9FA] p-6 shadow-[0_22px_60px_-40px_rgba(20,58,97,0.22)] sm:w-[340px] sm:gap-6 sm:rounded-[30px] sm:p-8 lg:w-[420px]">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white font-display font-bold text-black sm:h-12 sm:w-12">
          {item.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-display text-base font-bold leading-none text-black sm:text-lg">{item.name}</div>
          <div className="mt-1 text-xs text-gray-500 sm:text-sm">{item.role}</div>
        </div>
      </div>
      <p className="text-base leading-relaxed text-gray-700 sm:text-lg">“{item.quote}”</p>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="overflow-hidden py-20 md:py-24">
      <div className="mb-12 flex flex-col items-center px-4 text-center sm:mb-16 sm:px-6">
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          What Parents<br />Are Saying
        </h2>
      </div>

      <div className="relative flex w-full flex-col gap-4 sm:gap-6">
        <motion.div
          className="flex w-max gap-4 sm:gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 55 }}
        >
          {[...firstRow, ...firstRow].map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="flex w-max gap-4 sm:gap-6"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 55 }}
        >
          {[...secondRow, ...secondRow].map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
