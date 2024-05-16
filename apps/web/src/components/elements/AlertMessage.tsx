import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export interface AlertMessageProps {
  message?: string;
  title?: string;
  type?: 'error' | 'success';
  className?: string;
}

export default function AlertMessage(props: AlertMessageProps) {
  const { message, type, title, className } = props;
  return (
    <Alert variant={type === 'error' ? 'destructive' : 'success'} className={cn('p-2', className)}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
