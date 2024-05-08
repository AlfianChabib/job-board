import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const MaxWidthWrapper = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <section className={cn('mx-auto w-full max-w-screen-xl px-2.5 lg:px-10', className)}>{children}</section>;
};

export default MaxWidthWrapper;
