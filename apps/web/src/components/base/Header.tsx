import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import LinkButton from '../elements/LinkButton';

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-slate-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper className="h-full">
        <nav className="flex h-full items-center">
          <Link href="/" className="text-base text-primary hover:text-muted-foreground">
            <h1 className="text-2xl font-bold">I-Need</h1>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <LinkButton variant="outline" href="/login/user" className="hover:text-primary">
              Get Started
            </LinkButton>
            <LinkButton variant="default" href="/login/company">
              For Company
            </LinkButton>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
