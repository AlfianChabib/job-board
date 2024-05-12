'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import FormInput from '@/components/elements/FormInput';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerCompanySchema, RegisterCompanySchema } from '@/schema/auth-schema';
import { Button } from '@/components/ui/button';
import { authService } from '@/service/auth-service';
import { useLoading } from '@/hooks/use-loading';
import { useAlertMessage } from '@/hooks/use-alert-message';

export default function RegisterCompanyForm() {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();

  const form = useForm<RegisterCompanySchema>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: { email: '', password: '', companyName: '', confirmPassword: '' },
  });

  const onSubmit = (value: RegisterCompanySchema) => {
    setLoading(true);
    console.log(value);
    authService
      .registerCompany(value)
      .then((res) => {
        setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
        form.reset();
      })
      .catch((error) => {
        setAlertMessage({ title: 'Error', message: error.message, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {alertMessage && <AlertMessage {...alertMessage} />}
      <Form {...form}>
        <form className="flex w-full flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput<RegisterCompanySchema>
            control={form.control}
            type="text"
            name="companyName"
            aria-label="Company name"
          />
          <FormInput<RegisterCompanySchema> control={form.control} type="email" name="email" aria-label="Email" />
          <FormInput<RegisterCompanySchema>
            control={form.control}
            type="password"
            name="password"
            aria-label="Password"
          />
          <FormInput<RegisterCompanySchema>
            control={form.control}
            type="password"
            name="confirmPassword"
            aria-label="Confirm Password"
          />
          <Button type="submit" disabled={loading}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
