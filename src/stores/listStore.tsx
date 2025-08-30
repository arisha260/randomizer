import { create } from "zustand";

interface ListStore {
  listItems: string[];
  quantity: number;
  changeQuantity: (quantity: number) => void;
  addItem: (item: string) => void;
  clearList: () => void;
  removeItem: (item: string) => void;
  result: string | string[];
  changeResult: (result: string) => void;
}

export const useListStore = create<ListStore>((set) => ({
  listItems: [],
  quantity: 0,
  result: '',
  changeResult: (res) => set({result: res}),
  changeQuantity: (value) => set({ quantity: value }),
  addItem: (item) =>
    set((state) => ({
      listItems: [...state.listItems, item],
    })),
  clearList: () => set({ listItems: [] }),
  removeItem: (item) =>
    set((state) => ({
      listItems: state.listItems.filter((i) => i !== item),
    })),
}));
