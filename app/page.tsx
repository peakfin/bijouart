'use client';

import { motion } from 'framer-motion';
import { hero, philosophy, clients } from '@/data/data';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-28 px-6 pt-36 pb-40 text-center text-stone-800 font-serif">
      {/* Hero Section */}
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
      >
        <div className="aspect-[1024/750] w-full">
          <img
            src="/images/hero-v1.png" // 새 이미지 파일명으로 저장
            alt="Bijouart 메인 이미지"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </motion.section>

      {/* 예술 철학 Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl w-full border border-stone-300 bg-white/20 backdrop-blur-sm p-10 rounded-xl shadow-md text-left"
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.15em] text-center text-stone-800 mb-4">
          예&nbsp;&nbsp;술&nbsp;&nbsp;철&nbsp;&nbsp;학
        </h2>
        <div className="h-[1px] w-16 bg-stone-400 opacity-30 mx-auto mb-8" />

        {philosophy.map((para, idx) => (
          <p
            key={idx}
            className="text-stone-700 leading-loose mb-5 font-light text-[1.05rem]"
          >
            {para}
          </p>
        ))}
      </motion.section>

      {/* 클라이언트 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-5xl w-full border border-stone-300 bg-white/15 backdrop-blur-sm p-10 rounded-xl shadow-md text-left"
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.15em] text-center text-stone-800 mb-4">
          클&nbsp;&nbsp;라&nbsp;&nbsp;이&nbsp;&nbsp;언&nbsp;&nbsp;트
        </h2>
        <div className="h-[1px] w-16 bg-stone-400 opacity-30 mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-base text-stone-700">
          {clients.map((name) => (
            <div
              key={name}
              className="border border-stone-200 rounded-md px-4 py-3 bg-white/20 hover:bg-white/30 transition text-center shadow-sm backdrop-blur-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}