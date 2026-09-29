import assert from "node:assert/strict";
import {
  calculate,
  calculateDiscount,
  compareProducts,
  getTaxRateForCategory,
  toTaxExcludedPrice,
  toTaxIncludedPrice,
} from "../app/lib/calculator.ts";

function almostEqual(actual, expected, tolerance = 0.000001) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${expected}, got ${actual}`,
  );
}

function product(overrides = {}) {
  return {
    id: 1,
    name: "テスト商品",
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
    name: "飲食料品は8%を選択",
    run() {
      assert.equal(getTaxRateForCategory("food"), 8);
    },
  },
  {
    name: "外食・酒類・日用品・医薬品は10%",
    run() {
      for (const category of [
        "dining",
        "alcohol",
        "daily",
        "medicine",
      ]) {
        assert.equal(getTaxRateForCategory(category), 10);
      }
    },
  },
  {
    name: "わからないは税率を自動決定しない",
    run() {
      assert.equal(getTaxRateForCategory("unknown"), null);
    },
  },
  {
    name: "税抜1000円・10%は税込1100円",
    run() {
      assert.equal(toTaxIncludedPrice(1000, 10), 1100);
    },
  },
  {
    name: "税抜1000円・8%は税込1080円",
    run() {
      assert.equal(toTaxIncludedPrice(1000, 8), 1080);
    },
  },
  {
    name: "税込1100円・10%は税抜1000円",
    run() {
      assert.equal(toTaxExcludedPrice(1100, 10), 1000);
    },
  },
  {
    name: "税込1080円・8%は税抜1000円",
    run() {
      assert.equal(toTaxExcludedPrice(1080, 8), 1000);
    },
  },
  {
    name: "税抜価格を税込換算して比較",
    run() {
      const result = calculate(
        product({
          priceTaxMode: "excluded",
          taxExclusivePrice: 1000,
          taxRate: 10,
          price: 1100,
        }),
      );

      assert.equal(result.price, 1100);
      assert.equal(result.effectivePrice, 1100);
    },
  },
  {
    name: "500gの商品を100g単価へ換算",
    run() {
      almostEqual(
        calculate(
          product({
            price: 398,
            amount: 500,
            unit: "g",
          }),
        ).displayUnitPrice,
        79.6,
      );
    },
  },
  {
    name: "1kgの商品を100g単価へ換算",
    run() {
      almostEqual(
        calculate(
          product({
            price: 796,
            amount: 1,
            unit: "kg",
          }),
        ).displayUnitPrice,
        79.6,
      );
    },
  },
  {
    name: "gとkgを同率と判定",
    run() {
      const comparison = compareProducts([
        calculate(
          product({
            id: 1,
            name: "A",
            price: 398,
            amount: 500,
            unit: "g",
          }),
        ),
        calculate(
          product({
            id: 2,
            name: "B",
            price: 796,
            amount: 1,
            unit: "kg",
          }),
        ),
      ]);

      assert.equal(comparison.hasTie, true);
    },
  },
  {
    name: "mlとLを同じ100ml単価へ換算",
    run() {
      const a = calculate(
        product({
          price: 198,
          amount: 500,
          unit: "ml",
        }),
      );
      const b = calculate(
        product({
          price: 396,
          amount: 1,
          unit: "L",
        }),
      );

      almostEqual(a.displayUnitPrice, 39.6);
      almostEqual(b.displayUnitPrice, 39.6);
    },
  },
  {
    name: "割引計算 1000円・20%OFF",
    run() {
      const result = calculateDiscount(1000, 20);
      assert.equal(result.discountAmount, 200);
      assert.equal(result.discountedPrice, 800);
    },
  },
  {
    name: "割引計算は100%を上限にする",
    run() {
      const result = calculateDiscount(1000, 150);
      assert.equal(result.discountRate, 100);
      assert.equal(result.discountedPrice, 0);
    },
  },
  {
    name: "割引計算の負数は0として扱う",
    run() {
      const result = calculateDiscount(-1000, -20);
      assert.equal(result.price, 0);
      assert.equal(result.discountRate, 0);
      assert.equal(result.discountedPrice, 0);
    },
  },
  {
    name: "20%OFF＋100円クーポン",
    run() {
      const result = calculate(
        product({
          price: 1000,
          discountRate: 20,
          coupon: 100,
        }),
      );

      assert.equal(result.effectivePrice, 700);
    },
  },
  {
    name: "10%ポイント還元＋送料200円",
    run() {
      const result = calculate(
        product({
          price: 1000,
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
          pointRate: 10,
        }),
      );

      assert.equal(result.earnedPoints, 99);
      assert.equal(result.effectivePrice, 900);
    },
  },
  {
    name: "クーポンが価格を超えても負数にならない",
    run() {
      assert.equal(
        calculate(
          product({
            price: 500,
            coupon: 1000,
          }),
        ).effectivePrice,
        0,
      );
    },
  },
  {
    name: "空欄を安全に0として扱う",
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
      assert.equal(
        result.unitPrice,
        Number.POSITIVE_INFINITY,
      );
    },
  },
  {
    name: "負の値を0として扱う",
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
    },
  },
  {
    name: "割引率は100%を上限にする",
    run() {
      assert.equal(
        calculate(
          product({
            price: 1000,
            discountRate: 150,
          }),
        ).effectivePrice,
        0,
      );
    },
  },
  {
    name: "3商品の中から最安商品を選ぶ",
    run() {
      const comparison = compareProducts([
        calculate(
          product({
            id: 1,
            name: "A",
            price: 500,
            amount: 500,
            unit: "g",
          }),
        ),
        calculate(
          product({
            id: 2,
            name: "B",
            price: 780,
            amount: 1000,
            unit: "g",
          }),
        ),
        calculate(
          product({
            id: 3,
            name: "C",
            price: 420,
            amount: 400,
            unit: "g",
          }),
        ),
      ]);

      assert.equal(comparison.winner.name, "B");
      almostEqual(
        comparison.winner.displayUnitPrice,
        78,
      );
    },
  },
];

let passed = 0;

console.log(
  "===== お得くらべ 共通計算ロジック自動テスト =====",
);
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