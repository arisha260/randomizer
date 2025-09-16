import { create } from "zustand";

interface NumberStore {
  min: number;
  max: number;
  quantity: number;
  changeMin: (min: number) => void;
  changeMax: (max: number) => void;
  changeQuantity: (quantity: number) => void;
  result: number[];
  changeResult: (result: number[]) => void;
}

export const useNumberStore = create<NumberStore>((set) => ({
  min: 1,
  max: 100,
  quantity: 1,
  result: [],
  changeMin: (value) => set( {min: value} ),
  changeMax: (value) => set( {max: value} ),
  changeQuantity: (value) => set( {quantity: value} ),
  changeResult: (res) => set({ result: res }),
}));
