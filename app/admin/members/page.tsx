'use client';

import { useState, useEffect } from 'react';
import { members as initialMembers } from '@/data/members';
import type { Member } from '@/data/members';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const [name, setName] = useState('');
  const [instrument, setInstrument] = useState('');
  const [isLeader, setIsLeader] = useState(false);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    if (editIndex !== null) {
      const member = members[editIndex];
      setName(member.name);
      setInstrument(member.instrument);
      setIsLeader(member.isLeader ?? false);
      setDescription(member.description ?? '');
      setPreviewUrl(member.image);
    } else {
      setName('');
      setInstrument('');
      setIsLeader(false);
      setDescription('');
      setImageFile(null);
      setPreviewUrl(null);
    }
  }, [editIndex]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !instrument.trim()) {
      alert('이름과 악기를 입력해주세요.');
      return;
    }

    const newMember: Member = {
      name,
      instrument,
      isLeader,
      description,
      image: imageFile ? `/images/${name}.jpg` : '/images/placeholder.jpg',
    };

    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = newMember;
      setMembers(updated);
    } else {
      if (members.some((m) => m.name === name)) {
        alert('이미 동일한 이름의 멤버가 있습니다.');
        return;
      }
      setMembers([newMember, ...members]);
    }

    // 상태 초기화
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const confirmed = window.confirm(`${members[index].name} 멤버를 삭제할까요?`);
    if (!confirmed) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🎻 멤버 관리</h2>

      <div className="mb-10 border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-4">
          {editIndex !== null ? '멤버 수정' : '새 멤버 추가'}
        </h3>
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
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              프로필 사진 업로드
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="미리보기"
                className="mt-4 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>
          <div className="md:col-span-2 flex justify-end gap-4">
            {editIndex !== null && (
              <button
                onClick={() => setEditIndex(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {editIndex !== null ? '저장' : '추가'}
            </button>
          </div>
        </div>
      </div>

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
            {members.map((member, i) => (
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
                    onClick={() => setEditIndex(i)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-4 h-4 inline-block mr-1" /> 수정
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" /> 삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
