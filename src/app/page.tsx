'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/common/logo';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(user.isAdmin ? '/admin' : '/dashboard');
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
