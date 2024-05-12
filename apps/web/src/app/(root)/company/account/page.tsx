'use client';

import dynamic from 'next/dynamic';
import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { companyService } from '@/service/company-service';
import { useQuery } from '@tanstack/react-query';

const CompanyProfile = dynamic(() => import('@/components/company/profile/CompanyProfile'), { ssr: false });
const CompanyLogo = dynamic(() => import('@/components/company/profile/CompanyLogo'), { ssr: false });

export default function CompanyAccount() {
  const { data: companyProfile, isLoading } = useQuery({
    queryKey: ['company-profile'],
    queryFn: companyService.getConmpanyProfile,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col mx-auto md:my-4 my-2 max-w-[750px] md:gap-4 gap-2">
        <div className="bg-background border rounded-md p-4">
          <h1 className="text-xl font-semibold text-foreground/80">Account Details</h1>
        </div>
        <CompanyLogo logo={companyProfile?.logo} name={companyProfile?.companyName} />
        <CompanyProfile companyProfile={companyProfile} />
      </div>
    </MaxWidthWrapper>
  );
}
