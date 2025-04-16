// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: '--font-noto-serif-kr',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Bijouart",
  description: "보석처럼 빛나는 클래식 연주자들",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`min-h-screen font-serif text-stone-800 antialiased ${geistSans.variable} ${geistMono.variable} ${notoSerifKr.variable}`}
      >
        <LayoutShell>{children}</LayoutShell>
        <div id="modal-root" />
      </body>
    </html>
  );
}