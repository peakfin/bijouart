'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/about', label: '비쥬 소개' },
    { href: '/members', label: '멤버 소개' },
    { href: '/schedule', label: '공연 일정' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full px-6 py-4 border-b border-stone-200 bg-white/80 backdrop-blur-md fixed top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <img src="/images/bijouart-logo-ori.png" alt="Bijouart Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold font-serif text-stone-800">Bijouart</span>
      </Link>

        <div className="flex gap-4 text-sm text-stone-600">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`transition hover:text-stone-900 ${
                  isActive ? 'text-stone-900 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}