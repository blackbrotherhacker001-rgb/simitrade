
'use client';

import { TransactionsHistory } from '@/components/dashboard/transactions-history';

export default function TransactionsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <TransactionsHistory />
    </div>
  );
}
