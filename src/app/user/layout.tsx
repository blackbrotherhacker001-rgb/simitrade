

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
  const { user, needsLogin, setNeedsLogin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    // If no user is loaded yet and login is not prompted, prompt it.
    if (!user && !needsLogin) {
        setNeedsLogin(true);
    }

    if (user) {
        // Redirect admins away from user pages
        if (user.isAdmin) {
            router.push('/admin/dashboard');
            return;
        }
        // Redirect to their own dashboard if they try to access another user's
        if (params.userId && user.walletAddress !== params.userId) {
            router.push(`/user/${user.walletAddress}/overview`);
        }
    }
  }, [user, router, params, needsLogin, setNeedsLogin]);
  
  const isTradePage = pathname.includes('/trade') || pathname.includes('/binary-trading');
  const isUserDashboardPage = pathname.startsWith('/user/');

  // Show a loading/authentication screen while we wait for user data
  if (!user || (params.userId && user.walletAddress !== params.userId)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Authenticating...</p>
      </div>
    );
  }

  // For dedicated trade pages, show only the children (which have their own trade-specific layout)
  if (isTradePage) {
     return <>{children}</>;
  }
  
  // For standard user dashboard pages, show the sidebar and header
  if (isUserDashboardPage) {
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

  // Fallback for any other case
  return <>{children}</>;
}
