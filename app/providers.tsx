'use client';

import { LanguageProvider } from '@/src/context/LanguageContext';
import { ToastProvider } from '@/src/context/ToastContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>{children}</ToastProvider>
    </LanguageProvider>
  );
}

