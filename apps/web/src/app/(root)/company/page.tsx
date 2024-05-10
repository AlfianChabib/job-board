'use client';

import { useCurrentSession } from '@/components/providers/session-provider';

export default function CompanyPage() {
  const session = useCurrentSession();

  console.log(session);

  return <div>company page</div>;
}
