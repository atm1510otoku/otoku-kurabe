import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  description: "お得くらべの計算結果や掲載情報に関する免責事項です。",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold">免責事項</h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          お得くらべの計算結果は、入力された内容をもとに算出した参考値です。
        </p>

        <p>
          実際の販売価格、ポイント付与条件、クーポンの適用条件、
          送料、税金、端数処理などは店舗やサービスによって異なる場合があります。
        </p>

        <p>
          商品を購入する際は、必ず販売元が提示する最終的な価格や条件をご確認ください。
        </p>

        <p>
          当サイトの情報や計算結果を利用したことによって生じた損害について、
          当サイトは責任を負いかねます。
        </p>
      </div>
    </main>
  );
}
