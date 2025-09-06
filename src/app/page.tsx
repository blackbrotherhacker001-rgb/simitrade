
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { user, setNeedsLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    } else {
      setNeedsLogin(true);
    }
  }, [user, router, setNeedsLogin]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
