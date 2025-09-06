
'use client';

import { Header } from '@/components/dashboard/trade/header';

export default function BinaryLayout({
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
