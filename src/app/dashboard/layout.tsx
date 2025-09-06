
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* The header can be part of the specific page now */}
        <main className="flex-1 bg-[#161A25] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
