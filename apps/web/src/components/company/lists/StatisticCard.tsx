import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface StatisticCardProps {
  title: string;
  link: string;
  children?: React.ReactNode;
}

export default function StatisticCard({ link, title, children }: StatisticCardProps) {
  return (
    <div className="col-span-1 select-none border p-2 rounded-lg bg-background group hover:bg-primary text-primary hover:text-background transition-all">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{title}</h1>
        <Link
          href={link}
          className={cn(
            buttonVariants({ size: 'icon' }),
            'h-8 w-8 bg-primary group-hover:bg-background text-background group-hover:text-primary transition-all',
          )}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="flex flex-col h-28 w-full items-start justify-end">{children}</div>
    </div>
  );
}
