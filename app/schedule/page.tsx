'use client';

import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { schedules } from '@/data/schedule-data';

export default function SchedulePage() {
  const upcoming = schedules.filter(s => s.isUpcoming);
  const past = schedules.filter(s => !s.isUpcoming);

  return (
    <main className="flex flex-col items-center gap-20 px-6 pt-36 pb-40 text-stone-800 font-serif">
      {/* 타이틀 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-4 text-stone-700">
          <CalendarDays className="w-6 h-6 text-stone-500" />
          <span className="text-xs tracking-widest uppercase">Schedule</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 font-serif mb-4">
          공연 일정
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          비쥬아트의 예정된 공연과 지난 공연들을 소개합니다.
        </p>
      </motion.section>

      {/* 다가오는 공연 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-stone-800">다가오는 공연</h2>
        <div className="flex flex-col gap-4">
          {upcoming.map((event, idx) => (
            <div
              key={idx}
              className="border border-stone-200 bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-stone-900 mb-1">{event.title}</h3>
              <p className="text-stone-700 text-sm">{event.date} | {event.location}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 지난 공연 */}
      {past.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl w-full"
        >
          <h2 className="text-2xl font-semibold mt-10 mb-6 text-stone-800">지난 공연</h2>
          <div className="flex flex-col gap-4">
            {past.map((event, idx) => (
              <div
                key={idx}
                className="border border-stone-100 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-medium text-stone-900 mb-1">{event.title}</h3>
                <p className="text-stone-600 text-sm">{event.date} | {event.location}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </main>
  );
}
