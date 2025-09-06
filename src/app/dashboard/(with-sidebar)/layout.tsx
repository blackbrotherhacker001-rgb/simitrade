
'use client';

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardWithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-[#111318] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
