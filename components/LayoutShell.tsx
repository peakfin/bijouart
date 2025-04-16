'use client';

import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Footer from './Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <TopBar />}
      <div className={!isAdmin ? 'pt-20' : ''}>
        {children}
      </div>
      {!isAdmin && <Footer />}
    </>
  );
}