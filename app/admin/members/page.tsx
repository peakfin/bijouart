'use client';

import { useState } from 'react';
import { members as initialMembers } from '@/data/members';
import type { Member } from '@/data/members';
import EditMemberModal from '@/components/EditMemberModal';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const [name, setName] = useState('');
  const [instrument, setInstrument] = useState('');
  const [isLeader, setIsLeader] = useState(false);
  const [description, setDescription] = useState('');

  const [editTarget, setEditTarget] = useState<Member | null>(null);

  const handleAdd = () => {
    if (!name || !instrument) {
      alert('이름과 악기를 입력해주세요.');
      return;
    }

    if (members.some((m) => m.name === name)) {
      alert('이미 동일한 이름의 멤버가 있습니다.');
      return;
    }

    const newMember: Member = {
      name,
      instrument,
      image: '/images/placeholder.jpg',
      isLeader,
      description,
    };

    setMembers([newMember, ...members]);
    setName('');
    setInstrument('');
    setIsLeader(false);
    setDescription('');
  };

  const handleDelete = (name: string) => {
    const confirmed = window.confirm(`${name} 멤버를 삭제할까요?`);
    if (!confirmed) return;
    setMembers(members.filter((m) => m.name !== name));
  };

  const handleSave = (updated: Member) => {
    setMembers((prev) =>
      prev.map((m) => (m.name === updated.name ? updated : m))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🎻 멤버 관리</h2>

      {/* 멤버 추가 */}
      <div className="mb-10 border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-4">새 멤버 추가</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="이름"
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="악기"
            className="border px-3 py-2 rounded w-full"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isLeader}
              onChange={(e) => setIsLeader(e.target.checked)}
            />
            리더
          </label>
          <textarea
            placeholder="소개글"
            className="border px-3 py-2 rounded w-full resize-none md:col-span-2 h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded md:col-span-2 w-full"
          >
            추가
          </button>
        </div>
      </div>

      {/* 멤버 목록 */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">이름</th>
              <th className="px-4 py-2">악기</th>
              <th className="px-4 py-2">리더</th>
              <th className="px-4 py-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.name} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.instrument}</td>
                <td className="px-4 py-2">
                  {member.isLeader ? (
                    <span className="text-amber-600 font-medium">리더</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setEditTarget(member)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-4 h-4 inline-block mr-1" />
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(member.name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editTarget && (
        <EditMemberModal
          member={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}