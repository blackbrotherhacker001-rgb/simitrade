
import { MarketsHeader } from '@/components/markets/header';

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <MarketsHeader />
      <main>
        {children}
      </main>
    </div>
  );
}
