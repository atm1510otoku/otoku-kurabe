"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ComparisonGuides from "./components/ComparisonGuides";

import {
  calculate,
  compareProducts,
  getTaxRateForCategory,
  getUnitMeta,
  parseNumericInput,
  taxCategories,
  toTaxIncludedPrice,
  units,
  type Product,
  type TaxRate,
  type Unit,
} from "./lib/calculator";

type SavedBottomPrice = {
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

const STORAGE_KEY = "otoku-kurabe-bottom-prices-v1";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "商品A",
    price: 398,
    amount: 500,
    unit: "g",
    discountRate: 0,
    coupon: 0,
    pointRate: 0,
    shipping: 0,
  },
  {
    id: 2,
    name: "商品B",
    price: 498,
    amount: 700,
    unit: "g",
    discountRate: 0,
    coupon: 0,
    pointRate: 0,
    shipping: 0,
  },
];

function formatYen(value: number) {
  return `${Math.max(0, Math.round(value)).toLocaleString("ja-JP")}円`;
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function formatSavedDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [savedPrices, setSavedPrices] = useState<SavedBottomPrice[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            setSavedPrices(parsed);
          }
        }
      } catch {
        // 保存データが壊れていても比較機能はそのまま利用できるようにする
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrices));
  }, [savedPrices, storageReady]);

  const results = useMemo(() => products.map(calculate), [products]);

  const {
    canCompare,
    winner,
    runnerUp,
    cheapestResults,
    hasTie,
  } = compareProducts(results);

  const updateProduct = (id: number, patch: Partial<Product>) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, ...patch } : product,
      ),
    );
    setNotice("");
  };

  const addProduct = () => {
    if (products.length >= 3) return;

    const nextId = Math.max(...products.map((product) => product.id), 0) + 1;

    setProducts((current) => [
      ...current,
      {
        id: nextId,
        name: `商品${String.fromCharCode(65 + current.length)}`,
        price: 0,
        amount: 0,
        unit: current[0]?.unit ?? "g",
        discountRate: 0,
        coupon: 0,
        pointRate: 0,
        shipping: 0,
      },
    ]);

    setNotice("");
  };

  const removeProduct = (id: number) => {
    if (products.length <= 2) return;

    setProducts((current) => current.filter((product) => product.id !== id));
    setNotice("");
  };

  const reset = () => {
    setProducts(initialProducts);
    setNotice("");
  };

  const getSavedPrice = (name: string, compareKey: string) => {
    const normalized = normalizeName(name);

    if (!normalized) return undefined;

    return savedPrices.find(
      (item) =>
        normalizeName(item.name) === normalized &&
        item.compareKey === compareKey,
    );
  };

  const saveBottomPrice = (result: ReturnType<typeof calculate>) => {
    const name = result.name.trim();

    if (!name) {
      setNotice("商品名を入力してから底値を保存してください。");
      return;
    }

    if (
      Number(result.price) <= 0 ||
      result.normalizedAmount <= 0 ||
      !Number.isFinite(result.displayUnitPrice)
    ) {
      setNotice("価格と容量・個数を入力してから底値を保存してください。");
      return;
    }

    const existing = getSavedPrice(name, result.compareKey);

    if (existing && result.displayUnitPrice >= existing.unitPrice - 0.0001) {
      setNotice(
        `${name} は、保存済みの底値 ${existing.unitPrice.toFixed(2)}円/${existing.basisLabel} の方が安いため変更しませんでした。`,
      );
      return;
    }

    const newItem: SavedBottomPrice = {
      id: existing?.id ?? crypto.randomUUID(),
      name,
      compareKey: result.compareKey,
      basisLabel: result.basisLabel,
      unitPrice: result.displayUnitPrice,
      effectivePrice: result.effectivePrice,
      amount: Number(result.amount) || 0,
      unit: result.unit,
      savedAt: new Date().toISOString(),
    };

    setSavedPrices((current) => {
      if (!existing) {
        return [newItem, ...current];
      }

      return current.map((item) =>
        item.id === existing.id ? newItem : item,
      );
    });

    setNotice(
      existing
        ? `${name} の底値を ${result.displayUnitPrice.toFixed(2)}円/${result.basisLabel} に更新しました。`
        : `${name} の底値を ${result.displayUnitPrice.toFixed(2)}円/${result.basisLabel} で保存しました。`,
    );
  };

  const deleteSavedPrice = (id: string) => {
    setSavedPrices((current) => current.filter((item) => item.id !== id));
    setNotice("保存した底値を削除しました。");
  };

  const clearSavedPrices = () => {
    if (!window.confirm("保存した底値をすべて削除しますか？")) return;

    setSavedPrices([]);
    setNotice("保存した底値をすべて削除しました。");
  };

  const gridClass =
    products.length === 2
      ? "mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-2"
      : "mt-10 grid gap-5 lg:grid-cols-3";

  return (
    <main>

      <section className="mx-auto max-w-6xl px-4 pb-7 pt-2 sm:px-6 sm:pb-10 sm:pt-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-bold text-emerald-700 sm:mb-3">
            買う前に、10秒で比較
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            結局、どっちがお得？
          </h1>

          <p className="mx-auto mt-2 max-w-4xl text-sm leading-5 text-slate-600 sm:mt-3 sm:text-base sm:leading-6">
            容量・割引・クーポン・ポイント・送料まで含めて、
            実質価格と実質単価をまとめて比較します。
          </p>
        </div>

        {notice && (
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-900">
            {notice}
          </div>
        )}

        <div className="mx-auto mt-2 flex max-w-4xl justify-center">
          <Link
            href="/how-to"
            className="rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
          >
            使い方はこちら
          </Link>
        </div>

        <div className={gridClass} style={{ marginTop: "8px" }}>
          {products.map((product, index) => {
            const result = results.find((item) => item.id === product.id)!;
            const saved = getSavedPrice(product.name, result.compareKey);

            const hasAdvancedSettings =
              Number(product.discountRate) > 0 ||
              Number(product.coupon) > 0 ||
              Number(product.pointRate) > 0 ||
              Number(product.shipping) > 0;

            const advancedSummary = [
              Number(product.discountRate) > 0
                ? `${Number(product.discountRate)}%OFF`
                : "",
              Number(product.coupon) > 0
                ? `クーポン${formatYen(Number(product.coupon))}`
                : "",
              Number(product.pointRate) > 0
                ? `ポイント${Number(product.pointRate)}%`
                : "",
              Number(product.shipping) > 0
                ? `送料${formatYen(Number(product.shipping))}`
                : "",
            ]
              .filter(Boolean)
              .join("・");

            let bottomPriceMessage = "";

            if (
              saved &&
              Number.isFinite(result.displayUnitPrice) &&
              result.normalizedAmount > 0
            ) {
              const difference = result.displayUnitPrice - saved.unitPrice;

              const savedMeta = getUnitMeta(saved.unit);
              const savedNormalizedAmount = saved.amount * savedMeta.factor;
              const sameAmount =
                Math.abs(result.normalizedAmount - savedNormalizedAmount) < 0.0001;
              const totalDifference =
                result.effectivePrice - saved.effectivePrice;

              if (Math.abs(difference) < 0.005) {
                bottomPriceMessage = "保存した底値と同じです";
              } else if (difference > 0) {
                bottomPriceMessage = sameAmount
                  ? `底値より ${Math.round(totalDifference).toLocaleString("ja-JP")}円高い（${result.basisLabel}あたり＋${difference.toFixed(2)}円）`
                  : `底値より ${result.basisLabel}あたり ${difference.toFixed(2)}円高い`;
              } else {
                bottomPriceMessage = sameAmount
                  ? `底値より ${Math.abs(Math.round(totalDifference)).toLocaleString("ja-JP")}円安い（${result.basisLabel}あたり－${Math.abs(difference).toFixed(2)}円）`
                  : `底値より ${result.basisLabel}あたり ${Math.abs(difference).toFixed(2)}円安い`;
              }
            }

            return (
              <section
                key={product.id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    比較 {index + 1}
                  </span>

                  {products.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="text-sm font-medium text-slate-400 hover:text-red-600"
                    >
                      削除
                    </button>
                  )}
                </div>

                <label className="block">
                  <span className="text-sm font-bold">商品名</span>
                  <input
                    value={product.name}
                    onChange={(event) =>
                      updateProduct(product.id, { name: event.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 sm:mt-1.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <div className="mt-1.5 grid grid-cols-2 gap-3 sm:mt-3">
                  <label className="block">
                    <span className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold">価格</span>

                      <select
                        aria-label="税込または税抜"
                        value={product.priceTaxMode ?? "included"}
                        onChange={(event) => {
                          const mode = event.target.value as
                            | "included"
                            | "excluded";

                          if (mode === "included") {
                            updateProduct(product.id, {
                              priceTaxMode: "included",
                              price: result.price,
                              taxExclusivePrice: "",
                              taxCategory: "unknown",
                            });
                            return;
                          }

                          const original = product.price;
                          const rate = product.taxRate ?? 10;

                          updateProduct(product.id, {
                            priceTaxMode: "excluded",
                            taxCategory: "unknown",
                            taxRate: rate,
                            taxExclusivePrice: original,
                            price:
                              original === ""
                                ? ""
                                : toTaxIncludedPrice(
                                    Number(original),
                                    rate,
                                  ),
                          });
                        }}
                        className="max-w-[62px] rounded-md border border-slate-300 bg-white px-1 py-0.5 text-[10px] font-bold text-slate-600 outline-none"
                      >
                        <option value="included">税込</option>
                        <option value="excluded">税抜</option>
                      </select>
                    </span>

                    <div className="relative mt-1 sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        value={product.price}
                        onFocus={() => {
                          if (
                            (product.priceTaxMode ?? "included") ===
                            "excluded"
                          ) {
                            updateProduct(product.id, {
                              price: product.taxExclusivePrice ?? "",
                            });
                          } else if (product.price === 0) {
                            updateProduct(product.id, { price: "" });
                          }
                        }}
                        onChange={(event) => {
                          const value = parseNumericInput(
                            event.target.value,
                          );

                          if (
                            (product.priceTaxMode ?? "included") ===
                            "excluded"
                          ) {
                            updateProduct(product.id, {
                              price: value,
                              taxExclusivePrice: value,
                            });
                          } else {
                            updateProduct(product.id, { price: value });
                          }
                        }}
                        onBlur={(event) => {
                          if (
                            (product.priceTaxMode ?? "included") !==
                            "excluded"
                          ) {
                            return;
                          }

                          const original = parseNumericInput(
                            event.currentTarget.value,
                          );
                          const rate = product.taxRate ?? 10;

                          updateProduct(product.id, {
                            taxExclusivePrice: original,
                            price:
                              original === ""
                                ? ""
                                : toTaxIncludedPrice(
                                    Number(original),
                                    rate,
                                  ),
                          });
                        }}
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-9 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        円
                      </span>
                    </div>

                    {(product.priceTaxMode ?? "included") ===
                      "excluded" &&
                      product.taxExclusivePrice !== "" &&
                      Number(product.taxExclusivePrice) > 0 && (
                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          税抜{" "}
                          {formatYen(
                            Number(product.taxExclusivePrice),
                          )}
                          {" → "}税込 {formatYen(result.price)}
                        </p>
                      )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">
                      容量・個数
                    </span>

                    <div className="mt-1 flex sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        value={product.amount}
                        onFocus={() => {
                          if (product.amount === 0) {
                            updateProduct(product.id, { amount: "" });
                          }
                        }}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            amount: parseNumericInput(
                              event.target.value,
                            ),
                          })
                        }
                        className="min-w-0 flex-1 rounded-l-xl border border-r-0 border-slate-300 px-3 py-2.5 outline-none transition focus:z-10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />

                      <select
                        value={product.unit}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            unit: event.target.value as Unit,
                          })
                        }
                        className="w-[66px] rounded-r-xl border border-slate-300 bg-white px-2 outline-none focus:border-emerald-500"
                      >
                        {units.map((unit) => (
                          <option
                            key={unit.value}
                            value={unit.value}
                          >
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  {(product.priceTaxMode ?? "included") ===
                    "excluded" && (
                    <div className="col-span-2 rounded-xl bg-slate-50 p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-700">
                          商品区分を選ぶ
                        </p>
                        <span className="text-[10px] font-bold text-emerald-700">
                          税率 {product.taxRate ?? 10}%
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {taxCategories.map((category) => {
                          const selected =
                            (product.taxCategory ?? "unknown") ===
                            category.value;

                          return (
                            <button
                              key={category.value}
                              type="button"
                              onClick={() => {
                                const automaticRate =
                                  getTaxRateForCategory(
                                    category.value,
                                  );

                                const rate =
                                  automaticRate ??
                                  product.taxRate ??
                                  10;

                                const original = Number(
                                  product.taxExclusivePrice,
                                );

                                updateProduct(product.id, {
                                  taxCategory: category.value,
                                  taxRate: rate,
                                  price:
                                    original > 0
                                      ? toTaxIncludedPrice(
                                          original,
                                          rate,
                                        )
                                      : product.price,
                                });
                              }}
                              className={
                                "rounded-full border px-2.5 py-1 text-[11px] font-bold transition " +
                                (selected
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100")
                              }
                            >
                              {category.label}
                            </button>
                          );
                        })}
                      </div>

                      {(product.taxCategory ?? "unknown") ===
                        "unknown" && (
                        <div className="mt-2 flex items-center gap-2 text-[11px]">
                          <span className="text-slate-500">
                            税率を手動で選択
                          </span>

                          {([8, 10] as TaxRate[]).map(
                            (rate) => (
                              <button
                                key={rate}
                                type="button"
                                onClick={() => {
                                  const original = Number(
                                    product.taxExclusivePrice,
                                  );

                                  updateProduct(product.id, {
                                    taxRate: rate,
                                    price:
                                      original > 0
                                        ? toTaxIncludedPrice(
                                            original,
                                            rate,
                                          )
                                        : product.price,
                                  });
                                }}
                                className={
                                  "rounded-md border px-2 py-1 font-bold " +
                                  ((product.taxRate ?? 10) ===
                                  rate
                                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                    : "border-slate-300 bg-white text-slate-600")
                                }
                              >
                                {rate}%
                              </button>
                            ),
                          )}
                        </div>
                      )}

                      <p className="mt-2 text-[10px] leading-4 text-slate-500">
                        税込換算は比較用の目安です。店舗の端数処理により差が出る場合があります。
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  aria-expanded={Boolean(advancedOpen[product.id])}
                  onClick={() =>
                    setAdvancedOpen((current) => ({
                      ...current,
                      [product.id]: !current[product.id],
                    }))
                  }
                  className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-bold text-slate-600 outline-none transition hover:bg-slate-100 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  <span className="min-w-0">
                    <span className="block">
                      {advancedOpen[product.id]
                        ? "－ 詳細設定を閉じる"
                        : "＋ 割引・ポイント・送料を設定"}
                    </span>

                    {hasAdvancedSettings &&
                      !advancedOpen[product.id] && (
                        <span className="mt-0.5 block truncate text-[10px] font-medium text-emerald-700">
                          {advancedSummary}
                        </span>
                      )}
                  </span>

                  {hasAdvancedSettings && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                      設定済み
                    </span>
                  )}
                </button>

                {advancedOpen[product.id] && (
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold">割引率</span>
                    <div className="relative mt-1 sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={product.discountRate}
                        onFocus={() => {
                          if (product.discountRate === 0) {
                            updateProduct(product.id, { discountRate: "" });
                          }
                        }}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            discountRate: parseNumericInput(event.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-8 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        %
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">クーポン</span>
                    <div className="relative mt-1 sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        value={product.coupon}
                        onFocus={() => {
                          if (product.coupon === 0) {
                            updateProduct(product.id, { coupon: "" });
                          }
                        }}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            coupon: parseNumericInput(event.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-9 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        円
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">ポイント還元</span>
                    <div className="relative mt-1 sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        value={product.pointRate}
                        onFocus={() => {
                          if (product.pointRate === 0) {
                            updateProduct(product.id, { pointRate: "" });
                          }
                        }}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            pointRate: parseNumericInput(event.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-8 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        %
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold">送料</span>
                    <div className="relative mt-1 sm:mt-1.5">
                      <input
                        type="number"
                        min="0"
                        value={product.shipping}
                        onFocus={() => {
                          if (product.shipping === 0) {
                            updateProduct(product.id, { shipping: "" });
                          }
                        }}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            shipping: parseNumericInput(event.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 pr-9 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        円
                      </span>
                    </div>
                  </label>
                </div>
                )}

                <div className="mt-2 rounded-2xl bg-slate-50 p-3 sm:mt-3 sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">実質負担額</span>
                    <strong className="text-lg">
                      {formatYen(result.effectivePrice)}
                    </strong>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      {result.basisLabel}あたり
                    </span>

                    <strong className="text-xl text-emerald-700">
                      {Number.isFinite(result.displayUnitPrice)
                        ? `${result.displayUnitPrice.toFixed(2)}円`
                        : "-"}
                    </strong>
                  </div>

                  {result.earnedPoints > 0 && (
                    <p className="mt-2 text-right text-xs text-slate-500">
                      獲得ポイント目安：
                      {result.earnedPoints.toLocaleString("ja-JP")}pt
                    </p>
                  )}
                </div>

                {saved && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-amber-800">
                        保存中の底値
                      </span>
                      <strong className="text-sm text-amber-900">
                        {saved.unitPrice.toFixed(2)}円/{saved.basisLabel}
                      </strong>
                    </div>

                    {bottomPriceMessage && (
                      <p
                        className={`mt-1 text-right text-xs font-bold ${
                          result.displayUnitPrice < saved.unitPrice - 0.005
                            ? "text-emerald-700"
                            : "text-slate-600"
                        }`}
                      >
                        {bottomPriceMessage}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => saveBottomPrice(result)}
                  className="mt-3 w-full rounded-xl bg-emerald-600 sm:mt-4 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  {saved ? "この価格で底値を更新" : "この商品の底値を保存"}
                </button>
              </section>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {products.length < 3 && (
            <button
              type="button"
              onClick={addProduct}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold shadow-sm transition hover:bg-slate-50"
            >
              ＋ 比較商品を追加
            </button>
          )}

          <button
            type="button"
            onClick={reset}
            className="rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100"
          >
            入力をリセット
          </button>
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50">
          {canCompare && winner ? (
            <div className="p-6 text-center sm:p-8">
              <p className="text-sm font-bold leading-5 text-emerald-700">
                {hasTie ? "今の条件では同じお得度" : "今の条件で一番お得"}
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                {hasTie
                  ? cheapestResults
                      .map((item) => item.name || "商品")
                      .join("・")
                  : winner.name || "商品"}
              </h2>

              <p className="mt-3 text-lg">
                {winner.basisLabel}あたり{" "}
                <strong className="text-emerald-700">
                  {winner.displayUnitPrice.toFixed(2)}円
                </strong>
              </p>

              {runnerUp && !hasTie && (
                <p className="mt-2 text-sm text-slate-600">
                  2番目より {winner.basisLabel}あたり{" "}
                  <strong>
                    {(
                      runnerUp.displayUnitPrice - winner.displayUnitPrice
                    ).toFixed(2)}
                    円
                  </strong>{" "}
                  安い計算です。
                </p>
              )}
            </div>
          ) : (
            <div className="p-6 text-center sm:p-8">
              <h2 className="font-bold">比較する商品を入力してください</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                比較する商品の単位をそろえると、お得な商品を判定できます。
                gとkg、mlとLは自動で換算します。
              </p>
            </div>
          )}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold leading-5 text-emerald-700">次の買い物にも使える</p>
              <h2 className="mt-1 text-2xl font-extrabold">保存した底値</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                底値はこのブラウザに保存されます。同じ商品名で比較すると、
                現在価格との差が自動で表示されます。
              </p>
            </div>

            {savedPrices.length > 0 && (
              <button
                type="button"
                onClick={clearSavedPrices}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-red-600"
              >
                すべて削除
              </button>
            )}
          </div>

          {!storageReady ? (
            <p className="mt-6 text-sm text-slate-500">底値を読み込んでいます…</p>
          ) : savedPrices.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 px-5 py-8 text-center">
              <p className="font-bold">まだ底値は保存されていません</p>
              <p className="mt-2 text-sm text-slate-500">
                商品カードの「この商品の底値を保存」から登録できます。
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-3">
              {savedPrices.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.amount}
                      {item.unit}・実質負担額 {formatYen(item.effectivePrice)}
                      {item.savedAt ? `・${formatSavedDate(item.savedAt)}保存` : ""}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {item.basisLabel}あたり
                      </p>
                      <p className="text-lg font-extrabold text-emerald-700">
                        {item.unitPrice.toFixed(2)}円
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteSavedPrice(item.id)}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 text-xs leading-5 text-slate-400">
            ※ ブラウザの保存データを削除すると、底値の記録も消えます。
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold">① 値段と容量を入力</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              398円で500g、498円で700gなど、そのまま入力できます。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold">② 割引・ポイントも反映</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              クーポンや送料まで含めた実質負担額を計算します。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold">③ 底値を次回も比較</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              一度保存しておけば、次の買い物で底値との差を確認できます。
            </p>
          </div>
        </section>

        <ComparisonGuides />

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-500">
          ※ ポイント・割引の付与条件や端数処理は店舗ごとに異なるため、
          実際の購入金額と差が出る場合があります。
        </p>
      </section>
    </main>
  );
}
