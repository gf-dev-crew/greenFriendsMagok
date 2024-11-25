import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nook',
  description: '녹색친구들 마곡 입주예정자들을 위한 정보 공유 사이트',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col text-base antialiased">
        <div className="mx-auto w-full max-w-[480px] bg-white">
          <Header />
          <main className="flex-grow pt-[50px]">
            <h1 className="sr-only">녹색친구들 마곡</h1>
            {children}
          </main>
          <div id="portal"></div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
