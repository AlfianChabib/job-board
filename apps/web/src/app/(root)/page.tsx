'use client';

import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { useSession } from '@/components/providers/SessionProvider';

export default function Home() {
  const session = useSession();

  console.log(session);

  return (
    <MaxWidthWrapper className="flex min-h-screen flex-col">
      <h1>I-Need</h1>
    </MaxWidthWrapper>
  );
}
