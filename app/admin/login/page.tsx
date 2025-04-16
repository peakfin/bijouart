'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const ADMIN_PASSWORD = 'adminbijou'; // ✅ 테스트용

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      router.replace('/admin'); // ✅ 안정적인 라우팅
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <h1 className="text-xl font-semibold mb-4 text-center">🔐 어드민 로그인</h1>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          로그인
        </button>
      </div>
    </div>
  );
}