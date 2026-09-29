"use client";

import { useMemo, useState } from "react";
import { calculatePoints } from "../lib/calculator";

export default function PointsCalculator() {
  const [price, setPrice] = useState("1000");
  const [pointRate, setPointRate] = useState("10");

  const result = useMemo(
    () =>
      calculatePoints(
        Number(price) || 0,
        Number(pointRate) || 0,
      ),
    [price, pointRate],
  );

  const formatPrice = (value: number) =>
    value.toLocaleString("ja-JP", {
      maximumFractionDigits: 2,
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-bold text-slate-900">商品価格</span>

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
          <span className="text-sm font-bold text-slate-900">
            ポイント還元率
          </span>

          <div className="relative mt-2">
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={pointRate}
              onChange={(event) => setPointRate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              %
            </span>
          </div>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[1, 5, 10, 20].map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => setPointRate(String(rate))}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold hover:border-emerald-300 hover:bg-emerald-50"
          >
            {rate}%還元
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600">獲得ポイントの目安</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {result.earnedPoints.toLocaleString("ja-JP")}ポイント
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600">実質負担額の目安</p>
            <p className="mt-1 text-3xl font-extrabold text-emerald-700">
              {formatPrice(result.effectivePrice)}円
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          1ポイント＝1円相当として計算し、獲得ポイントは小数点以下を切り捨てています。
          実際の付与条件は各店舗・サービスをご確認ください。
        </p>
      </div>
    </div>
  );
}
