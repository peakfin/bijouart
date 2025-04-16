import Link from 'next/link';
import { Award } from 'lucide-react';

type MemberCardProps = {
  name: string;
  instrument: string;
  image: string;
  isLeader?: boolean;
};

export default function MemberCard({
  name,
  instrument,
  image,
  isLeader = false,
}: MemberCardProps) {
  return (
    <Link href={`/members/${encodeURIComponent(name)}`} className="block">
      <div
        className="aspect-[3/4] bg-white/60 rounded-xl p-3 sm:p-4 border border-stone-100 shadow-sm 
        transition-transform duration-300 ease-in-out transform 
        hover:scale-[1.03] hover:shadow-lg cursor-pointer flex flex-col"
      >
        {/* 이미지 비율 고정 */}
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-3">
          <img
            src={image}
            alt={`${name} 프로필`}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-stone-800 flex items-center gap-1 font-serif">
              {name}
              {isLeader && (
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-amber-700 font-medium px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50">
                  <Award className="w-4 h-4 text-amber-700" />
                  리더
                </span>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-serif">{instrument}</p>
        </div>
      </div>
    </Link>
  );
}