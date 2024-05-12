'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import FormDate from '@/components/elements/FormDate';
import FormInput from '@/components/elements/FormInput';
import FormSelect from '@/components/elements/FormSelect';
import FormTextarea from '@/components/elements/FormTextarea';
import Loading from '@/app/(root)/loading';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem } from '@/components/ui/select';
import { defaultJobValue, workType } from '@/lib/constants';
import { postJobSchema, PostJobSchema } from '@/schema/job-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dataService } from '@/service/data-service';
import { jobService } from '@/service/job-service';
import { useLoading } from '@/hooks/use-loading';
import { useAlertMessage } from '@/hooks/use-alert-message';

export default function CreateJobForm() {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const { data: classifications, isLoading } = useQuery({
    queryKey: ['classifications'],
    queryFn: dataService.classification,
  });

  const { data: subClassifications, isLoading: subLoading } = useQuery({
    queryKey: ['sub-classifications'],
    queryFn: dataService.subClassification,
  });

  const form = useForm<PostJobSchema>({
    resolver: zodResolver(postJobSchema),
    defaultValues: defaultJobValue,
  });

  const { mutate } = useMutation({
    mutationFn: (data: PostJobSchema) => {
      setLoading(true);
      return jobService.postJob(data);
    },
    onSuccess: () => {
      setLoading(false);
      setAlertMessage({ type: 'success', message: 'Job created successfully', title: 'Success' });
      queryClient.invalidateQueries({ queryKey: ['company-jobs'] });
      form.reset({ ...defaultJobValue });
    },
    onError: () => {
      setLoading(false);
      setAlertMessage({ type: 'error', message: 'Failed to create job', title: 'Error' });
    },
  });

  function handleSubmit(values: PostJobSchema) {
    mutate(values);
  }

  if (isLoading || subLoading) return <Loading />;

  return (
    <div className="flex flex-col bg-background items-center justify-between gap-4 rounded-md p-4 border my-2">
      {alertMessage && <AlertMessage {...alertMessage} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col w-full gap-4">
            <FormInput<PostJobSchema>
              control={form.control}
              type="text"
              name="title"
              aria-label="Job Title"
              placeholder="Enter a simple job title (e.g. Sales Assistant)"
            />
            <FormTextarea<PostJobSchema>
              control={form.control}
              name="description"
              aria-label="Job Description"
              placeholder="Enter a description of the job (e.g. I want to be a sales assistant)"
            />
            <FormInput<PostJobSchema>
              control={form.control}
              type="text"
              name="location"
              aria-label="Location"
              placeholder="Enter a location, city or region (e.g. Central Jakarta Jakarta)"
            />
            <FormTextarea<PostJobSchema>
              control={form.control}
              name="requirements"
              aria-label="Requirements"
              placeholder="Enter a requirements, (e.g. Minimum of 3 years of experience)"
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <FormSelect<PostJobSchema>
              control={form.control}
              name="type"
              aria-label="Job Type"
              placeholder="Select Work Type"
            >
              <SelectContent>
                {workType.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
            <FormSelect<PostJobSchema>
              control={form.control}
              name="classificationId"
              aria-label="Job Classification"
              placeholder="Select Classification"
              onSelect={() => form.reset({ subClassificationId: undefined })}
            >
              <SelectContent>
                {classifications?.map((item, index) => (
                  <SelectItem key={index} value={String(item.id)}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
            <FormSelect<PostJobSchema>
              control={form.control}
              name="subClassificationId"
              aria-label="Sub Classification"
              placeholder="Select Sub Classification"
              disabled={form.getValues('classificationId') === 0}
            >
              {form.watch('classificationId') === 0 ? null : (
                <SelectContent>
                  {subClassifications?.map((item, index) => {
                    if (item.classificationId === Number(form.getValues('classificationId').toString())) {
                      return (
                        <SelectItem key={index} value={String(item.id)}>
                          {item.title}
                        </SelectItem>
                      );
                    }
                  })}
                </SelectContent>
              )}
            </FormSelect>
            <FormDate<PostJobSchema>
              control={form.control}
              name="registrationDeadline"
              label="Registration Deadline"
              placeholder="Select a deadline "
            />
            <Button type="submit" disabled={loading}>
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
