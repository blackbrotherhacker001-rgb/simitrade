
'use client';

import { Mountain } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Image from 'next/image';

export function Logo() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      {theme.logo ? (
         <Image src={theme.logo} alt={theme.name} width={32} height={32} />
      ) : (
         <Mountain className="h-8 w-8 text-primary" />
      )}
      <h1 className="text-2xl font-bold text-foreground">{theme.name}</h1>
    </div>
  );
}
