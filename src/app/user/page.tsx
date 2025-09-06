
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function UserRedirect() {
    const router = useRouter();
    const { user, needsLogin, setNeedsLogin } = useAuth();

    useEffect(() => {
        if (user) {
            router.replace(`/user/${user.walletAddress}/overview`);
        } else if (!needsLogin) {
            setNeedsLogin(true);
        }
    }, [user, router, needsLogin, setNeedsLogin]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}
