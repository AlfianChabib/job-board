'use client';
import FormDate from '@/components/elements/FormDate';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useLoading } from '@/hooks/use-loading';
import { ReschedulePayload, rescheduleSchema } from '@/schema/application-schema';
import { applicationService } from '@/service/application-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RescheduleModalProps {
  interviewId: number;
}
export default function RescheduleModal({ interviewId }: RescheduleModalProps) {
  const [showDoialog, setShowDialog] = useState(false);
  const { loading, setLoading } = useLoading();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const interviewIdParams = searchParams.get('interviewId');

  useEffect(() => {
    if (interviewIdParams) setShowDialog(true);
  }, [interviewIdParams, setShowDialog]);

  const form = useForm<ReschedulePayload>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      interviewId: interviewIdParams ? parseInt(interviewIdParams) : interviewId,
      rescheduleDate: undefined,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload: ReschedulePayload) => applicationService.rescheduleInterview(payload),
    onSuccess: (res) => {
      setShowDialog(false);
      toast.success(res.message);
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ['user-interview'] });
    },
    onError: (res) => {
      toast.error(res.message);
      setLoading(false);
    },
  });

  const handleSubmit = (payload: ReschedulePayload) => {
    setLoading(true);
    mutate(payload);
  };

  return (
    <Dialog open={showDoialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button size="sm">Reschedule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Interview</DialogTitle>
          <DialogDescription>
            You can only reschedule an interview once, if the company refuses the first schedule will become the
            permanent schedule
          </DialogDescription>
          <div className="py-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                <FormDate<ReschedulePayload> control={form.control} name="rescheduleDate" label="Reschedule Date" />
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    Submit
                  </Button>
                  <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
