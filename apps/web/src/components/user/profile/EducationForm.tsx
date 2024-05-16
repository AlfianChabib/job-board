'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import FormCheckbox from '@/components/elements/FormCheckbox';
import FormInput from '@/components/elements/FormInput';
import FormSelect from '@/components/elements/FormSelect';
import FormTextarea from '@/components/elements/FormTextarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem } from '@/components/ui/select';
import { useAlertMessage } from '@/hooks/use-alert-message';
import { useLoading } from '@/hooks/use-loading';
import { yearsArray } from '@/lib/year-array';
import { UserEducationSchema, userEducationSchema } from '@/schema/user-schema';
import { userService } from '@/service/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function EducationForm() {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: UserEducationSchema) => userService.addUserEducation(data),
    onSuccess: () => {
      setLoading(false);
      setAlertMessage({ title: 'Success', message: 'Education added successfully', type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: () => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: 'Failed to add education', type: 'error' });
    },
  });

  const form = useForm<UserEducationSchema>({
    resolver: zodResolver(userEducationSchema),
    defaultValues: {
      courseOrQualification: '',
      institution: '',
      description: '',
      finishedYear: '',
      isComplete: true,
    },
  });

  const onSubmit = (data: UserEducationSchema) => {
    setLoading(true);
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      {alertMessage && <AlertMessage {...alertMessage} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-2">
          <FormInput<UserEducationSchema>
            control={form.control}
            name="courseOrQualification"
            aria-label="Course or Qualification"
          />
          <FormInput<UserEducationSchema> control={form.control} name="institution" aria-label="Institution" />
          <FormCheckbox<UserEducationSchema> control={form.control} name="isComplete" label="Is Completed" />
          {form.getValues('isComplete') && (
            <FormSelect<UserEducationSchema>
              control={form.control}
              name="finishedYear"
              aria-label="Finished Year"
              placeholder="Select Year"
              className="max-w-36"
            >
              <SelectContent>
                {yearsArray.map((item, index) => (
                  <SelectItem key={index} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
          )}
          <FormTextarea<UserEducationSchema> control={form.control} name="description" aria-label="Description" />
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
