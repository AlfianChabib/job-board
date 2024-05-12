import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Interview() {
  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col">
        <div className="flex w-full my-4 p-4 items-center justify-between bg-background rounded-md">
          <div>
            <h1 className="text-xl font-semibold text-foreground/80">Interview List</h1>
            <p className="text-sm text-foreground/70">Manage your interview here</p>
          </div>
          <Link href="/company/jobs" className={buttonVariants({ size: 'lg' })}>
            Jobs List
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
