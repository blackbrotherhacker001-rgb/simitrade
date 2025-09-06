
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function UserOverviewRedirect() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if(user) {
            router.replace(`/user/${user.walletAddress}/overview`);
        } else {
            router.replace('/');
        }
    }, [user, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}
