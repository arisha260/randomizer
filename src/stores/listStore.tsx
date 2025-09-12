import { create } from "zustand";

export interface ListItem {
  id: string;
  value: string;
}

interface ListStore {
  listItems: ListItem[];
  quantity: number;
  changeQuantity: (quantity: number) => void;
  addItem: (value: string) => void;
  clearList: () => void;
  removeItem: (id: string) => void;
  result: string[];
  changeResult: (result: string[]) => void;
}

export const useListStore = create<ListStore>((set) => ({
  listItems: [],
  quantity: 0,
  result: [],
  changeResult: (res) => set({ result: res }),
  changeQuantity: (value) => set({ quantity: value }),

  addItem: (value) =>
    set((state) => ({
      listItems: [
        ...state.listItems,
        { id: crypto.randomUUID(), value }, // генерим уникальный id
      ],
    })),

  clearList: () => set({ listItems: [] }),

  removeItem: (id: string) =>
    set((state) => ({
      listItems: state.listItems.filter((i) => i.id !== id),
    })),
}));
