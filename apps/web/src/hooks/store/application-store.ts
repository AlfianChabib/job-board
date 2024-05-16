import { create } from 'zustand';

interface IApplicationStore {
  resume: File | null;
  setResume: (file: File | null) => void;
}

export const useApplicationStore = create<IApplicationStore>((set) => ({
  resume: null,
  setResume: (file: File | null) => set({ resume: file }),
}));
