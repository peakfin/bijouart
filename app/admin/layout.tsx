export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans relative">
        {/* 모달 포탈용 루트 */}
        <div id="modal-root" />
  
        {/* 상단 헤더 */}
        <div className="w-full border-b px-6 py-4 bg-white shadow-sm">
          <h1 className="text-xl font-semibold">Bijouart Admin</h1>
        </div>
  
        {/* 컨텐츠 영역 */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <nav className="mb-6 flex gap-4 text-sm text-gray-600">
            <a href="/admin/members" className="hover:underline">멤버 관리</a>
            <a href="/admin/schedule" className="hover:underline">공연일정 관리</a>
          </nav>
          {children}
        </div>
      </div>
    );
  }