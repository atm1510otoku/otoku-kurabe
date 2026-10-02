import type { Metadata } from "next";
import Link from "next/link";
import BottomPriceManager from "./BottomPriceManager";

export const metadata: Metadata = {
  title: "底値比較・記録｜いつもの商品が本当に安いか確認",
  description:
    "よく買う商品の底値を保存し、次の買い物で現在価格と比較できます。底値の考え方、単価で記録する理由、特売や大容量商品を比べるコツも解説します。",
  alternates: {
    canonical: "/bottom-price",
  },
};

export default function BottomPricePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">
        次の買い物にも使える
      </p>

      <h1 className="mt-2 text-2xl font-extrabold">
        「これ、前より安い？」を底値で確認
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        よく買う商品の安かった価格を残しておくと、
        次に店頭や通販で見かけた価格が本当に安いのか判断しやすくなります。
        お得くらべでは、保存した底値を一覧で確認できます。
      </p>

      <div className="mt-6">
        <BottomPriceManager />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            底値とは？
          </h2>

          <p className="mt-3">
            底値とは、同じ商品や同じ条件の商品について、
            自分がこれまで確認・購入した中で特に安かった価格を
            買い物の目安として記録したものです。
          </p>

          <p className="mt-3">
            「セール」「特売」と表示されていても、
            過去にもっと安く売られていたことがあります。
            底値を残しておくと、広告の表現だけではなく
            自分の過去の価格を基準に判断できます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            表示価格だけでなく単価で底値を比べる
          </h2>

          <p className="mt-3">
            内容量が変わる商品では、「1袋350円」のような表示価格だけを
            底値として覚えていると正しく比較できないことがあります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">比較例</p>
            <p className="mt-2">
              過去：350円・500g → 100gあたり70.00円
            </p>
            <p>
              今日：450円・700g → 100gあたり約64.29円
            </p>
            <p className="mt-2 font-bold text-emerald-700">
              表示価格は今日の方が高くても、単価では今日の方が安くなります。
            </p>
          </div>

          <p className="mt-3">
            容量や入り数が変わる可能性がある商品は、
            100g・100ml・1個あたりなど同じ基準で記録すると比較しやすくなります。
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
            「特売」だから底値とは限らない
          </h2>

          <p className="mt-3">
            特売やセールは通常価格より安いことを示していても、
            自分が以前購入した最安価格より安いとは限りません。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p>保存した底値：350円・500g</p>
            <p>今日の特売：450円・500g</p>
            <p className="mt-2 font-bold text-emerald-700">
              この場合は底値より100円高いため、
              過去の記録と比べると買い急ぐ必要はないと判断できます。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            大容量・まとめ買いも底値と比較する
          </h2>

          <p className="mt-3">
            大容量パックやまとめ買いは安く見えますが、
            必ずしも小さいサイズより単価が安いとは限りません。
          </p>

          <p className="mt-3">
            過去の底値と比べるときも、
            総額ではなく同じ容量・個数あたりへ換算すると公平に比較できます。
            使い切れない量を買ってしまうと節約にならないため、
            必要量もあわせて考えるのがおすすめです。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引・ポイント・送料がある場合は実質価格で考える
          </h2>

          <p className="mt-3">
            ネット通販やキャンペーンでは、
            表示価格だけでなく割引、クーポン、ポイント還元、送料によって
            実際の負担額が変わります。
          </p>

          <p className="mt-3">
            お得くらべのトップページでは、
            これらを含めた実質価格から単価を計算し、
            その商品を底値として保存できます。
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/discount"
              className="font-bold text-emerald-700 underline underline-offset-4"
            >
              割引後の価格を計算
            </Link>

            <Link
              href="/points"
              className="font-bold text-emerald-700 underline underline-offset-4"
            >
              ポイント還元を計算
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            底値を記録するときの商品名のコツ
          </h2>

          <p className="mt-3">
            同じ商品をあとから見つけやすくするため、
            商品名は毎回なるべく同じ書き方で保存するのがおすすめです。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              例
            </p>
            <p className="mt-2">
              「牛乳」だけではなく「○○牛乳」のように区別する
            </p>
            <p>
              「洗剤」だけではなくブランド名や種類も入れる
            </p>
          </div>

          <p className="mt-3">
            容量違いや別の商品を同じ名前で扱うと比較しにくくなるため、
            自分が後から分かる名前にしておくと管理しやすくなります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            保存した底値はこのブラウザ内に保存される
          </h2>

          <p className="mt-3">
            現在のお得くらべでは、底値データをアカウントやサーバーへ保存せず、
            利用しているブラウザ内に記録します。
          </p>

          <p className="mt-3">
            そのため、別の端末や別のブラウザには自動で引き継がれません。
            ブラウザのサイトデータを削除した場合などには、
            保存した底値が消えることがあります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            底値比較でよくある質問
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                底値は何円で記録すればいい？
              </h3>
              <p className="mt-2">
                内容量が変わらない商品なら購入価格でも比較できます。
                容量違いの商品も比べる場合は、100g・100ml・1個あたりなどの
                単価も確認すると比較しやすくなります。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                底値より高かったら買わない方がいい？
              </h3>
              <p className="mt-2">
                底値はあくまで判断材料の一つです。
                在庫がない、すぐ必要、価格が上がっているなどの場合は、
                底値より高くても購入する必要があります。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                保存した底値は別のスマホやPCでも見られる？
              </h3>
              <p className="mt-2">
                現在はブラウザ内に保存する方式のため、
                別の端末やブラウザへ自動同期されません。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                保存した底値を削除できる？
              </h3>
              <p className="mt-2">
                できます。このページから個別に削除できるほか、
                保存済みデータをまとめて削除することもできます。
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            今日の価格を比べて、安かった商品を底値として保存する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            商品を比較する
          </Link>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          ※底値はユーザー自身が入力・保存した価格をもとにした買い物の目安です。
          実際の価格、内容量、販売条件などは各店舗・販売サイトでご確認ください。
        </p>
      </div>
    </main>
  );
}