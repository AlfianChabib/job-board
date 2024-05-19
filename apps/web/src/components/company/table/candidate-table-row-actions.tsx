'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { downloadResume } from '@/helper/download-resume';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ScheduleForm from '../form/ScheduleForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '@/service/application-service';
import UserProfileSheet from '../UserProfileSheet';
import { toast } from 'sonner';

interface CandidateTableRowActionsProps<TData> {
  row: Row<TData>;
  resume: string;
  username: string;
  id: number;
  userProfileId: number;
}

export function CandidateTableRowActions<TData>({
  row,
  resume,
  username,
  id,
  userProfileId,
}: CandidateTableRowActionsProps<TData>) {
  const [showSheetinterview, setShowSheetInterview] = useState(false);
  const [showSheetProfile, setShowSheetProfile] = useState(false);
  const queryClient = useQueryClient();
  const status = row.getValue('status');

  const { mutate: acceptCandidate } = useMutation({
    mutationFn: (applicationId: number) => {
      return applicationService.acceptOffer(applicationId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-candidates'] });
    },
    onError: (res) => toast.error(res.message),
  });

  const { mutate: hirecandidate } = useMutation({
    mutationFn: (applicationId: number) => {
      return applicationService.hireCandidate(applicationId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-candidates'] });
    },
    onError: (res) => toast.error(res.message),
  });

  function handleAccept(applicationId: number) {
    toast('Accepting offer...', {
      description: `Accepting offer for ${username}`,
      closeButton: true,
      action: { label: 'Accept', onClick: () => acceptCandidate(applicationId) },
    });
  }

  function handleHire(applicationId: number) {
    toast('Hiring candidate...', {
      description: `Hiring candidate for ${username}`,
      closeButton: true,
      action: { label: 'Hire', onClick: () => hirecandidate(applicationId) },
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => downloadResume(resume)}>Download Resume</DropdownMenuItem>
          {status === 'Offer' ? (
            <DropdownMenuItem onClick={() => handleAccept(id)}>Accept Offer</DropdownMenuItem>
          ) : (
            status !== 'Interview' && (
              <DropdownMenuItem onClick={() => setShowSheetInterview(true)}>Schedule Interview</DropdownMenuItem>
            )
          )}
          <DropdownMenuItem onClick={() => setShowSheetProfile(true)}>View Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleHire(id)}>Hire</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet open={showSheetinterview} onOpenChange={setShowSheetInterview}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Schedule Interview to {username}</SheetTitle>
            <ScheduleForm applicationId={id} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Sheet open={showSheetProfile} onOpenChange={setShowSheetProfile}>
        <SheetContent className="md:max-w-xl w-full">
          <SheetHeader>
            <SheetTitle>{username} Profile</SheetTitle>
            <UserProfileSheet userProfileId={userProfileId} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
