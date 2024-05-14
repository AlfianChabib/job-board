'use client';

import MaxWidthWrapper from '@/components/base/MaxWidthWrapper';
import { userService } from '@/service/user-service';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../loading';
import dynamic from 'next/dynamic';

const UserProfile = dynamic(() => import('@/components/user/profile/UserProfile'), { ssr: false });
const UserSkill = dynamic(() => import('@/components/user/profile/UserSkill'), { ssr: false });
const UserExperience = dynamic(() => import('@/components/user/profile/UserExperience'), { ssr: false });

export default function UserAccount() {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userService.userProfile(),
  });

  if (isLoading) return <Loading />;

  console.log(userProfile);

  return (
    <MaxWidthWrapper className="min-h-default">
      <div className="flex flex-col mx-auto md:my-4 my-2 max-w-[750px] md:gap-4 gap-2">
        <div className="bg-background border rounded-md p-4">
          <h1 className="text-xl font-semibold text-foreground/80">Account Details</h1>
        </div>
        <UserProfile userProfile={userProfile} />
        <UserSkill userSkill={userProfile?.userSkill} />
        <UserExperience userExperience={userProfile?.userExperience} />
      </div>
    </MaxWidthWrapper>
  );
}
