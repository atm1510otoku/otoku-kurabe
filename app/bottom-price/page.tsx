import type { Metadata } from "next";
import Link from "next/link";
import BottomPriceManager from "./BottomPriceManager";

export const metadata: Metadata = {
  title: "底値比較｜いつもの商品が本当に安いか確認",
  description:
    "商品の底値を保存し、次の買い物で現在価格と比較できます。特売やセールが本当に安いか判断する買い物支援ツールです。",
  alternates: {
    canonical: "/bottom-price",
  },
};

export default function BottomPricePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">次の買い物にも使える</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        「これ、前より安い？」を底値で確認
      </h1>

      <div className="mt-6">
        <BottomPriceManager />
      </div>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          セールになっていても、以前もっと安く買えた商品かもしれません。
          よく買う商品の底値を記録しておくと、買い時を判断しやすくなります。
        </p>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">比較例</p>
          <p className="mt-2">保存した底値：350円・500g</p>
          <p>今日の価格：450円・500g</p>
          <p className="mt-2 font-bold text-emerald-700">
            底値より100円高い（100gあたり＋20.00円）
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          底値はブラウザに保存
        </h2>

        <p>
          現在のお得くらべでは、保存した底値はこのブラウザ内に記録されます。
          同じ商品名で比較すると、保存している底値との差を自動表示できます。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            よく買う商品の底値を記録する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            底値を比較する
          </Link>
        </div>
      </div>
    </main>
  );
}
