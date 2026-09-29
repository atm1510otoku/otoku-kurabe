"use client";

import { useMemo, useState } from "react";
import {
  toTaxExcludedPrice,
  toTaxIncludedPrice,
  type TaxRate,
} from "../lib/calculator";

type Mode = "excluded-to-included" | "included-to-excluded";

export default function TaxCalculator() {
  const [mode, setMode] = useState<Mode>("excluded-to-included");
  const [price, setPrice] = useState<string>("1000");
  const [taxRate, setTaxRate] = useState<TaxRate>(10);

  const result = useMemo(() => {
    const value = Math.max(0, Number(price) || 0);

    if (mode === "excluded-to-included") {
      return toTaxIncludedPrice(value, taxRate);
    }

    return toTaxExcludedPrice(value, taxRate);
  }, [mode, price, taxRate]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-bold">計算方法</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
          >
            <option value="excluded-to-included">税抜 → 税込</option>
            <option value="included-to-excluded">税込 → 税抜</option>
          </select>
        </label>

        <label>
          <span className="text-sm font-bold">消費税率</span>
          <select
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value) as TaxRate)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
          >
            <option value={10}>10%</option>
            <option value={8}>8%</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-bold">
          {mode === "excluded-to-included" ? "税抜価格" : "税込価格"}
        </span>

        <div className="relative mt-2">
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-lg"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            円
          </span>
        </div>
      </label>

      <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
        <p className="text-sm text-slate-600">
          {mode === "excluded-to-included" ? "税込価格" : "税抜価格の目安"}
        </p>

        <p className="mt-1 text-3xl font-extrabold text-emerald-700">
          {result.toLocaleString("ja-JP")}円
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          税率{taxRate}%で計算しています。端数処理により実際の会計と差が出る場合があります。
        </p>
      </div>
    </div>
  );
}
