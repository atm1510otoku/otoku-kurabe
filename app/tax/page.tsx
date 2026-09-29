import type { Metadata } from "next";
import Link from "next/link";
import TaxCalculator from "./TaxCalculator";

export const metadata: Metadata = {
  title: "税込・税抜計算｜消費税8%・10%を簡単に計算",
  description:
    "税込・税抜価格を消費税8%・10%で簡単に計算できます。税抜から税込、税込から税抜の目安をすぐ確認できる無料ツールです。",
  alternates: {
    canonical: "/tax",
  },
};

export default function TaxPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">買い物の計算</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        税込・税抜価格をかんたん計算
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        金額と消費税率を入力するだけで、8%・10%の税込価格や税抜価格の目安を確認できます。
      </p>

      <div className="mt-6">
        <TaxCalculator />
      </div>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">
          税抜1,000円ならいくら？
        </h2>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p>消費税8%：1,000円 → 税込1,080円</p>
          <p>消費税10%：1,000円 → 税込1,100円</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            税込価格まで含めて商品を比較する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            商品を比較する
          </Link>
        </div>
      </div>
    </main>
  );
}
