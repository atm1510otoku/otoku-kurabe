import type { Metadata } from "next";
import Link from "next/link";
import UnitPriceCalculator from "./UnitPriceCalculator";

export const metadata: Metadata = {
  title: "単価比較｜100g・1個あたりの値段を簡単比較",
  description:
    "商品の価格と容量から100g・100ml・1個あたりなどの単価を比較できます。容量が違う商品でも本当に安い方を確認できます。",
  alternates: {
    canonical: "/unit-price",
  },
};

export default function UnitPricePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">買い物の基本</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        100g・100ml・1個あたりの単価をかんたん計算
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        商品の価格と容量・個数を入力すると、
        同じ基準あたりの価格をすぐ確認できます。
      </p>

      <div className="mt-6">
        <UnitPriceCalculator />
      </div>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">比較例</p>
          <p className="mt-2">
            商品A：398円・500g → 100gあたり79.60円
          </p>
          <p>
            商品B：498円・700g → 100gあたり71.14円
          </p>
          <p className="mt-2 font-bold text-emerald-700">
            表示価格は高くても、商品Bの方が単価は安くなります。
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          g・kg、ml・Lも同じ基準へ換算
        </h2>

        <p>
          お得くらべでは、gとkg、mlとLを自動換算します。
          個・本・袋・枚にも対応しています。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            割引・ポイント・送料まで含めて商品を比較する
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
