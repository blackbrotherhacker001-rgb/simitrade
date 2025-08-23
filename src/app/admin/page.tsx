import { MarketControl } from "@/components/admin/market-control";
import { UserManagement } from "@/components/admin/user-management";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6">
        <MarketControl />
        <UserManagement />
      </div>
    </div>
  );
}
