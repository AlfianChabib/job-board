import { MoveLeft } from 'lucide-react';
import React from 'react';

export default function InitialJobDetails() {
  return (
    <div className="flex flex-col col-span-3 gap-4">
      <div className="flex items-center justify-between px-4 py-2 bg-background border rounded-md">
        <h1 className="font-medium text-foreground/60">Job details</h1>
      </div>
      <div className="flex relative flex-col items-center justify-center border bg-background min-h-jobs rounded-lg overflow-y-scroll">
        <div className="flex flex-col w-full absolute top-0 p-10">
          <div className="flex gap-4">
            <MoveLeft size={24} className="text-foreground/80" />
            <div>
              <p className="text-foreground/80 font-semibold text-xl">Select a job to view details</p>
              <p className="text-foreground/70">Show details here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
