import type { Metadata } from "next";
import Link from "next/link";
import DiscountCalculator from "./DiscountCalculator";

export const metadata: Metadata = {
  title: "割引計算｜○％OFF後の価格と単価を比較",
  description:
    "10％OFF、20％OFFなどの割引後価格を計算し、容量や個数まで含めた実質単価で商品を比較できます。",
  alternates: {
    canonical: "/discount",
  },
};

export default function DiscountPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">セールでも迷わない</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        割引後の価格をかんたん計算
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        元の価格と割引率を入力するだけで、割引額と支払う価格をすぐ確認できます。
      </p>

      <div className="mt-6">
        <DiscountCalculator />
      </div>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">計算例</p>
          <p className="mt-2">1,000円の商品が20％OFF → 800円</p>
          <p>800円の商品が10％OFF → 720円</p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          クーポンや容量まで含めて比較するなら
        </h2>

        <p>
          お得くらべの商品比較では、割引率だけでなくクーポン、
          ポイント、送料、容量・個数まで含めた実質単価を比較できます。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            セール商品の本当のお得度を比べてみる
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
