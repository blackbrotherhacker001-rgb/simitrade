import { AdminStats } from "@/components/admin/admin-stats";
import { MarketControl } from "@/components/admin/market-control";
import { MarketParameters } from "@/components/admin/market-parameters";
import { UserManagement } from "@/components/admin/user-management";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <AdminStats />
      <MarketControl />
      <MarketParameters />
      <UserManagement />
    </div>
  );
}
