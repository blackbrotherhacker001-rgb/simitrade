
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  descriptionColor?: string;
  icon: React.ReactNode;
  iconBg: string;
  borderColor: string;
}

export function StatCard({ title, value, description, descriptionColor = 'text-muted-foreground', icon, iconBg, borderColor }: StatCardProps) {
  return (
    <Card className={cn("bg-card/30 border-l-4", borderColor)}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={cn("text-xs mt-1", descriptionColor)}>{description}</p>
        </div>
        <div className={cn("p-3 rounded-full", iconBg)}>
            {icon}
        </div>
      </CardContent>
    </Card>
  );
}
