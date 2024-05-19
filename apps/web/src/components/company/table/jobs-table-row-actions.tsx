'use client';

import { Job } from '@/model/job';
import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService } from '@/service/job-service';

interface JobsTableRowActionsProps {
  row: Row<Job>;
  jobId: number;
}

export default function JobsTableRowActions({ row, jobId }: JobsTableRowActionsProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteJob } = useMutation({
    mutationFn: (jobId: number) => jobService.deleteJob(jobId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['company-jobs'] });
      toast.success(res.message);
    },
    onError: (res) => toast.error(res.message),
  });

  const handleDelete = (jobId: number) => {
    toast('Deleting job...', {
      description: `Are you sure you want to delete this job?`,
      action: { label: 'Delete', onClick: () => deleteJob(jobId) },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleDelete(jobId)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
