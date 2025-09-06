
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function AdminRedirect() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                router.replace('/admin/dashboard');
            } else {
                router.replace(`/user/${user.walletAddress}/overview`);
            }
        } else {
            // If no user, redirect to home to trigger login
            router.replace('/');
        }
    }, [user, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}
