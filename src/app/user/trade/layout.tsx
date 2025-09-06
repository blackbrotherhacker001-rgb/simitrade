'use client';

import { Header } from '@/components/dashboard/header';

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 bg-[#0b0b0d] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
