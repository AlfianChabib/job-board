import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';

export interface LinkButtonProps extends LinkProps, VariantProps<typeof buttonVariants> {
  text?: string;
  children: ReactNode;
  className?: string;
}

const LinkButton = ({ children, className, text, variant, size, ...props }: LinkButtonProps) => {
  return (
    <Link {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children || text}
    </Link>
  );
};

export default LinkButton;
