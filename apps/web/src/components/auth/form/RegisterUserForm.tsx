'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import FormInput from '@/components/elements/FormInput';
import { Form } from '@/components/ui/form';
import { registerUserSchema, RegisterUserSchema } from '@/schema/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { authService } from '@/service/auth-service';
import { useLoading } from '@/hooks/use-loading';
import { useAlertMessage } from '@/hooks/use-alert-message';

export default function RegisterUserForm() {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();

  const form = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: { email: '', password: '', username: '', confirmPassword: '' },
  });

  const onSubmit = (value: RegisterUserSchema) => {
    setLoading(true);
    authService
      .registerUser(value)
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
          <FormInput<RegisterUserSchema> control={form.control} type="text" name="username" aria-label="Userename" />
          <FormInput<RegisterUserSchema> control={form.control} type="email" name="email" aria-label="Email" />
          <FormInput<RegisterUserSchema> control={form.control} type="password" name="password" aria-label="Password" />
          <FormInput<RegisterUserSchema>
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
