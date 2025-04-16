'use client';

import { schedules } from '@/data/schedule-data';

export default function AdminSchedulePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">공연 일정 관리</h2>
      <ul className="space-y-4">
        {schedules.map((schedule) => (
          <li key={schedule.title + schedule.date} className="border rounded p-4 bg-white shadow-sm">
            <p className="font-semibold">{schedule.title}</p>
            <p className="text-sm text-gray-600">{schedule.date} @ {schedule.location}</p>
            <div className="mt-2 flex gap-2">
              <button className="text-blue-600 hover:underline">수정</button>
              <button className="text-red-500 hover:underline">삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}