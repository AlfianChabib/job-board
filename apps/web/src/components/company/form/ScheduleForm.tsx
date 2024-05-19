'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import FormDate from '@/components/elements/FormDate';
import FormInput from '@/components/elements/FormInput';
import FormSelect from '@/components/elements/FormSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem } from '@/components/ui/select';
import { useAlertMessage } from '@/hooks/use-alert-message';
import { useLoading } from '@/hooks/use-loading';
import { ScheduleInterviewPayload, scheduleInterviewSchema } from '@/schema/application-schema';
import { applicationService } from '@/service/application-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface ScheduleFormProps {
  applicationId: number;
}

const interviewType = ['Online', 'Offline'];

export default function ScheduleForm({ applicationId }: ScheduleFormProps) {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const form = useForm<ScheduleInterviewPayload>({
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues: {
      applicationId,
      interviewType: 'Online',
      interviewSchedule: new Date(),
      interviewLocation: '',
      interviewUrl: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload: ScheduleInterviewPayload) => {
      return applicationService.scheduleInterview(payload);
    },
    onSuccess: () => {
      setAlertMessage({ title: 'Success', message: 'Interview scheduled successfully', type: 'success' });
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['company-candidates'] });
      form.reset();
    },
    onError: () => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: 'Failed to schedule interview', type: 'error' });
    },
  });

  const handleSubmit = (values: ScheduleInterviewPayload) => {
    setLoading(true);
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-4">
      {alertMessage && <AlertMessage {...alertMessage} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <FormDate<ScheduleInterviewPayload>
            control={form.control}
            name="interviewSchedule"
            label="Interview Date"
            placeholder="Select interview date"
          />
          <FormSelect<ScheduleInterviewPayload>
            control={form.control}
            name="interviewType"
            aria-label="Interview Type"
            placeholder="Select interview type"
          >
            <SelectContent>
              {interviewType.map((item, index) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </FormSelect>
          {form.getValues('interviewType') === 'Offline' ? (
            <FormInput<ScheduleInterviewPayload>
              control={form.control}
              name="interviewLocation"
              type="text"
              aria-label="Interview Location"
              placeholder="Enter interview location"
            />
          ) : (
            <FormInput<ScheduleInterviewPayload>
              control={form.control}
              name="interviewUrl"
              type="text"
              aria-label="Interview Url"
              placeholder="Enter interview url"
            />
          )}
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
