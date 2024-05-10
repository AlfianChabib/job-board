'use client';

import { AlertMessageProps } from '@/components/elements/AlertMessage';
import FormDate from '@/components/elements/FormDate';
import FormInput from '@/components/elements/FormInput';
import FormSelect from '@/components/elements/FormSelect';
import FormTextarea from '@/components/elements/FormTextarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { workType } from '@/lib/constants';
import { postJobSchema, PostJobSchema } from '@/schema/job-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Classification, dataService, SubClassification } from '@/service/data-service';
import Loading from '@/app/(root)/loading';

export default function CreateJobForm() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);

  const { data: classifications, isLoading } = useQuery<Classification[]>({
    queryKey: ['classifications'],
    queryFn: dataService.classification,
  });
  const { data: subClassifications, isLoading: subLoading } = useQuery<SubClassification[]>({
    queryKey: ['sub-classifications'],
    queryFn: dataService.subClassification,
  });

  const form = useForm<PostJobSchema>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      requirements: '',
      type: '',
      registrationDeadline: undefined,
      classification: undefined,
      subClassification: undefined,
    },
  });

  function handleSubmit(values: PostJobSchema) {
    console.log(values);
  }

  if (isLoading || subLoading) return <Loading />;

  return (
    <div className="flex bg-background justify-between rounded-md gap-4 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-1 flex-col gap-4">
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
            name="classification"
            aria-label="Job Classification"
            placeholder="Select Classification"
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
            name="subClassification"
            aria-label="Sub Classification"
            placeholder="Select Sub Classification"
          >
            <SelectContent>
              {subClassifications?.map((item, index) => (
                <SelectItem key={index} value={String(item.id)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
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
        </form>
      </Form>
      <div className="flex flex-1 flex-col gap-2">
        <h2>Preview</h2>
      </div>
    </div>
  );
}
