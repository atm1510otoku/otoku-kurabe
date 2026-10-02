import type { Metadata } from "next";
import Link from "next/link";
import PointsCalculator from "./PointsCalculator";

export const metadata: Metadata = {
  title: "ポイント還元計算｜1%・5%・10%・20%還元の実質価格",
  description:
    "商品価格とポイント還元率から、獲得ポイントと実質負担額の目安を計算できます。ポイント還元と値引きの違い、付与上限や有効期限などの注意点も解説します。",
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
        商品価格とポイント還元率を入力すると、
        獲得ポイントと、1ポイント＝1円として使える場合の実質負担額の目安を確認できます。
      </p>

      <div className="mt-6">
        <PointsCalculator />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            ポイント還元はどう計算する？
          </h2>

          <p className="mt-3">
            獲得ポイントの目安は「商品価格 × ポイント還元率」で求めます。
            1ポイント＝1円として使える場合は、そのポイント分を価格から差し引くことで
            実質負担額の目安を考えられます。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              獲得ポイント ＝ 商品価格 × ポイント還元率
            </p>
            <p className="mt-2 font-bold text-slate-900">
              実質負担額の目安 ＝ 商品価格 − 獲得ポイント相当額
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">
              1,000円の商品なら
            </p>
            <p className="mt-2">1%還元 → 10ポイント → 実質990円相当</p>
            <p>5%還元 → 50ポイント → 実質950円相当</p>
            <p>10%還元 → 100ポイント → 実質900円相当</p>
            <p>20%還元 → 200ポイント → 実質800円相当</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            20%OFFと20%ポイント還元は同じではない
          </h2>

          <p className="mt-3">
            金額だけを単純計算すると、1,000円の商品で20%OFFなら支払額は800円、
            20%ポイント還元なら1,000円を支払って200ポイントを受け取る形になります。
          </p>

          <p className="mt-3">
            20%OFFはその場で支払額が減りますが、ポイント還元では通常、
            いったん代金を支払ってからポイントを受け取ります。
            ポイントを使わなければ、実際の節約にはつながりません。
          </p>

          <div className="mt-4 rounded-2xl bg-emerald-50 p-5">
            <p className="font-bold text-slate-900">
              「同じ20%」でも、現金値引きとポイント還元では使い勝手が異なります。
            </p>
          </div>

          <Link
            href="/discount"
            className="mt-3 inline-block font-bold text-emerald-700 underline underline-offset-4"
          >
            割引後の価格を計算する
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            ポイントは「何円分として使えるか」を確認する
          </h2>

          <p className="mt-3">
            この計算機では、分かりやすくするため1ポイント＝1円相当として計算しています。
            ただし、ポイントサービスによって価値や利用方法は異なります。
          </p>

          <p className="mt-3">
            1ポイントを1円として使えない場合や、
            特定の商品・サービスへの交換で価値が変わる場合は、
            単純に現金と同じ金額として比較できないことがあります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            高還元でも「付与上限」に注意
          </h2>

          <p className="mt-3">
            「20%還元」「50%還元」など還元率が高いキャンペーンでも、
            もらえるポイントに上限が設定されている場合があります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">例</p>
            <p className="mt-2">
              20%還元・上限1,000ポイントの場合、
              10,000円購入しても2,000ポイントではなく、
              最大1,000ポイントまでという条件なら、実際の還元率は下がります。
            </p>
          </div>

          <p className="mt-3">
            大きな買い物ほど、還元率だけでなく
            「1回あたり」「期間中合計」などのポイント上限も確認することが重要です。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            有効期限や使える店も含めて考える
          </h2>

          <p className="mt-3">
            ポイントには有効期限が設定されていることがあります。
            期間限定ポイントのように、通常ポイントより短期間で失効するものもあります。
          </p>

          <p className="mt-3">
            また、使える店舗やサービスが限られている場合、
            自分が普段利用しないポイントを大量にもらっても、
            額面どおりのお得さを得られないことがあります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            クーポンや割引と併用するときは付与対象額を確認
          </h2>

          <p className="mt-3">
            クーポンや値引きを使った場合、
            ポイントが「値引き前の価格」に付くのか、
            「値引き後の支払額」に付くのかはサービスによって異なります。
          </p>

          <p className="mt-3">
            ポイント利用分が新たなポイント付与の対象外になる場合もあるため、
            正確に比較したいときは各店舗やサービスの付与条件を確認してください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            送料を含めると高還元の商品が高くなることもある
          </h2>

          <p className="mt-3">
            ネット通販では、商品価格とポイント還元だけでなく送料も重要です。
            高還元の商品でも送料が加わると、
            ポイントが少ない送料無料の商品より実質負担が大きくなる場合があります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p>商品A：1,000円・10%還元・送料300円</p>
            <p>商品B：1,100円・還元なし・送料無料</p>
            <p className="mt-2">
              商品Aは100ポイントを差し引いて考えても実質1,200円相当なので、
              この条件では商品Bの方が負担額は小さくなります。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            容量が違う商品は実質価格だけでなく単価も比較
          </h2>

          <p className="mt-3">
            ポイント還元後の価格が安くても、内容量が少なければ
            100gあたり・100mlあたり・1個あたりでは高いことがあります。
          </p>

          <p className="mt-3">
            容量や個数が違う商品では、
            ポイントを考慮した価格に加えて単価までそろえると、
            より公平に比較できます。
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
            ポイント還元でよくある質問
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                1,980円で10%還元なら何ポイント？
              </h3>
              <p className="mt-2">
                単純計算では198ポイントです。
                実際の付与ポイントは、対象金額や端数処理のルールによって異なる場合があります。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                ポイント還元率が高い商品を選べば必ずお得？
              </h3>
              <p className="mt-2">
                必ずしもそうとは限りません。
                商品価格、送料、付与上限、有効期限、ポイントを実際に使えるかまで含めて比較する必要があります。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                期間限定ポイントも同じように考えていい？
              </h3>
              <p className="mt-2">
                金額上は同じ価値でも、期限内に使えなければ価値を十分に得られません。
                通常ポイントより利用条件を確認することが重要です。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                ポイントで支払った分にもポイントは付く？
              </h3>
              <p className="mt-2">
                サービスによって異なります。
                ポイント利用分を付与対象外とする場合もあるため、
                各サービスの条件を確認してください。
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            割引・クーポン・ポイント・送料までまとめて比較する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            実質価格を比較する
          </Link>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          ※このページでは1ポイント＝1円相当として実質負担額の目安を計算しています。
          実際のポイント価値、付与率、対象金額、付与上限、有効期限、端数処理などは
          各店舗・サービスの条件をご確認ください。
        </p>
      </div>
    </main>
  );
}