'use client';

import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useMutation } from '@tanstack/react-query';
import { applicationService } from '@/service/application-service';
import { Button } from '../ui/button';
import { useLoading } from '@/hooks/use-loading';
import { useAlertMessage } from '@/hooks/use-alert-message';
import AlertMessage from '../elements/AlertMessage';

interface UploadDocumentProps {
  jobId: string;
}

export default function UploadDocument({ jobId }: UploadDocumentProps) {
  const { loading, setLoading } = useLoading();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const [resume, setresume] = useState<File | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return applicationService.uploadResume(data);
    },
    onSuccess: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Success', message: res.message, type: 'success' });
    },
    onError: (res) => {
      setLoading(false);
      setAlertMessage({ title: 'Error', message: res.message, type: 'error' });
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return setAlertMessage({ title: 'Error', message: 'Please select a file', type: 'error' });
    } else if (file.size > 2e6) {
      return setAlertMessage({ title: 'Error', message: 'Max file size 2MB', type: 'error' });
    } else if (!file.type.includes('pdf')) {
      return setAlertMessage({ title: 'Error', message: 'Only PDF files are allowed', type: 'error' });
    } else {
      setresume(file);
      setAlertMessage(undefined);
    }
  };

  const handleApply = () => {
    setLoading(true);
    const formData = new FormData();
    if (resume) {
      formData.append('file', resume);
      formData.append('jobId', jobId);
      mutate(formData);
    }
  };

  return (
    <div className="flex flex-col md:my-4 my-2 p-4 bg-background rounded-md mx-auto gap-4">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <h2 className="col-span-1 font-semibold">Choose documents</h2>
        <div className="flex flex-col col-span-2 gap-2">
          {alertMessage && <AlertMessage {...alertMessage} />}
          <Label className="block mb-2 font-medium" htmlFor="file_input">
            Resume
          </Label>
          <Input
            className="block w-full text-sm cursor-pointer"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            max={2e6}
            accept="application/pdf"
            onChange={handleChange}
          />
          <p className="text-sm text-foreground/70" id="file_input_help">
            PDF only, max. 2MB
          </p>
          <Button className="inline-block" onClick={handleApply} disabled={loading || !resume}>
            Apply this job
          </Button>
        </div>
      </div>
    </div>
  );
}
