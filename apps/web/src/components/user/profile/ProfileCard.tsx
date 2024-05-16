'use client';

import Loading from '@/app/(root)/loading';
import { buttonVariants } from '@/components/ui/button';
import { userService } from '@/service/user-service';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Microscope, Phone, Scale, SquareLibrary } from 'lucide-react';
import Link from 'next/link';

export default function ProfileCard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.userProfile(),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col bg-[#051A49]/90 text-background/90 rounded-xl p-4 gap-4">
      <h1 className="text-2xl font-bold">{profile?.username}</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div className="w-full col-span-1">
          <div className="flex gap-3 items-center">
            <MapPin size={18} />
            <p>{profile?.address}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Mail size={18} />
            <p>{profile?.email}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Phone size={18} />
            <p>{profile?.phone}</p>
          </div>
        </div>
        <div className="w-full col-span-1">
          <div className="flex gap-3 items-center">
            <SquareLibrary size={18} />
            <p>Skill :</p>
            <p className="text-background/70">{profile?.userSkill.length} skills</p>
          </div>
          <div className="flex gap-3 items-center">
            <Microscope size={18} />
            <p>Experience :</p>
            <p className="text-background/70">{profile?.userExperience.length} experiences</p>
          </div>
          <div className="flex gap-3 items-center">
            <Scale size={18} />
            <p>Education :</p>
            <p className="text-background/70">{profile?.userEducation.length} educations</p>
          </div>
        </div>
      </div>
      <Link href="/account/" className={buttonVariants({ variant: 'secondary', className: 'w-max' })}>
        Edit profile
      </Link>
    </div>
  );
}
