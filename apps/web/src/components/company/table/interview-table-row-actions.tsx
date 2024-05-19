'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '@/service/application-service';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface InterviewTableRowActionsProps<TData> {
  row: Row<TData>;
  id: number;
  status: string;
  candidateName: string;
}

export default function InterviewTableRowActions<TData>({
  id,
  status,
  candidateName,
}: InterviewTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();

  console.log(candidateName);

  const { mutate: acceptReschedule } = useMutation({
    mutationFn: (interviewId: number) => {
      return applicationService.acceptRescheduleCompany(interviewId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-interviews'] });
    },
    onError: (res) => toast.error(res.message),
  });

  const { mutate: declineReschedule } = useMutation({
    mutationFn: (interviewId: number) => {
      return applicationService.declineRescheduleCompany(interviewId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-interviews'] });
    },
    onError: (res) => toast.error(res.message),
  });

  const { mutate: finishInterview } = useMutation({
    mutationFn: (interviewId: number) => {
      return applicationService.finishInterviewCompany(interviewId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-interviews'] });
    },
    onError: (res) => toast.error(res.message),
  });

  const { mutate: cancelInterview } = useMutation({
    mutationFn: (interviewId: number) => {
      return applicationService.cancelInterview(interviewId);
    },
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['company-interviews'] });
    },
    onError: (res) => toast.error(res.message),
  });

  const handleDecline = (interviewId: number) => {
    toast('Declining interview...', {
      description: `Declining interview for ${candidateName}`,
      closeButton: true,
      action: { label: 'Decline', onClick: () => declineReschedule(interviewId) },
    });
  };

  const handleAccept = (interviewId: number) => {
    toast('Accepting interview...', {
      description: `Accepting interview for ${candidateName}`,
      closeButton: true,
      action: { label: 'Accept', onClick: () => acceptReschedule(interviewId) },
    });
  };

  const handleFinish = (interviewId: number) => {
    toast('Finishing interview...', {
      description: `Finishing interview for ${candidateName}`,
      closeButton: true,
      action: { label: 'Finish', onClick: () => finishInterview(interviewId) },
    });
  };

  const handleCancel = (interviewId: number) => {
    toast('Cancelling interview...', {
      description: `Cancelling interview for ${candidateName}`,
      closeButton: true,
      action: { label: 'Cancel', onClick: () => cancelInterview(interviewId) },
    });
  };

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
          {status === 'Rescheduling' ? (
            <>
              <DropdownMenuItem onClick={() => handleAccept(id)}>Accept Reschedule</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDecline(id)}>Decline Reschedule</DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => handleFinish(id)}>Finish Interview</DropdownMenuItem>
          )}
          {status !== 'Finished' && (
            <DropdownMenuItem onClick={() => handleCancel(id)}>Cancel Interview</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
