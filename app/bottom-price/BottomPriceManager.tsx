"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BOTTOM_PRICE_STORAGE_KEY,
  type SavedBottomPrice,
} from "../lib/bottom-price";

export default function BottomPriceManager() {
  const [savedPrices, setSavedPrices] = useState<SavedBottomPrice[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(BOTTOM_PRICE_STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            setSavedPrices(parsed);
          }
        }
      } catch {
        // 壊れた保存データがあってもページは表示する
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    localStorage.setItem(
      BOTTOM_PRICE_STORAGE_KEY,
      JSON.stringify(savedPrices),
    );
  }, [savedPrices, storageReady]);

  const removeItem = (id: string) => {
    setSavedPrices((current) =>
      current.filter((item) => item.id !== id),
    );
  };

  const clearAll = () => {
    if (!window.confirm("保存した底値をすべて削除しますか？")) {
      return;
    }

    setSavedPrices([]);
  };

  if (!storageReady) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
        保存した底値を読み込んでいます…
      </div>
    );
  }

  if (savedPrices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="font-bold text-slate-900">
          保存済みの底値はまだありません
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          商品比較画面で「この商品の底値を保存」を押すと、
          ここに一覧表示されます。
        </p>

        <Link
          href="/"
          className="mt-5 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white"
        >
          商品を比較して底値を保存する
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-900">
          保存済み {savedPrices.length}件
        </p>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
        >
          すべて削除
        </button>
      </div>

      <div className="space-y-3">
        {savedPrices.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  保存価格：
                  {Math.round(item.effectivePrice).toLocaleString("ja-JP")}円
                  ・{item.amount}
                  {item.unit}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                削除
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-slate-600">
                保存した底値
              </p>

              <p className="mt-1 text-xl font-extrabold text-emerald-700">
                {item.unitPrice.toFixed(2)}円 / {item.basisLabel}
              </p>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              保存日：
              {new Date(item.savedAt).toLocaleDateString("ja-JP")}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white"
        >
          今日の価格と比較する
        </Link>
      </div>
    </div>
  );
}
