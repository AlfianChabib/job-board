import { Footer } from '@/components/base/Footer';
import Header from '@/components/base/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
