'use client';

import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppliedList from '@/components/user/activity/AppliedList';
import InterviewList from '@/components/user/activity/InterviewList';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Activity() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const handleTabs = (value: string) => {
    params.set('tab', value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <MaxWidthWrapper className="max-w-5xl flex flex-col min-h-default md:py-4 py-2 md:gap-4 gap-2">
      <div className="flex flex-col w-full md:p-4 p-2 bg-background rounded-md">
        <h1 className="text-xl font-semibold text-foreground/80">Activity</h1>
        <p className="text-sm text-foreground/70">
          Manage your activity here, and get all the information on the jobs you apply for
        </p>
      </div>
      <Tabs defaultValue={tab || 'applied'} className="w-full bg-background md:p-4 p-2">
        <TabsList>
          <TabsTrigger value="applied" onClick={() => handleTabs('applied')}>
            Applied
          </TabsTrigger>
          <TabsTrigger value="interview" onClick={() => handleTabs('interview')}>
            Interview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applied">
          <AppliedList />
        </TabsContent>
        <TabsContent value="interview">
          <InterviewList />
        </TabsContent>
      </Tabs>
    </MaxWidthWrapper>
  );
}
