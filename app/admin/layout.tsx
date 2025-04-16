'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdmin') === 'true';

    // 로그인 페이지는 예외로 허용
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }

    if (!isLoggedIn) {
      router.replace('/admin/login');
    } else {
      setIsAdmin(true);
    }

    setReady(true);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.replace('/admin/login');
  };

  if (!ready) return null;
  if (!isAdmin && pathname !== '/admin/login') return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
      <div id="modal-root" />

      {/* 헤더 */}
      <div className="w-full border-b px-6 py-4 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold">Bijouart Admin</h1>
        {pathname !== '/admin/login' && (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            로그아웃
          </button>
        )}
      </div>

      {/* 본문 */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {pathname !== '/admin/login' && (
          <nav className="mb-6 flex gap-4 text-sm text-gray-600">
            <a href="/admin/members" className="hover:underline">멤버 관리</a>
            <a href="/admin/schedule" className="hover:underline">공연일정 관리</a>
          </nav>
        )}
        {children}
      </div>
    </div>
  );
}