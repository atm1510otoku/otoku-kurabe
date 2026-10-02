import type { Metadata } from "next";
import Link from "next/link";
import UnitPriceCalculator from "./UnitPriceCalculator";

export const metadata: Metadata = {
  title: "単価計算｜100g・100ml・1個あたりの値段を比較",
  description:
    "商品の価格と容量・個数から、100g・100ml・1個あたりなどの単価を計算できます。単価の計算方法や比較例、まとめ買いで失敗しないポイントも解説します。",
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
        同じ商品でも、内容量や個数が違うと表示価格だけではどちらが安いか判断しにくくなります。
        価格と容量・個数を入力すると、同じ基準あたりの価格へ換算して比較できます。
      </p>

      <div className="mt-6">
        <UnitPriceCalculator />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            単価で比べると「本当に安い商品」が分かる
          </h2>

          <p className="mt-3">
            スーパーやドラッグストアでは、同じ種類の商品でも容量や入り数が違うことがあります。
            398円の商品と498円の商品を見ただけでは、398円の方が安く見えます。
            しかし内容量まで含めて計算すると、結果が逆になることがあります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">比較例</p>
            <p className="mt-2">
              商品A：398円・500g → 100gあたり79.60円
            </p>
            <p>
              商品B：498円・700g → 100gあたり71.14円
            </p>
            <p className="mt-2 font-bold text-emerald-700">
              表示価格は商品Bの方が高くても、100gあたりでは商品Bの方が安くなります。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            100gあたりの単価はどう計算する？
          </h2>

          <p className="mt-3">
            100gあたりの価格は、商品の価格を内容量で割り、100を掛けて求めます。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              100gあたりの単価 ＝ 価格 ÷ 内容量（g）× 100
            </p>
            <p className="mt-2">
              たとえば500gで398円なら、398 ÷ 500 × 100 ＝ 79.6円です。
            </p>
          </div>

          <p className="mt-3">
            100mlあたりの場合も考え方は同じです。
            個・本・袋・枚などは、価格を入り数で割ることで1個あたり、1本あたりなどの単価を確認できます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            gとkg、mlとLは同じ単位にそろえて比較
          </h2>

          <p className="mt-3">
            500gと1kgのように単位が違う商品を比べる場合は、同じ単位へそろえる必要があります。
            1kgは1000g、1Lは1000mlです。
          </p>

          <p className="mt-3">
            お得くらべでは、gとkg、mlとLを自動で換算して、
            それぞれ100gあたり・100mlあたりの価格を表示します。
            自分で単位を変換してから計算する必要はありません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            個数が違う商品は「1個あたり」で比較する
          </h2>

          <p className="mt-3">
            ティッシュ、飲料、電池、ゴミ袋など、入り数が違う商品は1個・1本・1袋・1枚あたりの価格で比べると分かりやすくなります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p>
              例：6本入り598円 → 1本あたり約99.67円
            </p>
            <p>
              例：10本入り880円 → 1本あたり88円
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            大容量だから必ずお得とは限らない
          </h2>

          <p className="mt-3">
            「大容量」「増量」「まとめ買い」と書かれていても、小さいサイズより単価が安いとは限りません。
            セール価格や店舗ごとの価格設定によっては、小さい商品の方が安い場合もあります。
          </p>

          <p className="mt-3">
            また、単価が安くても使い切れずに捨ててしまえば、実際の節約にはなりません。
            食品なら消費期限、日用品なら保管場所や使用量も含めて選ぶのがおすすめです。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引・クーポン・ポイントがある場合は実質価格で比較
          </h2>

          <p className="mt-3">
            このページの単価計算は、入力した価格そのものを基準に計算します。
            20%OFF、100円クーポン、ポイント還元、送料などがある場合は、
            表示価格だけでは実際の負担額が変わります。
          </p>

          <p className="mt-3">
            その場合はトップページの商品比較を使うと、
            割引・クーポン・ポイント・送料まで含めた実質価格から単価を比較できます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            単価計算でよくある質問
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                100gあたりと1gあたり、どちらで比べればいい？
              </h3>
              <p className="mt-2">
                どちらでも比較結果は同じです。
                食品では100gあたりの方が数字を見やすいため、よく使われます。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                1kgと500gの商品も比較できる？
              </h3>
              <p className="mt-2">
                できます。kgを選んだ場合はgへ換算して、100gあたりの価格として比較できます。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                税込価格と税抜価格を混ぜて比較していい？
              </h3>
              <p className="mt-2">
                同じ条件にそろえてから比較する必要があります。
                税抜価格しか分からない場合は、税込・税抜計算ページで税込価格へ換算できます。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                単価が一番安い商品を選べばいい？
              </h3>
              <p className="mt-2">
                金額だけを見るなら単価が安い商品がお得ですが、
                品質、必要量、使い切れるかどうかなども含めて判断すると無駄を減らせます。
              </p>
            </div>
          </div>
        </section>

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

        <p className="text-xs leading-6 text-slate-500">
          ※計算結果は入力された価格・容量をもとにした目安です。
          実際の購入価格や内容量は、商品や販売店の表示をご確認ください。
        </p>
      </div>
    </main>
  );
}