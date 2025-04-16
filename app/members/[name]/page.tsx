'use client';

import { useParams } from 'next/navigation';
import { members } from '@/data/members';
import { Award } from 'lucide-react';

export default function MemberDetailPage() {
  const params = useParams();
  const nameParam = decodeURIComponent(params.name as string);
  const member = members.find((m) => m.name === nameParam);

  if (!member) {
    return <div className="p-6 text-center text-stone-500">존재하지 않는 멤버입니다.</div>;
  }

  return (
    <main className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* 이미지 */}
        <div className="flex-shrink-0 md:w-[280px]">
          <img
            src={member.image}
            alt={`${member.name} 프로필`}
            className="w-full h-full object-cover object-top rounded-md border border-stone-200"
          />
        </div>

        {/* 텍스트 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold font-serif text-stone-900">{member.name}</h1>
            {member.isLeader && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 border border-stone-300 rounded px-1.5 py-0.5">
                <Award className="w-3 h-3" />
                리더
              </span>
            )}
          </div>
          <p className="text-sm text-stone-600 font-serif mb-4">{member.instrument}</p>
          <p className="text-sm text-stone-700 font-serif whitespace-pre-line leading-relaxed">
            {member.description}
          </p>
        </div>
      </div>
    </main>
  );
}