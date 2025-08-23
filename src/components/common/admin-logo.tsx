
import { Bot } from 'lucide-react';
import { Badge } from '../ui/badge';

export function AdminLogo() {
  return (
    <div className="flex items-center gap-2">
      <Bot className="h-8 w-8 text-primary" />
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-foreground">CryptoSim</h1>
        <p className="text-xs text-muted-foreground -mt-1">Admin</p>
      </div>
    </div>
  );
}
