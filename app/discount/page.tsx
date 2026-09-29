import type { Metadata } from "next";
import Link from "next/link";

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
        割引後の「本当に安い方」を比較
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          「20％OFF」と書かれていても、元の価格や容量が違えば
          必ずしも一番お得とは限りません。
        </p>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">計算例</p>
          <p className="mt-2">1,000円の商品が20％OFF → 800円</p>
          <p>800円の商品が10％OFF → 720円</p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          クーポンも一緒に計算できます
        </h2>

        <p>
          お得くらべでは割引率だけでなく、クーポン金額も入力できます。
          容量・個数を含めた実質単価までまとめて確認できます。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            セール商品の価格を比べてみる
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            割引後の価格を比較する
          </Link>
        </div>
      </div>
    </main>
  );
}
