'use client';

import { useEffect, useState } from 'react';
import type { Member } from '@/data/members';
import ModalPortal from '@/components/ModalPortal';

type Props = {
  member: Member;
  onSave: (updated: Member, newImage?: File | null) => void;
  onClose: () => void;
};

export default function EditMemberModal({ member, onSave, onClose }: Props) {
  const [name, setName] = useState(member.name);
  const [instrument, setInstrument] = useState(member.instrument);
  const [isLeader, setIsLeader] = useState(member.isLeader ?? false);
  const [description, setDescription] = useState(member.description ?? '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setName(member.name);
    setInstrument(member.instrument);
    setIsLeader(member.isLeader ?? false);
    setDescription(member.description ?? '');
    setPreviewUrl(member.image); // 기존 이미지 미리보기
  }, [member]);

  const handleSubmit = () => {
    if (!name.trim() || !instrument.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // ✅ 이 부분에서 imageFile은 나중에 서버로 업로드되어야 함
    onSave(
      {
        ...member,
        name,
        instrument,
        isLeader,
        description,
        // 이미지 경로는 서버 업로드 후 반영 필요
        image: imageFile ? `/images/${name}.jpg` : member.image,
      },
      imageFile
    );

    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <ModalPortal>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
        <div className="w-[95vw] sm:w-[80vw] md:w-[60vw] max-h-[90vh] overflow-y-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 relative">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            멤버 정보 수정
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 좌측 입력 */}
            <div className="flex flex-col gap-4">
              <input
                className="border border-gray-300 px-4 py-2 rounded text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
              />
              <input
                className="border border-gray-300 px-4 py-2 rounded text-sm"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                placeholder="악기"
              />
              <label className="text-sm flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={isLeader}
                  onChange={(e) => setIsLeader(e.target.checked)}
                />
                리더 여부
              </label>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="w-32 h-32 mt-4 object-cover rounded border"
                  />
                )}
              </div>
            </div>

            {/* 우측 소개글 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                소개글
              </label>
              <textarea
                className="border border-gray-300 px-4 py-2 rounded w-full h-48 resize-none text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="소개글을 입력해주세요"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}