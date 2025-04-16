import MemberCard from '@/components/MemberCard';
import { members } from '@/data/members';
import { Users } from 'lucide-react';

export default function MembersPage() {
  return (
    <main className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif font-semibold text-stone-800 mb-10 flex items-center gap-2">
        <Users className="w-6 h-6 text-stone-500" />
        멤버 소개
      </h1>

      {/* 항상 2열 유지 */}
      <div className="grid grid-cols-2 gap-6 min-w-[360px]">
        {members.map((member) => (
          <MemberCard
            key={member.name}
            name={member.name}
            instrument={member.instrument}
            image={member.image}
            isLeader={member.isLeader}
          />
        ))}
      </div>
    </main>
  );
}