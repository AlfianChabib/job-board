'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

export default function JobList() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const keywords = searchParams.get('keywords') || '';
  const location = searchParams.get('location') || '';
  const classification = searchParams.get('classification') || '';
  const jobType = searchParams.get('jobType') || '';

  return (
    <div className="flex flex-col col-span-2 gap-4">
      <div className="flex items-center justify-between px-4 py-2 border bg-background rounded-md">
        <h1 className="font-medium text-foreground/60">100 Jobs</h1>
      </div>
      <div className="flex relative flex-col items-center gap-4 min-h-jobs overflow-y-scroll">
        <div className="absolute flex flex-col w-full gap-4 top-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col w-full h-72 bg-background border rounded-lg hover:border-primary hover:border-2 cursor-pointer p-2 transition-all"
            >
              test {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
