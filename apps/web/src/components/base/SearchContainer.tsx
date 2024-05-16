'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from '../ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dataService } from '@/service/data-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { searchSchema, SearchSchema } from '@/schema/search-schema';
import FormInput from '../elements/FormInput';
import { Form } from '../ui/form';
import FormSelect from '../elements/FormSelect';
import { SelectContent, SelectItem } from '../ui/select';
import { workType } from '@/lib/constants';
import Link from 'next/link';

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const queryClient = useQueryClient();
  const { data: classifications } = useQuery({
    queryKey: ['classification'],
    queryFn: () => dataService.classification(),
  });

  const keywords = searchParams.get('keywords') || '';
  const location = searchParams.get('location') || '';
  const classificationId = searchParams.get('classificationId') || '';
  const jobType = searchParams.get('jobType') || '';
  const page = searchParams.get('page') || '';

  const defaultValue = { keywords, location, classificationId, jobType };

  const form = useForm<SearchSchema>({
    defaultValues: defaultValue,
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (value: SearchSchema) => {
    if (keywords) params.delete('keywords');
    if (location) params.delete('location');
    if (classificationId) params.delete('classificationId');
    if (jobType) params.delete('jobType');

    value.keywords && params.set('keywords', value.keywords);
    value.location && params.set('location', value.location);
    value.classificationId && params.set('classificationId', value.classificationId);
    value.jobType && params.set('jobType', value.jobType);
    params.set('page', '1');
    router.replace(`?${params.toString()}`);

    queryClient.invalidateQueries({ queryKey: ['jobs'] });
  };

  const handleReset = () => {
    if (params.has('keywords')) params.delete('keywords');
    if (params.has('location')) params.delete('location');
    if (params.has('classificationId')) params.delete('classificationId');
    if (params.has('jobType')) params.delete('jobType');
    if (params.has('page')) params.delete('page');
    form.reset();

    router.prefetch('/');
  };

  return (
    <div className="flex w-full bg-primary border rounded-md md:p-4 p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-10 sm:grid-cols-4 grid-cols-2 w-full justify-end md:gap-4 gap-2"
        >
          <FormInput<SearchSchema>
            control={form.control}
            type="text"
            name="keywords"
            placeholder="Keywords"
            className="col-span-2"
          />
          <FormInput<SearchSchema>
            control={form.control}
            type="text"
            name="location"
            placeholder="Location"
            className="col-span-2"
          />
          <FormSelect<SearchSchema>
            control={form.control}
            name="classificationId"
            placeholder="Classification"
            className="col-span-2"
          >
            <SelectContent>
              {classifications?.map((item, index) => (
                <SelectItem key={index} value={String(item.id)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </FormSelect>
          <FormSelect<SearchSchema>
            control={form.control}
            name="jobType"
            placeholder="Work Type"
            className="col-span-2"
          >
            <SelectContent>
              {workType.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </FormSelect>
          <Button
            type="submit"
            variant="secondary"
            className="col-span-1 bg-background text-primary self-end place-items-end"
          >
            Search
          </Button>
          {/* <Link
            href="/"
            className={buttonVariants({
              variant: 'secondary',
              className: 'col-span-1 bg-background text-primary self-end place-items-end',
            })}
          >
            Reset
          </Link> */}
          <Button
            variant="secondary"
            className="col-span-1 bg-background text-primary self-end place-items-end"
            onClick={handleReset}
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
}
