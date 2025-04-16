'use client';

import { motion } from 'framer-motion';
import MemberCard from '@/components/MemberCard';
import { members } from '@/data/members';
import { Users } from 'lucide-react';

export default function MembersPage() {
  return (
    <motion.main
      className="px-6 py-12 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-serif font-semibold text-stone-800 mb-10 flex items-center gap-2">
        <Users className="w-6 h-6 text-stone-500" />
        멤버 소개
      </h1>

      <div className="grid grid-cols-2 gap-6 min-w-[360px]">
        {members.map((member, idx) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <MemberCard {...member} />
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}