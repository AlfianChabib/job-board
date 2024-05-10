'use client';

import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { useCurrentSession } from '@/components/providers/session-provider';

export default function Home() {
  const session = useCurrentSession();

  console.log(session);

  return (
    <MaxWidthWrapper className="flex min-h-screen flex-col">
      <h1>I-Need</h1>
    </MaxWidthWrapper>
  );
}
