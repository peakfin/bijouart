'use client';

import { useState } from 'react';
import type { Schedule } from '@/data/schedule-data';
import { schedules as initialSchedules } from '@/data/schedule-data';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    isUpcoming: true,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const generateSchedulesTS = (schedules: Schedule[]) => {
    const entries = schedules.map((s) => {
      return `  {
    title: '${s.title}',
    date: '${s.date}',
    location: '${s.location}',
    isUpcoming: ${s.isUpcoming ?? true},
  }`;
    });

    return `export type Schedule = {
  title: string;
  date: string;
  location: string;
  isUpcoming?: boolean;
};

export const schedules: Schedule[] = [
${entries.join(',\n')}
];`;
  };

  const syncToServer = async (updated: Schedule[]) => {
    const tsContent = generateSchedulesTS(updated);
    try {
      const res = await fetch('https://bijouart-api.onrender.com/update-schedules-ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tsContent }),
      });
      if (!res.ok) throw new Error('API 실패');
      console.log('✅ schedules.ts 커밋 완료');
    } catch (err) {
      console.error('❌ 스케줄 API 연동 실패:', err);
    }
  };

  const handleAdd = async () => {
    if (!form.title || !form.date || !form.location) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const newSchedule: Schedule = {
      title: form.title,
      date: form.date,
      location: form.location,
      isUpcoming: form.isUpcoming,
    };

    let updated: Schedule[] = [];
    if (editIndex !== null) {
      updated = [...schedules];
      updated[editIndex] = newSchedule;
      setEditIndex(null);
    } else {
      updated = [newSchedule, ...schedules];
    }

    setSchedules(updated);
    await syncToServer(updated);
    setForm({ title: '', date: '', location: '', isUpcoming: true });
  };

  const handleDelete = async (index: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
    await syncToServer(updated);
  };

  const handleEdit = (index: number) => {
    const item = schedules[index];
    setForm({
      title: item.title,
      date: item.date,
      location: item.location,
      isUpcoming: item.isUpcoming ?? true,
    });
    setEditIndex(index);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🗓️ 공연일정 관리</h2>

      <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">
          {editIndex !== null ? '공연 수정' : '새 공연 추가'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="공연 제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="날짜 (예: 2025년 5월 3일 (토))"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="장소"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isUpcoming}
              onChange={(e) => setForm({ ...form, isUpcoming: e.target.checked })}
            />
            다가오는 공연 여부
          </label>
          <div className="md:col-span-2 flex justify-end gap-3">
            {editIndex !== null && (
              <button
                onClick={() => {
                  setForm({ title: '', date: '', location: '', isUpcoming: true });
                  setEditIndex(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                취소
              </button>
            )}
            <button
              onClick={handleAdd}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              {editIndex !== null ? '수정 완료' : '추가'}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">날짜</th>
              <th className="px-4 py-2">공연명</th>
              <th className="px-4 py-2">장소</th>
              <th className="px-4 py-2">상태</th>
              <th className="px-4 py-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{schedule.date}</td>
                <td className="px-4 py-2">{schedule.title}</td>
                <td className="px-4 py-2">{schedule.location}</td>
                <td className="px-4 py-2">
                  {schedule.isUpcoming ? (
                    <span className="text-green-600">예정</span>
                  ) : (
                    <span className="text-gray-500">종료</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="text-blue-600 hover:text-blue-800"
                    title="수정"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:text-red-800"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
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