"use client";

import { useEffect, useMemo, useState } from "react";

const units = [
  { value: "g", label: "g", factor: 1, compareKey: "weight", basis: 100, basisLabel: "100g" },
  { value: "kg", label: "kg", factor: 1000, compareKey: "weight", basis: 100, basisLabel: "100g" },
  { value: "ml", label: "ml", factor: 1, compareKey: "volume", basis: 100, basisLabel: "100ml" },
  { value: "L", label: "L", factor: 1000, compareKey: "volume", basis: 100, basisLabel: "100ml" },
  { value: "個", label: "個", factor: 1, compareKey: "piece", basis: 1, basisLabel: "1個" },
  { value: "本", label: "本", factor: 1, compareKey: "bottle", basis: 1, basisLabel: "1本" },
  { value: "袋", label: "袋", factor: 1, compareKey: "bag", basis: 1, basisLabel: "1袋" },
  { value: "枚", label: "枚", factor: 1, compareKey: "sheet", basis: 1, basisLabel: "1枚" },
] as const;

type Unit = (typeof units)[number]["value"];

type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
  unit: Unit;
  discountRate: number;
  coupon: number;
  pointRate: number;
  shipping: number;
};

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

function getUnitMeta(unit: Unit) {
  return units.find((item) => item.value === unit)!;
}

function formatYen(value: number) {
  return `${Math.max(0, Math.round(value)).toLocaleString("ja-JP")}円`;
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function calculate(product: Product) {
  const meta = getUnitMeta(product.unit);

  const price = Math.max(0, product.price || 0);
  const amount = Math.max(0, product.amount || 0);
  const discountRate = Math.min(100, Math.max(0, product.discountRate || 0));
  const coupon = Math.max(0, product.coupon || 0);
  const pointRate = Math.max(0, product.pointRate || 0);
  const shipping = Math.max(0, product.shipping || 0);

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
      result.price <= 0 ||
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
      amount: result.amount,
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl font-bold text-white">
              得
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight">お得くらべ</p>
              <p className="text-sm text-slate-500">
                値段だけでは分からない「本当にお得」を比較
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-bold text-emerald-700">
            買う前に、10秒で比較
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            結局、どっちがお得？
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-slate-600">
            容量・割引・クーポン・ポイント・送料まで含めて、
            実質価格と実質単価をまとめて比較します。
          </p>
        </div>

        {notice && (
          <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-900">
            {notice}
          </div>
        )}

        <div className={gridClass}>
          {products.map((product, index) => {
            const result = results.find((item) => item.id === product.id)!;
            const saved = getSavedPrice(product.name, result.compareKey);

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
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
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
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </label>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold">価格</span>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        min="0"
                        value={product.price}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            price: Number(event.target.value),
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
                    <span className="text-sm font-bold">容量・個数</span>
                    <div className="mt-2 flex">
                      <input
                        type="number"
                        min="0"
                        value={product.amount}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            amount: Number(event.target.value),
                          })
                        }
                        className="min-w-0 flex-1 rounded-l-xl border border-r-0 border-slate-300 px-3 py-2.5 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />

                      <select
                        value={product.unit}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            unit: event.target.value as Unit,
                          })
                        }
                        className="rounded-r-xl border border-slate-300 bg-white px-2 py-2.5 outline-none"
                      >
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-bold">割引率</span>
                    <div className="relative mt-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={product.discountRate}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            discountRate: Number(event.target.value),
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
                    <div className="relative mt-2">
                      <input
                        type="number"
                        min="0"
                        value={product.coupon}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            coupon: Number(event.target.value),
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
                    <div className="relative mt-2">
                      <input
                        type="number"
                        min="0"
                        value={product.pointRate}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            pointRate: Number(event.target.value),
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
                    <div className="relative mt-2">
                      <input
                        type="number"
                        min="0"
                        value={product.shipping}
                        onChange={(event) =>
                          updateProduct(product.id, {
                            shipping: Number(event.target.value),
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

                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
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
                  className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  {saved ? "この価格で底値を更新" : "この商品の底値を保存"}
                </button>
              </section>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
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
              <p className="text-sm font-bold text-emerald-700">
                今の条件で一番お得
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                {winner.name || "商品"}
              </h2>

              <p className="mt-3 text-lg">
                {winner.basisLabel}あたり{" "}
                <strong className="text-emerald-700">
                  {winner.displayUnitPrice.toFixed(2)}円
                </strong>
              </p>

              {runnerUp && (
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
              <p className="text-sm font-bold text-emerald-700">次の買い物にも使える</p>
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

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-500">
          ※ ポイント・割引の付与条件や端数処理は店舗ごとに異なるため、
          実際の購入金額と差が出る場合があります。
        </p>
      </section>
    </main>
  );
}
