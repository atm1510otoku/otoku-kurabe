import type { Metadata } from "next";
import Link from "next/link";
import PointsCalculator from "./PointsCalculator";

export const metadata: Metadata = {
  title: "ポイント還元比較｜ポイント込みの実質価格を計算",
  description:
    "ポイント還元率を含めた実質負担額を計算し、価格・容量・送料まで含めてどの商品がお得か比較できます。",
  alternates: {
    canonical: "/points",
  },
};

export default function PointsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">還元率まで計算</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        ポイント還元後の実質価格をかんたん計算
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        商品価格とポイント還元率を入力するだけで、
        獲得ポイントと実質負担額の目安を確認できます。
      </p>

      <div className="mt-6">
        <PointsCalculator />
      </div>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">計算例</p>
          <p className="mt-2">
            1,000円・10％還元 → 100ポイント
          </p>
          <p>実質負担の目安 → 900円</p>
        </div>

        <h2 className="text-lg font-bold text-slate-900">
          送料や割引まで含めて比較するなら
        </h2>

        <p>
          ネット通販では、ポイント還元が多くても送料を加えると
          別の商品や店舗の方が安くなる場合があります。
          お得くらべの商品比較では、割引・クーポン・ポイント・送料・容量を
          まとめて比較できます。
        </p>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            ポイント・送料込みで商品を比べてみる
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
