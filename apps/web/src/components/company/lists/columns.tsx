'use client';

import { Job } from '@/model/job';
import { ColumnDef } from '@tanstack/react-table';

export const jobsColumns: ColumnDef<Job>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'jobType',
    header: 'JobType',
  },
  {
    accessorKey: 'registrationDeadline',
    header: 'Registration Deadline',
    cell: ({ getValue }) => {
      return new Date(getValue() as string).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    },
  },
  {
    accessorKey: 'classificationInfo.classification.title',
    header: 'Classification',
  },
];
