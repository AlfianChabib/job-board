'use client';

import Loading from '@/app/(root)/loading';
import { Button } from '@/components/ui/button';
import { formatLocaleDate } from '@/lib/date';
import { userService } from '@/service/user-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Building2, CalendarDays, MapPin, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { setInterviewStatus } from '@/lib/utils';
import { applicationService } from '@/service/application-service';
import { useLoading } from '@/hooks/use-loading';
import { toast } from 'sonner';
import Link from 'next/link';
import RescheduleModal from './RescheduleModal';

export default function InterviewList() {
  const { loading, setLoading } = useLoading();
  const queryClient = useQueryClient();

  const { data: interviewJobs, isLoading } = useQuery({
    queryKey: ['user-interview'],
    queryFn: () => userService.getInterviewsJobs(),
  });

  const { mutate: agree } = useMutation({
    mutationFn: (data: any) => applicationService.agreeInterviewUser(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['user-interview'] });
      setLoading(false);
      toast.success(res.message);
    },
    onError: (res) => {
      setLoading(false);
      toast.error(res.message);
    },
  });

  const handleAgree = (interviewId: number) => {
    setLoading(true);
    agree(interviewId);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col md:gap-4 gap-2 my-4">
      {interviewJobs?.map((interview, index) => {
        const interviewStatus = setInterviewStatus(interview.interviewStatus);

        return (
          <div key={index} className="flex flex-col md:p-4 p-2 gap-2 border rounded-md">
            <Badge className="w-max" variant={interviewStatus === 'Canceled' ? 'destructive' : 'default'}>
              {interviewStatus}
            </Badge>
            <h2 className="text-xl font-semibold text-foreground/90">{interview.Application.Job.title}</h2>
            <div className="flex flex-col gap-1 text-foreground/70">
              <div className="flex items-center space-x-4 ">
                <Building2 size={20} />
                <p>{interview.Application.Job.CompanyProfile.companyName}</p>
              </div>
              {interview.interviewType === 'Offline' ? (
                <div className="flex sm:items-center space-x-4 items-start">
                  <MapPin size={20} />
                  <div className="flex items-center flex-wrap gap-1">
                    <p className="whitespace-nowrap">{interview.interviewLocation}</p>
                    <Badge variant="outline" className="text-foreground/70">
                      {interview.interviewType}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="flex sm:items-center space-x-4 items-start">
                  <LinkIcon size={20} />
                  <div className="flex items-center flex-wrap gap-1">
                    <Link href={interview.interviewUrl} className="underline">
                      {interview.interviewUrl}
                    </Link>
                    <Badge variant="outline" className="text-foreground/70">
                      {interview.interviewType}
                    </Badge>
                  </div>
                </div>
              )}
              {interviewStatus === 'Accepted' && (
                <div className="flex items-center space-x-4">
                  <CalendarDays size={20} />
                  <p>{formatLocaleDate(interview.interviewSchedule.toString())}</p>
                </div>
              )}
            </div>
            {interviewStatus === 'Scheduling' ? (
              <div className="flex flex-col border rounded-md p-2 text-foreground/90">
                <p>
                  This company request a schedule interview date on{' '}
                  <strong>{formatLocaleDate(interview.interviewSchedule.toString())}</strong> do you agree with it?
                </p>
                <p className="text-sm">if disagree you can reschedule</p>
                <div className="block space-x-2 my-2">
                  <Button size="sm" onClick={() => handleAgree(interview.id)} disabled={loading}>
                    Agree
                  </Button>
                  <RescheduleModal interviewId={interview.id} />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
