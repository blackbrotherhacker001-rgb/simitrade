
'use client';

import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

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
    } else {
        router.replace('/user/overview');
    }
  }, [user, router]);

  return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
  );
}
