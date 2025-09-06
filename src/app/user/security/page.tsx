
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function UserSecurityRedirect() {
    const router = useRouter();
    const { user } = useAuth();
    const params = useParams();

    useEffect(() => {
        if (user) {
            router.replace(`/user/${user.walletAddress}/security`);
        } else if(params.userId) {
            router.replace(`/user/${params.userId}/security`);
        } else {
            router.replace('/');
        }
    }, [user, router, params.userId]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
}
