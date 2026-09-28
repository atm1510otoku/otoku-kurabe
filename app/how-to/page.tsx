import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使い方",
  description:
    "お得くらべの使い方を、価格・容量・税込税抜・割引・ポイント・送料・底値保存まで簡単に説明します。",
};

export default function HowToPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        ← トップへ戻る
      </Link>

      <section className="mt-6">
        <p className="text-sm font-bold text-emerald-700">
          かんたん4ステップ
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">
          お得くらべの使い方
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          値札の価格や容量を入力するだけで、割引・クーポン・
          ポイント・送料まで含めた実質単価を比較できます。
        </p>
      </section>

      <div className="mt-7 space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="font-extrabold text-emerald-700">
            ① 価格と容量を入力
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            商品名、価格、容量・個数を入力します。
            gとkg、mlとLは自動で換算します。
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="font-extrabold text-emerald-700">
            ② 税込・税抜を選ぶ
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            税込表示なら「税込」のまま入力します。
            税抜価格なら「税抜」を選び、商品区分を選択してください。
          </p>

          <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-7">
            <p>
              <strong>飲食料品（持ち帰り・宅配など）</strong>
              ：軽減税率8%
            </p>
            <p>
              <strong>外食・店内飲食</strong>：10%
            </p>
            <p>
              <strong>酒類</strong>：10%
            </p>
            <p>
              <strong>日用品</strong>：10%
            </p>
            <p>
              <strong>医薬品・医薬部外品</strong>：10%
            </p>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            判断が難しい商品は「わからない」を選び、
            8%または10%を手動で指定できます。
            税込換算は比較用の目安で、店舗の端数処理などにより
            実際の金額と差が生じる場合があります。
          </p>

          <a
            href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6102.htm"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-xs font-bold text-emerald-700 underline"
          >
            国税庁「消費税の軽減税率制度」を確認
          </a>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="font-extrabold text-emerald-700">
            ③ 割引・ポイントなどを入力
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            必要に応じて割引率、クーポン、ポイント還元率、
            送料を入力します。実質負担額と実質単価が
            自動で更新されます。
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="font-extrabold text-emerald-700">
            ④ 結果を確認して底値を保存
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            一番お得な商品を確認します。
            よく買う商品は底値を保存しておけば、
            次回の買い物で以前の底値との差も確認できます。
          </p>
        </section>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}