import { members } from '@/data/members';
import { notFound } from 'next/navigation';

type Props = {
  params: { name: string };
};

export default function MemberDetailPage({ params }: Props) {
  const member = members.find((m) => encodeURIComponent(m.name) === params.name);

  if (!member) return notFound();

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* 이미지: 좌측 고정 */}
        <img
          src={member.image}
          alt={`${member.name} 프로필`}
          className="w-full md:w-[320px] h-auto object-cover object-top rounded-lg shadow"
        />

        {/* 텍스트: 우측 확장 */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 font-serif">{member.name}</h1>
          <p className="text-lg text-gray-600 mb-4 font-serif">{member.instrument}</p>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line font-serif">
            {member.description}
          </p>
        </div>
      </div>
    </main>
  );
}