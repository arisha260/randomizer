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
  isUnique: boolean;
  changeIsUnique: (val: boolean) => void;
  clearList: () => void;
  removeItem: (id: string) => void;
  result: string[];
  changeResult: (result: string[]) => void;
  error?: string;
  clearError: () => void;
}

export const useListStore = create<ListStore>((set) => ({
  listItems: [],
  quantity: 1,
  result: [],
  isUnique: true,
  error: undefined,
  changeIsUnique: (val) => set( {isUnique:val } ),
  changeResult: (res) => set({ result: res }),
  changeQuantity: (value) => set({ quantity: value }),

  addItem: (value) =>
    set((state) => {
      if (state.listItems.length >= 100) {
        return { error: "Не больше 100 элементов" };
      }
      return {
        listItems: [
          ...state.listItems,
          { id: crypto.randomUUID(), value },
        ],
        error: undefined,
      };
  }),

  clearList: () => set({ listItems: [] }),

  removeItem: (id: string) =>
    set((state) => ({
      listItems: state.listItems.filter((i) => i.id !== id),
      error: undefined,
    })),

    clearError: () => set( {error: undefined } ),
}));
