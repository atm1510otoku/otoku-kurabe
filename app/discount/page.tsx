import type { Metadata } from "next";
import Link from "next/link";
import DiscountCalculator from "./DiscountCalculator";

export const metadata: Metadata = {
  title: "割引計算｜10%OFF・20%OFF・30%OFF後の価格を計算",
  description:
    "元の価格と割引率から、10%OFF・20%OFF・30%OFFなどの割引額と支払価格を計算できます。割引の計算方法、クーポンやポイントとの違い、買い物での注意点も解説します。",
  alternates: {
    canonical: "/discount",
  },
};

export default function DiscountPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">セールでも迷わない</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        割引後の価格をかんたん計算
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        元の価格と割引率を入力すると、割引される金額と実際に支払う価格をすぐ確認できます。
        10%OFF、20%OFF、30%OFF、50%OFFなどのセール価格を比べたいときに使えます。
      </p>

      <div className="mt-6">
        <DiscountCalculator />
      </div>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-900">
            ○%OFFはどう計算する？
          </h2>

          <p className="mt-3">
            割引額は「元の価格 × 割引率」で求めます。
            その割引額を元の価格から引くと、実際に支払う価格が分かります。
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-bold text-slate-900">
              割引額 ＝ 元の価格 × 割引率
            </p>
            <p className="mt-2 font-bold text-slate-900">
              割引後の価格 ＝ 元の価格 − 割引額
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p className="font-bold text-slate-900">1,000円の商品なら</p>
            <p className="mt-2">10%OFF → 100円引き → 900円</p>
            <p>20%OFF → 200円引き → 800円</p>
            <p>30%OFF → 300円引き → 700円</p>
            <p>50%OFF → 500円引き → 500円</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            20%OFFなら「価格の8割」を支払う
          </h2>

          <p className="mt-3">
            20%OFFは、元の価格から20%を引くため、支払うのは元の価格の80%です。
            同じように30%OFFなら70%、40%OFFなら60%、50%OFFなら50%を支払います。
          </p>

          <p className="mt-3">
            たとえば2,480円の商品が20%OFFなら、
            2,480 × 0.8 ＝ 1,984円と計算できます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            「○%OFF」と「○円引き」はどちらがお得？
          </h2>

          <p className="mt-3">
            商品価格によって結果が変わります。
            たとえば1,000円の商品なら20%OFFは200円引きなので、
            100円引きクーポンより20%OFFの方が値引き額は大きくなります。
          </p>

          <p className="mt-3">
            一方、500円の商品なら20%OFFは100円引きなので、
            150円引きクーポンが使えるなら150円引きの方が大きな値引きになります。
          </p>

          <div className="mt-4 rounded-2xl bg-emerald-50 p-5">
            <p className="font-bold text-slate-900">
              比べるときは、%ではなく「最終的に何円支払うか」を確認するのが確実です。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引とクーポンを併用するときの注意
          </h2>

          <p className="mt-3">
            セール価格にさらにクーポンが使えることもあります。
            ただし、割引とクーポンを併用できるか、どちらを先に適用するかは店舗やサービスによって異なります。
          </p>

          <p className="mt-3">
            「20%OFF後に100円引き」と「100円引き後に20%OFF」では、
            元の価格によって最終価格が変わるため、実際の適用条件を確認して計算するのがおすすめです。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引とポイント還元は同じではない
          </h2>

          <p className="mt-3">
            20%OFFは、その買い物で支払う金額が20%少なくなります。
            一方、20%ポイント還元は、いったん代金を支払い、
            条件に応じて後からポイントが付与される仕組みです。
          </p>

          <p className="mt-3">
            ポイントには利用期限、利用先、付与対象外商品、付与上限などの条件がある場合があります。
            現金の値引きと同じ扱いにせず、実際に使えるポイントかも含めて比べると分かりやすくなります。
          </p>

          <Link
            href="/points"
            className="mt-3 inline-block font-bold text-emerald-700 underline underline-offset-4"
          >
            ポイント還元を計算する
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            税込・税抜の価格をそろえて比較する
          </h2>

          <p className="mt-3">
            片方が税込価格、もう片方が税抜価格のままでは正しく比較できません。
            商品同士を比べるときは、税込または税抜のどちらかにそろえてから割引を計算します。
          </p>

          <p className="mt-3">
            また、実際のレジでは税計算や端数処理の方法により、
            手計算した金額と数円程度の差が出る場合があります。
          </p>

          <Link
            href="/tax"
            className="mt-3 inline-block font-bold text-emerald-700 underline underline-offset-4"
          >
            税込・税抜価格を計算する
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引率だけでは「どちらがお得か」は決まらない
          </h2>

          <p className="mt-3">
            30%OFFの商品が、10%OFFの商品より必ずお得とは限りません。
            元の価格や内容量、個数が違えば、割引後の単価も変わります。
          </p>

          <div className="mt-4 rounded-2xl bg-slate-100 p-5">
            <p>商品A：500g・500円 → 20%OFF → 400円</p>
            <p>商品B：700g・650円 → 10%OFF → 585円</p>
            <p className="mt-2">
              このような場合は、割引後価格だけでなく100gあたりなどの単価へ換算して比べると判断しやすくなります。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            割引計算でよくある質問
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                10%OFFはどうやって暗算する？
              </h3>
              <p className="mt-2">
                元の価格の10分の1が割引額です。
                1,980円なら198円引きなので、割引後は1,782円です。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                30%OFFは何掛け？
              </h3>
              <p className="mt-2">
                支払うのは元の価格の70%なので、元の価格に0.7を掛けます。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                半額と50%OFFは同じ？
              </h3>
              <p className="mt-2">
                数学上は同じで、どちらも元の価格の50%を支払うことを意味します。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                割引後の価格に小数が出たらどうなる？
              </h3>
              <p className="mt-2">
                実際の販売価格では、店舗やサービスごとの端数処理ルールが適用されるため、
                この計算結果と差が出る場合があります。
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            割引・クーポン・ポイント・送料まで含めて比較する
          </p>

          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            商品を比較する
          </Link>
        </div>

        <p className="text-xs leading-6 text-slate-500">
          ※計算結果は入力値をもとにした目安です。
          実際の割引条件、クーポンの併用可否、端数処理などは販売店やサービスの表示をご確認ください。
        </p>
      </div>
    </main>
  );
}