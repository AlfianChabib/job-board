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
import { getMonths, getYears } from '@/lib/year-array';
import { UserExperiencePayload } from '@/model/user';
import { UserExperienceSchema, userExperienceSchema } from '@/schema/user-schema';
import { userService } from '@/service/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ExperienceForm() {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();
  const years = getYears();
  const months = getMonths();

  const { mutate } = useMutation({
    mutationFn: (data: UserExperiencePayload) => {
      return userService.addUserExperience(data);
    },
    onSuccess: () => {
      setLoading(false);
      setAlertMessage({ title: 'Success', message: 'Experience added successfully', type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: () => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: 'Failed to add experience', type: 'error' });
    },
  });

  const form = useForm<UserExperienceSchema>({
    resolver: zodResolver(userExperienceSchema),
    defaultValues: {
      companyName: '',
      jobTitle: '',
      description: '',
      startedDate: { month: '', year: '' },
      endedDate: { month: '', year: '' },
      stillInRole: false,
    },
  });

  const onSubmit = (values: UserExperienceSchema) => {
    setLoading(true);

    const startDate = new Date(parseInt(values.startedDate.year), months.indexOf(values.startedDate.month) + 1);
    let endDate: Date | undefined = undefined;
    if (values.endedDate && values.endedDate.year && values.endedDate.month) {
      endDate = new Date(parseInt(values.endedDate.year), months.indexOf(values.endedDate.month) + 1);
    }

    const data: UserExperiencePayload = {
      companyName: values.companyName,
      jobTitle: values.jobTitle,
      description: values.description,
      started: startDate,
      ended: endDate,
      stillInRole: values.stillInRole,
    } as const;

    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      {alertMessage && <AlertMessage {...alertMessage} />}
      <Form {...form}>
        <form className="flex w-full flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput<UserExperienceSchema> control={form.control} type="text" name="jobTitle" aria-label="Job Title" />
          <FormInput<UserExperienceSchema>
            control={form.control}
            type="text"
            name="companyName"
            aria-label="Company Name"
          />
          <div className="grid grid-cols-3 gap-2 items-end">
            <FormSelect<UserExperienceSchema>
              control={form.control}
              name="startedDate.year"
              aria-label="Started"
              placeholder="Year"
            >
              <SelectContent>
                {years.map((item, index) => (
                  <SelectItem key={index} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
            <FormSelect<UserExperienceSchema> control={form.control} name="startedDate.month" placeholder="Month">
              <SelectContent>
                {months.map((item, index) => (
                  <SelectItem key={index} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
            <FormCheckbox<UserExperienceSchema> control={form.control} name="stillInRole" label="Still in role?" />
          </div>
          {!form.getValues('stillInRole') && (
            <div className="grid grid-cols-3 gap-2 items-end">
              <FormSelect<UserExperienceSchema>
                control={form.control}
                name="endedDate.year"
                aria-label="Ended"
                placeholder="Year"
              >
                <SelectContent>
                  {years.map((item, index) => (
                    <SelectItem key={index} value={item.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </FormSelect>
              <FormSelect<UserExperienceSchema> control={form.control} name="endedDate.month" placeholder="Month">
                <SelectContent>
                  {months.map((item, index) => (
                    <SelectItem key={index} value={item.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </FormSelect>
            </div>
          )}
          <FormTextarea<UserExperienceSchema>
            control={form.control}
            name="description"
            aria-label="Description (recomended)"
          />
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
