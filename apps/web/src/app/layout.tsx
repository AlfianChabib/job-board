import type { Metadata } from 'next';
import TanstackProviders from '@/components/providers/tanstack-providers';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import { CurrentSessionProvider } from '@/components/providers/session-provider';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'I-Need',
  description: 'Search jobs & career advice with I-Need.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-primary/5 font-sans antialiased', fontSans.variable)}>
        <TanstackProviders>
          <CurrentSessionProvider>
            {children}
            <Toaster position="top-center" richColors />
          </CurrentSessionProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}
