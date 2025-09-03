import { create } from "zustand";

interface DisplayStore {
  display: 'col' | 'row' | 'circle';
  changeDisplay: (display: 'col' | 'row' | 'circle') => void;
}

export const useDisplayStore = create<DisplayStore>((set) => ({
  display: 'col',
  changeDisplay: (value) => set({ display: value }),
}));
