'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
interface DialogButtonProps {
  children?: React.ReactNode;
  triggerText: string;
  title: string;
  description: string;
  modal?: boolean;
}

export default function DialogButton({ children, triggerText, title, description, modal }: DialogButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={modal} open={open} onOpenChange={setOpen}>
      <DialogTrigger>{triggerText}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
