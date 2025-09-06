

'use client';

import { useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
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
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.push('/');
    } else if (user.isAdmin) {
        router.push('/admin/dashboard');
    } else if (params.userId && user.walletAddress !== params.userId) {
        // If the logged-in user is not the one in the URL, redirect to their own dashboard
        router.push(`/user/${user.walletAddress}/overview`);
    }
  }, [user, router, params]);
  
  const isTradingPage = pathname.includes('/trade');

  if (!user || (params.userId && user.walletAddress !== params.userId)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Authenticating...</p>
      </div>
    );
  }

  if (isTradingPage) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 bg-[#161A25] overflow-y-auto">
                {children}
            </main>
        </div>
    )
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
