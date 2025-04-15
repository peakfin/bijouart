import Link from 'next/link';
import { Crown } from 'lucide-react';

type MemberCardProps = {
  name: string;
  instrument: string;
  image: string;
  isLeader?: boolean;
};

export default function MemberCard({ name, instrument, image, isLeader = false }: MemberCardProps) {
  return (
    <Link href={`/members/${encodeURIComponent(name)}`} className="block">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
        <img
          src={image}
          alt={`${name} 프로필`}
          className="rounded-lg w-full h-140 object-cover object-top mb-4"
        />

        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-1">
            {name}
            {isLeader && (
              <span className="inline-flex items-center gap-1 text-sm text-stone-500 font-medium px-2 py-0.5 rounded-full border border-stone-300">
                <Crown className="w-4 h-4" />
                리더
              </span>
            )}
          </h2>
        </div>

        <p className="text-gray-600">{instrument}</p>
      </div>
    </Link>
  );
}