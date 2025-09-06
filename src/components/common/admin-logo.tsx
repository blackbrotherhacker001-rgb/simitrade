
'use client';

import { Paintbrush } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Image from 'next/image';

export function AdminLogo() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      {theme.logo ? (
        <Image src={theme.logo} alt={theme.name} width={32} height={32} />
      ) : (
        <Paintbrush className="h-8 w-8 text-primary" />
      )}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-foreground">{theme.name}</h1>
      </div>
    </div>
  );
}
