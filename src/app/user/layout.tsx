

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { DashboardSidebar } from '@/components/user/dashboard-sidebar';
import { Header } from '@/components/user/header';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/');
    } else if (user.isAdmin) {
        // Optional: redirect admin to admin dashboard if they land here.
        // router.push('/admin');
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
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-[#161A25] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
