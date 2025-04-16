'use client';

import { motion } from 'framer-motion';
import { philosophy, visions } from '@/data/about-data';
import { Gem } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center gap-24 px-6 pt-28 pb-40 text-stone-800 font-serif">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="flex justify-center items-center gap-3 mb-4 text-stone-700">
          <Gem className="w-6 h-6 text-stone-500" />
          <span className="text-xs tracking-widest uppercase">About Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 font-serif mb-6">
          비쥬아트 소개
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          클래식 음악의 보석, 비쥬아트는 다양한 분야의 예술가들이 모여 창의적이고 따뜻한 공연 문화를 만들어갑니다.
        </p>
      </motion.section>

      {/* 예술 철학 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl w-full border border-stone-300 bg-white/20 backdrop-blur-sm p-10 rounded-xl shadow-md text-left"
      >
        <h2 className="text-2xl font-semibold mb-4">예술 철학</h2>
        {philosophy.map((para, idx) => (
          <p
            key={idx}
            className="text-stone-700 leading-relaxed mb-4"
          >
            {para}
          </p>
        ))}
      </motion.section>

      {/* 활동 방향 / 비전 */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-5xl w-full border border-stone-300 bg-white/20 backdrop-blur-sm p-10 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-8 text-center">비전과 활동 방향</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {visions.map((item, i) => (
            <div key={i} className="border border-stone-200 rounded-xl bg-white/20 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-stone-700 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}