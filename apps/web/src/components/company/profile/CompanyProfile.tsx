'use client';

import FormInput from '@/components/elements/FormInput';
import FormTextarea from '@/components/elements/FormTextarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertMessage } from '@/hooks/use-alert-message';
import { useLoading } from '@/hooks/use-loading';
import { CompanyProfileData } from '@/model/company';
import { companyService } from '@/service/company-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CompanyProfilePayloadSchema, companyProfilePayloadSchema } from '@/schema/company-scehema';
import AlertMessage from '@/components/elements/AlertMessage';

interface CompanyProfileProps {
  companyProfile: CompanyProfileData | undefined;
}

export default function CompanyProfile({ companyProfile }: CompanyProfileProps) {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const form = useForm<CompanyProfilePayloadSchema>({
    resolver: zodResolver(companyProfilePayloadSchema),
    defaultValues: {
      companyName: companyProfile?.companyName || '',
      address: companyProfile?.address || '',
      description: companyProfile?.description || '',
      phone: companyProfile?.phone || '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: CompanyProfilePayloadSchema) => {
      return companyService.updateCompanyProfile(data);
    },
    onSuccess: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      queryClient.invalidateQueries({ queryKey: ['company-completeness'] });
    },
    onError: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: res.message, type: 'error' });
    },
  });

  const onSubmit = (data: CompanyProfilePayloadSchema) => {
    setLoading(true);
    mutate(data);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1  gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">Company Profile</h2>
      <div className="flex flex-col w-full gap-3 md:col-span-3 col-span-1 ">
        {alertMessage && <AlertMessage {...alertMessage} />}
        <Form {...form}>
          <form className="flex w-full flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput<CompanyProfilePayloadSchema>
              control={form.control}
              type="text"
              name="companyName"
              aria-label="Company Name"
              placeholder="Enter Company Name"
            />
            <FormTextarea<CompanyProfilePayloadSchema>
              control={form.control}
              name="description"
              aria-label="Description"
              placeholder="Enter Description"
            />
            <div>
              <Label className="text-foreground/80 font-semibold" htmlFor="email">
                Email
              </Label>
              <Input type="email" id="email" disabled defaultValue={companyProfile?.email} />
            </div>
            <FormInput<CompanyProfilePayloadSchema>
              control={form.control}
              type="text"
              name="address"
              aria-label="Address"
              placeholder="Enter Address"
            />
            <FormInput<CompanyProfilePayloadSchema>
              control={form.control}
              type="number"
              name="phone"
              aria-label="Phone"
              placeholder="Enter Phone"
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
