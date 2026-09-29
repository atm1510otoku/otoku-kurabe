import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お得くらべについて",
  description:
    "お得くらべの目的と、買い物の価格比較で提供している機能について説明します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold">お得くらべについて</h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          お得くらべは、商品の表示価格だけでは分かりにくい
          「本当にお得な方」を比較するための買い物支援サイトです。
        </p>

        <p>
          価格や容量・個数だけでなく、割引、クーポン、ポイント還元、
          送料なども含めて実質負担額と実質単価を計算できます。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          底値も記録できます
        </h2>

        <p>
          気になった商品の底値をブラウザに保存し、
          次の買い物で現在の価格と比較できます。
          同じ商品を繰り返し買うときにも使えるよう設計しています。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          分かりやすさを重視しています
        </h2>

        <p>
          複雑な設定をせず、買い物中でも短時間で比較できることを重視しています。
          今後も買い物に役立つ比較機能を追加していく予定です。
        </p>
      </div>
    </main>
  );
}
