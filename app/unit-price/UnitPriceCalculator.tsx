"use client";

import { useMemo, useState } from "react";
import {
  calculateUnitPrice,
  units,
  type Unit,
} from "../lib/calculator";

export default function UnitPriceCalculator() {
  const [price, setPrice] = useState("398");
  const [amount, setAmount] = useState("500");
  const [unit, setUnit] = useState<Unit>("g");

  const result = useMemo(
    () =>
      calculateUnitPrice(
        Number(price) || 0,
        Number(amount) || 0,
        unit,
      ),
    [price, amount, unit],
  );

  const formattedUnitPrice = Number.isFinite(result.displayUnitPrice)
    ? result.displayUnitPrice.toLocaleString("ja-JP", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "—";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <label>
          <span className="text-sm font-bold text-slate-900">価格</span>

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
          <span className="text-sm font-bold text-slate-900">容量・個数</span>

          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label>
          <span className="text-sm font-bold text-slate-900">単位</span>

          <select
            value={unit}
            onChange={(event) => setUnit(event.target.value as Unit)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {units.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
        <p className="text-sm text-slate-600">
          {result.basisLabel}あたり
        </p>

        <p className="mt-1 text-3xl font-extrabold text-emerald-700">
          {formattedUnitPrice}
          {formattedUnitPrice !== "—" ? "円" : ""}
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          容量や個数が違う商品でも、同じ基準あたりの価格で比較できます。
        </p>
      </div>
    </div>
  );
}
