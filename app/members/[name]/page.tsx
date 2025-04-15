import { members } from '@/data/members';
import { notFound } from 'next/navigation';

type Props = {
  params: { name: string };
};

export default async function MemberDetailPage(props: Props) {
    const { params } = props;
  
    // 여기서 먼저 널 가드를 통해 안정화
    if (!params || !params.name) {
      return notFound();
    }
  
    const decodedName = decodeURIComponent(params.name);
    const member = members.find((m) => m.name === decodedName);
  
    if (!member) return notFound();
  
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-stretch gap-8">
          <div className="flex-shrink-0 md:w-[320px]">
            <img
              src={member.image}
              alt={`${member.name} 프로필`}
              className="w-full h-full object-cover object-top rounded-lg shadow"
            />
          </div>
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