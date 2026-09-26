import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ポイント還元比較｜ポイント込みの実質価格を計算",
  description:
    "ポイント還元率を含めた実質負担額を計算し、価格・容量・送料まで含めてどの商品がお得か比較できます。",
};

export default function PointsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">還元率まで計算</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        ポイント込みの実質価格を比較
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          同じ商品でも、店舗ごとにポイント還元率が違うと
          実質的な負担額は変わります。
        </p>

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">計算例</p>
          <p className="mt-2">
            1,000円・10％還元 → 約100ポイント還元
          </p>
          <p>実質負担の目安 → 約900円</p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          送料も含めて比較できます
        </h2>

        <p>
          ネット通販では、ポイント還元が多くても送料を加えると
          別の店舗の方が安いことがあります。
          お得くらべでは送料も含めた実質負担額を比較できます。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            ポイント・送料込みで比べてみる
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            実質価格を比較する
          </Link>
        </div>
      </div>
    </main>
  );
}
