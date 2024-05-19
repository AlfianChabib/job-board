'use client';

import Loading from '@/app/(root)/loading';
import { companyService } from '@/service/company-service';
import { useQuery } from '@tanstack/react-query';
import { Label } from '../ui/label';
import { formatYearMonth, getDistance } from '@/lib/date';
import { Mail, MapPinned, Phone } from 'lucide-react';

interface UserProfileSheetProps {
  userProfileId: number;
}

export default function UserProfileSheet({ userProfileId }: UserProfileSheetProps) {
  const { data: candidateProfile, isLoading } = useQuery({
    queryKey: ['candidate-profile', userProfileId],
    queryFn: () => companyService.getCandidateProfile(userProfileId),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="flex relative flex-col w-full min-h-screen overflow-y-scroll">
      <div className="flex flex-col w-full gap-4 my-4 h-full absolute top-1 z-50 mr-2">
        <div className="flex flex-col gap-2 w-full border rounded-md md:p-4 p-2">
          <div className="flex gap-4 items-center text-foreground/70">
            <Mail />
            <p>{candidateProfile?.email}</p>
          </div>
          <div className="flex gap-4 items-center text-foreground/70">
            <Phone />
            <p>{candidateProfile?.phone}</p>
          </div>
          <div className="flex gap-4 items-center text-foreground/70">
            <MapPinned />
            <p>{candidateProfile?.address}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <Label className="text-base">Skills</Label>
          <div className="flex flex-wrap w-full gap-2 border rounded-md md:p-4 p-2">
            {candidateProfile?.userSkill.map((skill, index) => (
              <p
                key={index}
                className="whitespace-nowrap py-1 px-2 bg-primary/80 capitalize rounded-full text-background"
              >
                {skill.skillTitle}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-base">Education</Label>
          <ul className="flex w-full gap-2">
            {candidateProfile?.userEducation.map((education, index) => (
              <li key={index} className="flex flex-col text-foreground/80 border p-4 rounded-md w-full">
                <p className="font-semibold">{education.courseOrQualification}</p>
                <p className="mb-2">{education.institution}</p>
                {education.isComplete ? (
                  <p className="flex gap-1 text-sm text-foreground/70">End {education.finishedYear}</p>
                ) : (
                  <p className="flex gap-1 text-sm text-foreground/70">Present</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <Label className="text-base">Experience</Label>
          <ul className="flex flex-col w-full gap-2">
            {candidateProfile?.userExperience.map((experience, index) => (
              <li key={index} className="flex flex-col text-foreground/80 border p-4 rounded-md">
                <p className="font-semibold">{experience.jobTitle}</p>
                <p>{experience.companyName}</p>
                <div className="flex gap-1 text-sm">
                  <p>{formatYearMonth(experience.started)}</p>
                  <span>-</span>
                  {experience.stillInRole ? (
                    <span>Present</span>
                  ) : (
                    <div className="flex gap-1">
                      <p>{formatYearMonth(experience.ended)}</p>
                      <p>({getDistance(experience.started, experience.ended)})</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
