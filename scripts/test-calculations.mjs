import assert from "node:assert/strict";

const units = {
  g:  { factor: 1,    compareKey: "weight", basis: 100, basisLabel: "100g" },
  kg: { factor: 1000, compareKey: "weight", basis: 100, basisLabel: "100g" },
  ml: { factor: 1,    compareKey: "volume", basis: 100, basisLabel: "100ml" },
  L:  { factor: 1000, compareKey: "volume", basis: 100, basisLabel: "100ml" },
  個: { factor: 1, compareKey: "piece", basis: 1, basisLabel: "1個" },
  本: { factor: 1, compareKey: "bottle", basis: 1, basisLabel: "1本" },
  袋: { factor: 1, compareKey: "bag", basis: 1, basisLabel: "1袋" },
  枚: { factor: 1, compareKey: "sheet", basis: 1, basisLabel: "1枚" },
};

function calculate(product) {
  const meta = units[product.unit];

  if (!meta) {
    throw new Error(`Unknown unit: ${product.unit}`);
  }

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
    effectivePrice,
    earnedPoints,
    unitPrice,
    displayUnitPrice: unitPrice * meta.basis,
    compareKey: meta.compareKey,
    basisLabel: meta.basisLabel,
  };
}

function almostEqual(actual, expected, tolerance = 0.000001) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${expected}, got ${actual}`,
  );
}

function product(overrides = {}) {
  return {
    price: 0,
    amount: 1,
    unit: "個",
    discountRate: 0,
    coupon: 0,
    pointRate: 0,
    shipping: 0,
    ...overrides,
  };
}

const tests = [
  {
    name: "500gの商品を100g単価へ換算",
    run() {
      const result = calculate(
        product({ price: 398, amount: 500, unit: "g" }),
      );
      almostEqual(result.displayUnitPrice, 79.6);
    },
  },

  {
    name: "1kgの商品を100g単価へ換算",
    run() {
      const result = calculate(
        product({ price: 796, amount: 1, unit: "kg" }),
      );
      almostEqual(result.displayUnitPrice, 79.6);
    },
  },

  {
    name: "gとkgの同率判定",
    run() {
      const a = calculate(
        product({ price: 398, amount: 500, unit: "g" }),
      );
      const b = calculate(
        product({ price: 796, amount: 1, unit: "kg" }),
      );
      almostEqual(a.unitPrice, b.unitPrice);
    },
  },

  {
    name: "mlとLを同じ100ml単価へ換算",
    run() {
      const a = calculate(
        product({ price: 198, amount: 500, unit: "ml" }),
      );
      const b = calculate(
        product({ price: 396, amount: 1, unit: "L" }),
      );

      almostEqual(a.displayUnitPrice, 39.6);
      almostEqual(b.displayUnitPrice, 39.6);
    },
  },

  {
    name: "20%OFF＋100円クーポン",
    run() {
      const result = calculate(
        product({
          price: 1000,
          amount: 1,
          unit: "個",
          discountRate: 20,
          coupon: 100,
        }),
      );

      assert.equal(result.effectivePrice, 700);
      assert.equal(result.displayUnitPrice, 700);
    },
  },

  {
    name: "10%ポイント還元＋送料200円",
    run() {
      const result = calculate(
        product({
          price: 1000,
          amount: 1,
          unit: "個",
          pointRate: 10,
          shipping: 200,
        }),
      );

      assert.equal(result.earnedPoints, 100);
      assert.equal(result.effectivePrice, 1100);
    },
  },

  {
    name: "ポイントは小数点以下を切り捨て",
    run() {
      const result = calculate(
        product({
          price: 999,
          amount: 1,
          unit: "個",
          pointRate: 10,
        }),
      );

      assert.equal(result.earnedPoints, 99);
      assert.equal(result.effectivePrice, 900);
    },
  },

  {
    name: "クーポンが商品価格を超えても負数にならない",
    run() {
      const result = calculate(
        product({
          price: 500,
          amount: 1,
          unit: "個",
          coupon: 1000,
        }),
      );

      assert.equal(result.effectivePrice, 0);
    },
  },

  {
    name: "空欄は0として安全に扱う",
    run() {
      const result = calculate(
        product({
          price: "",
          amount: "",
          discountRate: "",
          coupon: "",
          pointRate: "",
          shipping: "",
        }),
      );

      assert.equal(result.effectivePrice, 0);
      assert.equal(result.unitPrice, Number.POSITIVE_INFINITY);
    },
  },

  {
    name: "負の入力値は0として扱う",
    run() {
      const result = calculate(
        product({
          price: -100,
          amount: -5,
          coupon: -20,
          shipping: -300,
        }),
      );

      assert.equal(result.effectivePrice, 0);
      assert.equal(result.unitPrice, Number.POSITIVE_INFINITY);
    },
  },

  {
    name: "割引率は100%を上限にする",
    run() {
      const result = calculate(
        product({
          price: 1000,
          amount: 1,
          unit: "個",
          discountRate: 150,
        }),
      );

      assert.equal(result.effectivePrice, 0);
    },
  },

  {
    name: "3商品の中から最安単価を選べる",
    run() {
      const results = [
        { name: "A", ...calculate(product({ price: 500, amount: 500, unit: "g" })) },
        { name: "B", ...calculate(product({ price: 780, amount: 1000, unit: "g" })) },
        { name: "C", ...calculate(product({ price: 420, amount: 400, unit: "g" })) },
      ].sort((a, b) => a.unitPrice - b.unitPrice);

      assert.equal(results[0].name, "B");
      almostEqual(results[0].displayUnitPrice, 78);
    },
  },
];

let passed = 0;

console.log("===== お得くらべ 計算ロジック自動テスト =====");
console.log("");

for (const test of tests) {
  try {
    test.run();
    passed++;
    console.log(`PASS  ${test.name}`);
  } catch (error) {
    console.error(`FAIL  ${test.name}`);
    console.error(error);
  }
}

console.log("");
console.log(`結果: ${passed}/${tests.length} PASS`);

if (passed !== tests.length) {
  process.exitCode = 1;
} else {
  console.log("ALL TESTS PASSED");
}