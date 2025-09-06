
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TradePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/trade');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting to the new trade page...</p>
    </div>
  );
}
