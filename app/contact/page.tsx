'use client';

import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';
import { contactInfo } from '@/data/contact-data';

export default function ContactPage() {
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
          <Mail className="w-6 h-6 text-stone-500" />
          <span className="text-xs tracking-widest uppercase">Contact</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 font-serif mb-4">
          연락처 안내
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          {contactInfo.description}
        </p>
      </motion.section>

      {/* 연락처 정보 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-xl w-full border border-stone-300 bg-white/20 backdrop-blur-sm p-10 rounded-xl shadow-md text-left"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-stone-600" />
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-stone-800 hover:underline text-sm"
            >
              {contactInfo.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Instagram className="w-5 h-5 text-stone-600" />
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-800 hover:underline text-sm"
            >
              @bijouartcompany
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
