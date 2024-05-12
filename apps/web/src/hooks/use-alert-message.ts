import { AlertMessageProps } from '@/components/elements/AlertMessage';
import { useState } from 'react';

export const useAlertMessage = (): {
  alertMessage: AlertMessageProps | undefined;
  setAlertMessage: React.Dispatch<React.SetStateAction<AlertMessageProps | undefined>>;
} => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | undefined>(undefined);

  return { alertMessage, setAlertMessage };
};
