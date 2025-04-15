import MemberCard from '@/components/MemberCard';
import { members } from '@/data/members';
import { Users } from 'lucide-react';

export default function MembersPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
    <h1 className="text-4xl font-serif font-semibold text-stone-800 mb-6 flex items-center gap-2">
    <Users className="w-6 h-6 text-stone-500" />
    멤버 소개
    </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
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