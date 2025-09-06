
'use client';

import { Header } from '@/components/user/header';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 bg-[#161A25] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
