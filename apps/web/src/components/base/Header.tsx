'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import Logout from '../auth/logout';
import DefaultMenu from './DefaultMenu';
import { useSession } from '../providers/session-provider';
import UserMenu from './UserMenu';
import CompanyMenu from './CompanyMenu';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-slate-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper className="h-full">
        <nav className="flex h-full items-center">
          <Link href="/" className="text-base text-primary hover:text-muted-foreground">
            <h1 className="text-2xl font-bold">I-Need</h1>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            {session?.isAuthenticated ? session.role === 'Company' ? <CompanyMenu /> : <UserMenu /> : <DefaultMenu />}
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
