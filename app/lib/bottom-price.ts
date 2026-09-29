import type { Unit } from "./calculator";

export type SavedBottomPrice = {
  id: string;
  name: string;
  compareKey: string;
  basisLabel: string;
  unitPrice: number;
  effectivePrice: number;
  amount: number;
  unit: Unit;
  savedAt: string;
};

export const BOTTOM_PRICE_STORAGE_KEY =
  "otoku-kurabe-bottom-prices-v1";
