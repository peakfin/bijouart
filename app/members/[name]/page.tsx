import { members } from '@/data/members';
import { notFound } from 'next/navigation';

type Props = {
  params: { name: string };
};

export default function MemberDetailPage({ params }: Props) {
  const member = members.find((m) => encodeURIComponent(m.name) === params.name);

  if (!member) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <img
        src={member.image}
        alt={`${member.name} 프로필`}
        className="w-full h-80 object-cover rounded-lg shadow mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
      <p className="text-lg text-gray-600 mb-4">{member.instrument}</p>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{member.description}</p>
    </main>
  );
}