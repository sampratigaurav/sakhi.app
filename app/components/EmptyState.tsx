'use client';

import { ClipboardList } from 'lucide-react';

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <ClipboardList className="h-16 w-16 text-gray-300 mb-3" />
      <div className="text-lg font-semibold text-gray-900">{message || 'No bookings found yet.'}</div>
      <div className="text-sm text-gray-600 mt-1">When you get your first job, it will appear here.</div>
    </div>
  );
}
