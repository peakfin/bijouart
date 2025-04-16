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

  const generateMembersTS = (members: Member[]) => {
    const escapeBackticks = (str: string) => str.replace(/`/g, '\`');
    const entries = members.map((m) => {
      return `  {
    name: '${m.name}',
    instrument: '${m.instrument}',
    image: '${m.image}',
    isLeader: ${m.isLeader ?? false},
    description: \`${escapeBackticks(m.description ?? '')}\`,
  }`;
    });
    return `export type Member = {
  name: string;
  instrument: string;
  image: string;
  isLeader?: boolean;
  description?: string;
};

export const members: Member[] = [
${entries.join(',\n')}
];`;
  };

  const syncToServer = async (updatedMembers: Member[]) => {
    const tsContent = generateMembersTS(updatedMembers);
    try {
      const res = await fetch('https://bijouart-api.onrender.com/update-members-ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tsContent }),
      });
      if (!res.ok) throw new Error('TS 업데이트 실패');
    } catch (err) {
      console.error('🔁 TS 서버 전송 실패:', err);
    }
  };

  const uploadImage = async (name: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);

    try {
      const res = await fetch('https://bijouart-api.onrender.com/upload-image', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('이미지 업로드 실패');
      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error('🖼 이미지 업로드 실패:', err);
      return '/images/placeholder.jpg';
    }
  };

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

  const handleSubmit = async () => {
    if (!name.trim() || !instrument.trim()) {
      alert('이름과 악기를 입력해주세요.');
      return;
    }

    let imageUrl = previewUrl ?? '/images/placeholder.jpg';
    if (imageFile) {
      imageUrl = await uploadImage(name, imageFile);
    }

    const newMember: Member = {
      name,
      instrument,
      isLeader,
      description,
      image: imageUrl,
    };

    let updated: Member[];
    if (editIndex !== null) {
      updated = [...members];
      updated[editIndex] = newMember;
      setMembers(updated);
    } else {
      if (members.some((m) => m.name === name)) {
        alert('이미 동일한 이름의 멤버가 있습니다.');
        return;
      }
      updated = [newMember, ...members];
      setMembers(updated);
    }

    await syncToServer(updated);
    setEditIndex(null);
  };

  const handleDelete = async (index: number) => {
    const confirmed = window.confirm(`${members[index].name} 멤버를 삭제할까요?`);
    if (!confirmed) return;
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    await syncToServer(updated);
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