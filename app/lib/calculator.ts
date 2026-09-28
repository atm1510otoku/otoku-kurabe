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

export type Unit = (typeof units)[number]["value"];
export type NumericInput = number | "";

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
};

export function getUnitMeta(unit: Unit) {
  return units.find((item) => item.value === unit)!;
}

export function parseNumericInput(value: string): NumericInput {
  return value === "" ? "" : Number(value);
}

export function calculate(product: Product) {
  const meta = getUnitMeta(product.unit);

  const price = Math.max(0, Number(product.price) || 0);
  const amount = Math.max(0, Number(product.amount) || 0);
  const discountRate = Math.min(
    100,
    Math.max(0, Number(product.discountRate) || 0),
  );
  const coupon = Math.max(0, Number(product.coupon) || 0);
  const pointRate = Math.max(0, Number(product.pointRate) || 0);
  const shipping = Math.max(0, Number(product.shipping) || 0);

  const discountedPrice = price * (1 - discountRate / 100);
  const afterCoupon = Math.max(0, discountedPrice - coupon);
  const earnedPoints = Math.floor(afterCoupon * (pointRate / 100));
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