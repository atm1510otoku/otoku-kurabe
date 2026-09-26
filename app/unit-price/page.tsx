import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "単価比較｜100g・1個あたりの値段を簡単比較",
  description:
    "商品の価格と容量から100g・100ml・1個あたりなどの単価を比較できます。容量が違う商品でも本当に安い方を確認できます。",
};

export default function UnitPricePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">買い物の基本</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        単価を比べれば、本当に安い商品が分かる
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          商品の値段だけを見ると安く見えても、容量や個数が違えば
          実際のお得さは変わります。
        </p>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">比較例</p>
          <p className="mt-2">商品A：398円・500g → 100gあたり79.60円</p>
          <p>商品B：498円・700g → 100gあたり71.14円</p>
          <p className="mt-2 font-bold text-emerald-700">
            表示価格は高くても、商品Bの方がお得です。
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          gとkg、mlとLも比較できます
        </h2>

        <p>
          お得くらべでは単位を自動換算し、同じ量あたりの価格で比較できます。
          個・本・袋・枚にも対応しています。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            今買おうとしている商品を比べてみる
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            単価を比較する
          </Link>
        </div>
      </div>
    </main>
  );
}
