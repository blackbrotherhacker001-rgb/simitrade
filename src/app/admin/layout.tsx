

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { AdminHeader } from '@/components/admin/admin-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // If there's no user, we might be waiting for localStorage to load.
      // A more robust solution might wait a moment, but for now,
      // a simple redirect if the user is explicitly not an admin is safer.
    } else if (!user.isAdmin) {
      router.push(`/user/${user.walletAddress}/overview`);
    }
  }, [user, router]);

  if (!user || !user.isAdmin) {
    // Avoid rendering the children if the user is not an admin.
    // This prevents flashing of admin content for non-admin users.
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
