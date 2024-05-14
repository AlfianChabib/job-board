'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { formatYearMonth, getDistance } from '@/lib/date';
import { IUserExperience } from '@/model/user';
import ExperienceForm from './ExperienceForm';

interface UserExperienceProps {
  userExperience: IUserExperience[] | undefined;
}

export default function UserExperience({ userExperience }: UserExperienceProps) {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1  gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">User Experience</h2>
      <div className="flex flex-col w-full gap-3 md:col-span-3 col-span-1">
        <p className="text-foreground/80 text-sm">
          The more you let employers know about your experience, the more you can stand out.
        </p>
        {userExperience && userExperience.length > 0 ? (
          <ul className="flex flex-col w-full gap-2">
            {userExperience.map((experience, index) => (
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
        ) : null}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" className="w-max">
              Add Experience
            </Button>
          </SheetTrigger>
          <SheetContent className="md:max-w-md">
            <SheetHeader>
              <SheetTitle>Add Experience</SheetTitle>
              <ExperienceForm />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
