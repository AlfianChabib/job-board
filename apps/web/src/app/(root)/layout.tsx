import { Footer } from '@/components/base/Footer';
import Header from '@/components/base/Header';
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
      {children}
      <Footer />
    </main>
  );
}
