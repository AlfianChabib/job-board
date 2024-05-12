'use client';

import AlertMessage from '@/components/elements/AlertMessage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertMessage } from '@/hooks/use-alert-message';
import { useLoading } from '@/hooks/use-loading';
import { companyService } from '@/service/company-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

interface CompanyLogoProps {
  logo: string | null | undefined;
  name: string | undefined;
}

export default function CompanyLogo({ logo, name }: CompanyLogoProps) {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const queryClient = useQueryClient();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return companyService.updateCompanyLogo(data);
    },
    onSuccess: (res) => {
      setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['company-profile'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      setLoading(false);
    },
    onError: (res) => {
      setAlertMessage({ title: 'Error', message: res.message, type: 'error' });
      setLoading(false);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (!allowedExtensions.includes(file?.type!) || !file) {
      e.target.value = '';
      return toast.error('Only .jpg, .jpeg and .png formats are supported.');
    } else if (file?.size! > 1e6) {
      e.target.value = '';
      return toast.error('Max image size 1MB');
    } else {
      reader.onloadend = () => setPreviewImage(reader.result as string);
      setFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append('image', file as Blob);
    setLoading(true);
    mutate(formData);
    setPreviewImage(null);
    setFile(null);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-4 bg-background border rounded-md p-4 w-full items-start">
      <h2 className="text-foreground/80 font-semibold col-span-1">Company Logo</h2>
      <div className="col-span-3 space-y-2">
        {alertMessage && <AlertMessage {...alertMessage} />}
        <div className="flex gap-4">
          <div className="w-24 h-24">
            <AspectRatio ratio={1 / 1} className="flex rounded-md object-cover overflow-hidden ">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt={name!}
                  width={100}
                  height={100}
                  priority
                  className="object-cover object-center w-auto h-auto"
                />
              ) : (
                <Avatar className="rounded-none w-24 h-24">
                  <AvatarImage
                    src={logo!}
                    alt={name!}
                    width={200}
                    height={200}
                    className="object-cover w-auto h-auto"
                  />
                  <AvatarFallback className="rounded-none">{name?.charAt(0).toUpperCase()!}</AvatarFallback>
                </Avatar>
              )}
            </AspectRatio>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="md:text-sm text-xs font-medium text-foreground/70">Max image size 1MB</p>
              <p className="md:text-sm text-xs font-medium text-foreground/70">
                Only .jpg, .jpeg, .png and .gif formats are supported.
              </p>
            </div>
            {previewImage ? (
              <Button size="sm" onClick={handleUpload} disabled={loading}>
                Update
              </Button>
            ) : (
              <Label htmlFor="input-file" className="flex w-max">
                <span className={buttonVariants({ size: 'sm' })}>Chose image</span>
                <Input
                  id="input-file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .gif"
                  maxLength={1}
                  className="hidden"
                />
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
