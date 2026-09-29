"use client";

import { useMemo, useState } from "react";
import { calculateDiscount } from "../lib/calculator";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("1000");
  const [discountRate, setDiscountRate] = useState("20");

  const result = useMemo(
    () =>
      calculateDiscount(
        Number(price) || 0,
        Number(discountRate) || 0,
      ),
    [price, discountRate],
  );

  const formatPrice = (value: number) =>
    value.toLocaleString("ja-JP", {
      maximumFractionDigits: 2,
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-bold text-slate-900">元の価格</span>
          <div className="relative mt-2">
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              円
            </span>
          </div>
        </label>

        <label>
          <span className="text-sm font-bold text-slate-900">割引率</span>
          <div className="relative mt-2">
            <input
              type="number"
              min="0"
              max="100"
              inputMode="decimal"
              value={discountRate}
              onChange={(event) => setDiscountRate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              %
            </span>
          </div>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[10, 20, 30, 50].map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => setDiscountRate(String(rate))}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold hover:border-emerald-300 hover:bg-emerald-50"
          >
            {rate}%OFF
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600">割引額</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatPrice(result.discountAmount)}円
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600">割引後の価格</p>
            <p className="mt-1 text-3xl font-extrabold text-emerald-700">
              {formatPrice(result.discountedPrice)}円
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          実際の店舗では端数処理などにより、表示価格と差が出る場合があります。
        </p>
      </div>
    </div>
  );
}
