'use client';

import { ICandidate } from '@/model/candidate';
import { Job } from '@/model/job';
import { ColumnDef } from '@tanstack/react-table';
import { CandidateTableRowActions } from '../table/candidate-table-row-actions';
import { IInterviewCompany } from '@/model/company';
import InterviewTableRowActions from '../table/interview-table-row-actions';
import Link from 'next/link';

export const jobsColumns: ColumnDef<Job>[] = [
  { accessorKey: 'id', header: 'Id' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'jobType', header: 'JobType' },
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
  { accessorKey: 'classificationInfo.classification.title', header: 'Classification' },
];

export const candidateColumn: ColumnDef<ICandidate>[] = [
  { accessorKey: 'UserProfile.username', header: 'Name' },
  { accessorKey: 'Job.title', header: 'Job' },
  { accessorKey: 'UserProfile.email', header: 'Email' },
  { accessorKey: 'UserProfile.phone', header: 'Phone' },
  { accessorKey: 'UserProfile.address', header: 'Address' },
  { accessorKey: 'status', header: 'Status' },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original as ICandidate;
      const username = data.UserProfile.username;
      const resume = data.resume;
      const id = data.id;
      const userProfileId = data.UserProfile.id;

      return (
        <CandidateTableRowActions row={row} resume={resume} username={username} id={id} userProfileId={userProfileId} />
      );
    },
  },
];

export const interviewColumn: ColumnDef<IInterviewCompany>[] = [
  { accessorKey: 'Application.UserProfile.username', header: 'Candidate Name' },
  { accessorKey: 'Application.Job.title', header: 'Job' },
  {
    accessorKey: 'interviewType',
    header: 'Interview Type',
  },
  {
    accessorKey: 'interviewLocation',
    header: 'Location / Url',
    cell: ({ row }) => {
      const data = row.original;
      const interviewType = data.interviewType;

      if (interviewType === 'Online') {
        return (
          <Link className="text-primary" href={data.interviewUrl} target="_blank">
            Open Interview Url
          </Link>
        );
      }
      return data.interviewLocation;
    },
  },
  {
    accessorKey: 'interviewSchedule',
    header: 'Interview Schedule',
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
    accessorKey: 'rescheduleInterview',
    header: 'Reschedule',
    cell: ({ getValue, row }) => {
      const data = row.original;
      const status = data.interviewStatus;
      const date = getValue();
      if (!date) return '';
      if (status === 'Rescheduling') {
        return new Date(date as string).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        });
      }
    },
  },
  {
    accessorKey: 'interviewStatus',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original;
      const status = data.interviewStatus;
      const candidateName = data.Application.UserProfile.username;
      return <InterviewTableRowActions row={row} id={data.id} status={status} candidateName={candidateName} />;
    },
  },
];
