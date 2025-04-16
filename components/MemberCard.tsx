import Link from 'next/link';
import { Award } from 'lucide-react'; // 또는 ShieldCheck, Star 등

type MemberCardProps = {
  name: string;
  instrument: string;
  image: string;
  isLeader?: boolean;
};

export default function MemberCard({ name, instrument, image, isLeader = false }: MemberCardProps) {
  return (
    <Link href={`/members/${encodeURIComponent(name)}`} className="block">
      <div className="bg-white/60 rounded-xl shadow-sm p-4 hover:shadow-md transition border border-stone-100">
        <img
          src={image}
          alt={`${name} 프로필`}
          className="rounded-lg w-full h-140 object-cover object-top mb-4"
        />

        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-1 font-serif">
            {name}
            {isLeader && (
            <span className="inline-flex items-center gap-1 text-sm text-amber-700 font-medium px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50">
                <Award className="w-4 h-4 text-amber-700" />
                리더
            </span>
            )}
          </h2>
        </div>

        <p className="text-gray-600 font-serif">{instrument}</p>
      </div>
    </Link>
  );
}