import Link from "next/link";

export default function ComparisonGuides() {
  return (
    <section className="mt-10">
      <div className="text-center">
        <p className="text-sm font-bold text-emerald-700">
          買い物に役立つ
        </p>
        <h2 className="mt-1 text-xl font-extrabold">
          比較・計算ガイド
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/unit-price"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <p className="font-bold">単価比較</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            100g・100ml・1個あたりの値段を比べる
          </p>
        </Link>

        <Link
          href="/discount"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <p className="font-bold">割引計算</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            ○％OFFやクーポン後の価格を確認する
          </p>
        </Link>

        <Link
          href="/points"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <p className="font-bold">ポイント還元</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            ポイント込みの実質価格を比べる
          </p>
        </Link>

        <Link
          href="/bottom-price"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
        >
          <p className="font-bold">底値比較</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            いつもの商品が本当に安いか確認する
          </p>
        </Link>
      </div>
    </section>
  );
}
