'use client';

import Link from 'next/link';
import { useCurrentSession } from '../providers/session-provider';
import { Button, buttonVariants } from '../ui/button';

export default function DashboardHeader() {
  const session = useCurrentSession();
  return (
    <div className="flex w-full my-4 p-4 items-center justify-between bg-background rounded-md">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground/80">Hi {session?.username}</h1>
        <p className="text-sm text-foreground/70">
          You&apos;re in the right place to find your next hire. Get started by creating your first job ad.
        </p>
      </div>
      <Link href="/company/jobs/create" className={buttonVariants({ size: 'lg' })}>
        Create a job
      </Link>
    </div>
  );
}
