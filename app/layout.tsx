import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

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
    icon: '/favicon.png', // 또는 '/favicon.ico'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen font-serif text-stone-800 antialiased ${geistSans.variable} ${geistMono.variable} ${notoSerifKr.variable}`}>
        <TopBar />
        <div className="pt-20">{children}</div> {/* TopBar 높이만큼 padding 추가 */}
        <Footer />
      </body>
    </html>
  );
}
