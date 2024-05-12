import { useState } from 'react';

export const useLoading = (): { loading: boolean; setLoading: React.Dispatch<React.SetStateAction<boolean>> } => {
  const [loading, setLoading] = useState(false);

  return { loading, setLoading };
};
