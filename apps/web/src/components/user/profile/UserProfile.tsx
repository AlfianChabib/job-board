'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAlertMessage } from '@/hooks/use-alert-message';
import { useLoading } from '@/hooks/use-loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import React from 'react';
import { userProfilePayloadSchema, UserProfilePayloadSchema } from '@/schema/user-schema';
import FormInput from '@/components/elements/FormInput';
import { UserProfile } from '@/model/user';
import FormTextarea from '@/components/elements/FormTextarea';
import { userService } from '@/service/user-service';

interface UserProfileProps {
  userProfile: UserProfile | undefined;
}

export default function UserProfile({ userProfile }: UserProfileProps) {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const form = useForm<UserProfilePayloadSchema>({
    resolver: zodResolver(userProfilePayloadSchema),
    defaultValues: {
      username: userProfile?.username || '',
      address: userProfile?.address || '',
      phone: userProfile?.phone || '',
      summary: userProfile?.summary || '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: UserProfilePayloadSchema) => {
      return userService.updateUserProfile(data);
    },
    onSuccess: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
    onError: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: res.message, type: 'error' });
    },
  });

  const onSubmit = (value: UserProfilePayloadSchema) => {
    setLoading(true);
    mutate(value);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1  gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">User Profile</h2>
      <div className="flex flex-col w-full gap-3 md:col-span-3 col-span-1 ">
        {alertMessage && <AlertMessage {...alertMessage} />}
        <Form {...form}>
          <form className="flex w-full flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput<UserProfilePayloadSchema>
              control={form.control}
              type="text"
              name="username"
              aria-label="User Name"
              placeholder="Enter User Name"
            />
            <FormInput<UserProfilePayloadSchema>
              control={form.control}
              type="text"
              name="address"
              aria-label="Address"
              placeholder="Enter your address"
            />
            <FormInput<UserProfilePayloadSchema>
              control={form.control}
              type="text"
              name="phone"
              aria-label="Phone"
              placeholder="Enter your phone"
            />
            <FormTextarea<UserProfilePayloadSchema>
              control={form.control}
              name="summary"
              aria-label="Personal summary"
              placeholder="Enter your personal summary"
            />
            <Button type="submit" className="w-max" disabled={loading}>
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
