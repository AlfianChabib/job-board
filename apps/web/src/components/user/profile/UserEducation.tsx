'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { IUserEducation } from '@/model/user';
import EducationForm from './EducationForm';

interface UserEducationProps {
  userEducation: IUserEducation[] | undefined;
}

export default function UserEducation({ userEducation }: UserEducationProps) {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1  gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">User Education</h2>
      <div className="flex flex-col w-full gap-3 md:col-span-3 col-span-1">
        <p className="text-foreground/80 text-sm">Tell employers about your education.</p>
        {userEducation && userEducation.length > 0 ? (
          <ul className="flex flex-col w-full gap-2">
            {userEducation.map((education, index) => (
              <li key={index} className="flex flex-col text-foreground/80 border p-4 rounded-md">
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
        ) : null}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" className="w-max">
              Add Education
            </Button>
          </SheetTrigger>
          <SheetContent className="md:max-w-md">
            <SheetHeader>
              <SheetTitle>Add Education</SheetTitle>
              <EducationForm />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
