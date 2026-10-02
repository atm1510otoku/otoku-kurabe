import type { Metadata } from "next";
import Link from "next/link";
import TaxCalculator from "./TaxCalculator";

export const metadata: Metadata = {
  title: "税込・税抜計算｜消費税8%・10%をかんたん計算",
  description:
    "税抜から税込、税込から税抜を消費税8%・10%で計算できます。計算式、逆算方法、端数処理、軽減税率や割引時の注意点も分かりやすく解説します。",
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
        金額と消費税率を入力すると、8%・10%の税込価格や税抜価格の目安を確認できます。
        税抜から税込だけでなく、税込価格から税抜価格を逆算したいときにも使えます。
      </p>

      <div className="mt-6">
        <TaxCalculator />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税込と税抜の違い
          </h2>

          <p className="mt-3">
            税抜価格は消費税を含まない価格、
            税込価格は消費税を含めた実際の支払額の目安です。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">
              税抜1,000円の場合
            </p>
            <p className="mt-2">
              消費税8% → 税込1,080円
            </p>
            <p>
              消費税10% → 税込1,100円
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税抜から税込を計算する方法
          </h2>

          <p className="mt-3">
            税抜価格に、税率を含めた倍率を掛けます。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              10%の場合：税抜価格 × 1.10
            </p>
            <p className="mt-2 font-bold text-slate-900">
              8%の場合：税抜価格 × 1.08
            </p>
          </div>

          <p className="mt-3">
            たとえば税抜2,000円なら、10%では2,200円、
            8%では2,160円が税込価格の計算上の目安になります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税込から税抜を逆算する方法
          </h2>

          <p className="mt-3">
            税込価格から税抜価格を求める場合は、
            税込価格を1.10または1.08で割ります。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              10%の場合：税込価格 ÷ 1.10
            </p>
            <p className="mt-2 font-bold text-slate-900">
              8%の場合：税込価格 ÷ 1.08
            </p>
          </div>

          <p className="mt-3">
            たとえば税込1,100円を10%で逆算すると、
            1,100 ÷ 1.10 ＝ 1,000円です。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税込価格から10%を引くだけでは税抜価格にならない
          </h2>

          <p className="mt-3">
            よくある間違いが、税込価格からそのまま10%を引く方法です。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p>税込1,100円から10%を引く → 990円</p>
            <p className="mt-2">
              しかし、税抜価格は1,000円です。
            </p>
          </div>

          <p className="mt-3">
            消費税10%は「税抜価格に対する10%」なので、
            税込価格から逆算するときは1.10で割る必要があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            8%と10%はどう使い分ける？
          </h2>

          <p className="mt-3">
            日本の消費税では、通常10%が基本ですが、
            一部の取引には8%の軽減税率が適用されます。
          </p>

          <p className="mt-3">
            同じように見える商品やサービスでも、
            販売方法や取引内容によって適用される税率が異なる場合があります。
            正確な税率は、店舗・レシート・商品表示などで確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            端数が出ると実際の会計と違うことがある
          </h2>

          <p className="mt-3">
            税込・税抜を計算すると、1円未満の端数が出ることがあります。
            実際の会計では、事業者や取引ごとの端数処理によって、
            計算結果と数円程度の差が出る場合があります。
          </p>

          <p className="mt-3">
            このページの結果は買い物時の比較や目安として使い、
            最終的な支払額はレジや販売画面の表示を確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引商品は「何を基準に値引きするか」も確認
          </h2>

          <p className="mt-3">
            セールやクーポンでは、
            税込価格を基準に値引きする場合と、
            税抜価格を基準に計算する場合があります。
          </p>

          <p className="mt-3">
            同じ「20%OFF」でも、店舗やサービスの表示方法や端数処理によって
            最終金額がわずかに異なることがあります。
          </p>

          <Link
            href="/discount"
            className="mt-3 inline-block font-bold text-emerald-700 underline underline-offset-4"
          >
            割引後の価格を計算する
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            商品を比べるときは税込・税抜をそろえる
          </h2>

          <p className="mt-3">
            商品Aが税込価格、商品Bが税抜価格のままでは、
            表示されている数字だけを見て公平に比較できません。
          </p>

          <p className="mt-3">
            比較するときは両方を税込価格にするなど、
            同じ条件へそろえてから単価を計算するのがおすすめです。
          </p>

          <Link
            href="/unit-price"
            className="mt-3 inline-block font-bold text-emerald-700 underline underline-offset-4"
          >
            100g・100ml・1個あたりの単価を計算する
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税込・税抜計算でよくある質問
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                税抜1,500円を10%税込にすると？
              </h3>
              <p className="mt-2">
                1,500 × 1.10 ＝ 1,650円です。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                税込2,200円を10%で税抜にすると？
              </h3>
              <p className="mt-2">
                2,200 ÷ 1.10 ＝ 2,000円です。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                税抜価格に10%を足せば税込になる？
              </h3>
              <p className="mt-2">
                10%の税率が適用される場合は、
                税抜価格に10%分を加えることで税込価格の目安を求められます。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                計算結果とレシートの金額が違うのはなぜ？
              </h3>
              <p className="mt-2">
                端数処理、税率、値引きの適用方法などによって差が出る場合があります。
                実際の支払額は販売店の表示を確認してください。
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            税込価格・割引・ポイント・送料まで含めて比較する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            商品を比較する
          </Link>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          ※このページの計算結果は目安です。
          実際に適用される税率、端数処理、割引方法などは
          店舗・事業者・商品・取引内容によって異なる場合があります。
        </p>
      </div>
    </main>
  );
}