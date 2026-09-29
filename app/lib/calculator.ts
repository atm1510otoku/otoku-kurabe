export const units = [
  { value: "g", label: "g", factor: 1, compareKey: "weight", basis: 100, basisLabel: "100g" },
  { value: "kg", label: "kg", factor: 1000, compareKey: "weight", basis: 100, basisLabel: "100g" },
  { value: "ml", label: "ml", factor: 1, compareKey: "volume", basis: 100, basisLabel: "100ml" },
  { value: "L", label: "L", factor: 1000, compareKey: "volume", basis: 100, basisLabel: "100ml" },
  { value: "個", label: "個", factor: 1, compareKey: "piece", basis: 1, basisLabel: "1個" },
  { value: "本", label: "本", factor: 1, compareKey: "bottle", basis: 1, basisLabel: "1本" },
  { value: "袋", label: "袋", factor: 1, compareKey: "bag", basis: 1, basisLabel: "1袋" },
  { value: "枚", label: "枚", factor: 1, compareKey: "sheet", basis: 1, basisLabel: "1枚" },
] as const;

export const taxRates = {
  reduced: 8,
  standard: 10,
} as const;

export const taxCategories = [
  {
    value: "food",
    label: "飲食料品",
    detail: "持ち帰り・宅配など",
    taxClass: "reduced",
  },
  {
    value: "dining",
    label: "外食",
    detail: "店内飲食など",
    taxClass: "standard",
  },
  {
    value: "alcohol",
    label: "酒類",
    detail: "",
    taxClass: "standard",
  },
  {
    value: "daily",
    label: "日用品",
    detail: "",
    taxClass: "standard",
  },
  {
    value: "medicine",
    label: "医薬品・医薬部外品",
    detail: "",
    taxClass: "standard",
  },
  {
    value: "unknown",
    label: "わからない",
    detail: "",
    taxClass: null,
  },
] as const;

export type Unit = (typeof units)[number]["value"];
export type NumericInput = number | "";
export type PriceTaxMode = "included" | "excluded";
export type TaxRate = 8 | 10;
export type TaxCategory = (typeof taxCategories)[number]["value"];

export type Product = {
  id: number;
  name: string;
  price: NumericInput;
  amount: NumericInput;
  unit: Unit;
  discountRate: NumericInput;
  coupon: NumericInput;
  pointRate: NumericInput;
  shipping: NumericInput;

  priceTaxMode?: PriceTaxMode;
  taxRate?: TaxRate;
  taxCategory?: TaxCategory;
  taxExclusivePrice?: NumericInput;
};

export function getUnitMeta(unit: Unit) {
  return units.find((item) => item.value === unit)!;
}

export function parseNumericInput(value: string): NumericInput {
  return value === "" ? "" : Number(value);
}

export function getTaxRateForCategory(
  category: TaxCategory,
): TaxRate | null {
  const item = taxCategories.find(
    (taxCategory) => taxCategory.value === category,
  );

  if (!item || item.taxClass === null) {
    return null;
  }

  return taxRates[item.taxClass];
}

export function toTaxIncludedPrice(
  taxExclusivePrice: number,
  taxRate: TaxRate,
) {
  const price = Math.max(0, taxExclusivePrice);

  // 税込換算は比較用の目安。1円未満を切り捨てる。
  return Math.floor((price * (100 + taxRate)) / 100);
}

export function toTaxExcludedPrice(
  taxIncludedPrice: number,
  taxRate: TaxRate,
) {
  const price = Math.max(0, taxIncludedPrice);

  // 税抜換算は比較用の目安。1円未満を切り捨てる。
  return Math.floor((price * 100) / (100 + taxRate));
}

export function calculateDiscount(
  price: number,
  discountRate: number,
) {
  const normalizedPrice = Math.max(0, price);
  const normalizedRate = Math.min(100, Math.max(0, discountRate));
  const discountAmount = normalizedPrice * (normalizedRate / 100);
  const discountedPrice = Math.max(0, normalizedPrice - discountAmount);

  return {
    price: normalizedPrice,
    discountRate: normalizedRate,
    discountAmount,
    discountedPrice,
  };
}

export function calculatePoints(
  price: number,
  pointRate: number,
) {
  const normalizedPrice = Math.max(0, price);
  const normalizedRate = Math.max(0, pointRate);
  const earnedPoints = Math.floor(
    normalizedPrice * (normalizedRate / 100),
  );
  const effectivePrice = Math.max(
    0,
    normalizedPrice - earnedPoints,
  );

  return {
    price: normalizedPrice,
    pointRate: normalizedRate,
    earnedPoints,
    effectivePrice,
  };
}

export function calculate(product: Product) {
  const meta = getUnitMeta(product.unit);

  const priceTaxMode = product.priceTaxMode ?? "included";
  const taxRate = product.taxRate ?? 10;
  const taxCategory = product.taxCategory ?? "unknown";

  const directPrice = Math.max(0, Number(product.price) || 0);
  const taxExclusivePrice = Math.max(
    0,
    Number(product.taxExclusivePrice) || 0,
  );

  const price =
    priceTaxMode === "excluded"
      ? toTaxIncludedPrice(taxExclusivePrice, taxRate)
      : directPrice;

  const amount = Math.max(0, Number(product.amount) || 0);
  const discount = calculateDiscount(
    price,
    Number(product.discountRate) || 0,
  );
  const discountRate = discount.discountRate;
  const coupon = Math.max(0, Number(product.coupon) || 0);
  const pointRate = Math.max(0, Number(product.pointRate) || 0);
  const shipping = Math.max(0, Number(product.shipping) || 0);

  const discountedPrice = discount.discountedPrice;
  const afterCoupon = Math.max(0, discountedPrice - coupon);
  const pointResult = calculatePoints(afterCoupon, pointRate);
  const earnedPoints = pointResult.earnedPoints;
  const payment = afterCoupon + shipping;
  const effectivePrice = Math.max(0, payment - earnedPoints);

  const normalizedAmount = amount * meta.factor;
  const unitPrice =
    normalizedAmount > 0
      ? effectivePrice / normalizedAmount
      : Number.POSITIVE_INFINITY;

  return {
    ...product,
    price,
    amount,
    discountRate,
    coupon,
    pointRate,
    shipping,
    priceTaxMode,
    taxRate,
    taxCategory,
    taxExclusivePrice,
    compareKey: meta.compareKey,
    basis: meta.basis,
    basisLabel: meta.basisLabel,
    earnedPoints,
    effectivePrice,
    normalizedAmount,
    unitPrice,
    displayUnitPrice: unitPrice * meta.basis,
  };
}

export type CalculatedProduct = ReturnType<typeof calculate>;

export function compareProducts(results: CalculatedProduct[]) {
  const comparableResults = results.filter(
    (item) =>
      item.price > 0 &&
      item.normalizedAmount > 0 &&
      Number.isFinite(item.unitPrice),
  );

  const canCompare =
    comparableResults.length >= 2 &&
    new Set(comparableResults.map((item) => item.compareKey)).size === 1;

  const sortedResults = canCompare
    ? [...comparableResults].sort((a, b) => a.unitPrice - b.unitPrice)
    : [];

  const winner = sortedResults[0];
  const runnerUp = sortedResults[1];

  const cheapestResults = winner
    ? sortedResults.filter(
        (item) => Math.abs(item.unitPrice - winner.unitPrice) < 0.000001,
      )
    : [];

  const hasTie = cheapestResults.length > 1;

  return {
    comparableResults,
    canCompare,
    sortedResults,
    winner,
    runnerUp,
    cheapestResults,
    hasTie,
  };
}