'use client';

import { Button } from '@/components/ui/button';
import SelectSkill from './SelectSkill';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/service/user-service';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IUserSkill } from '@/model/user';

interface UserSkillProps {
  userSkill: IUserSkill[] | undefined;
}

export default function UserSkill({ userSkill }: UserSkillProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (skillId: number) => userService.deleteUserSkill(skillId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  const handleDeleteSkill = (skillId: number) => {
    mutate(skillId);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1  gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">User Skills</h2>
      <div className="flex flex-col w-full gap-3 md:col-span-3 col-span-1">
        <p className="text-foreground/80 text-sm">Help employers find you by showcasing all of your skills.</p>
        {userSkill && userSkill.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 w-full rounded-md p-1">
            {userSkill.map((skill) => (
              <div
                key={skill.id}
                className="flex gap-2 items-center text-foreground/80 bg-primary/10 py-2 px-3 rounded-md font-medium"
              >
                <p className="capitalize">{skill.skillTitle}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="p-0 hover:bg-white w-7 h-7  ">
                      <X size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Skill</DialogTitle>
                      <DialogDescription>Are you sure you want to delete {skill.skillTitle} skill?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={() => handleDeleteSkill(skill.id)}>
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        ) : null}
        <SelectSkill />
      </div>
    </div>
  );
}
