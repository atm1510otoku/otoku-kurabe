import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "お得くらべの利用規約です。",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold">利用規約</h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          お得くらべをご利用いただく場合、本利用規約に同意いただいたものとします。
        </p>

        <h2 className="text-lg font-bold text-slate-900">利用目的</h2>

        <p>
          当サイトは、商品価格や各種条件を比較するための補助ツールとして提供しています。
        </p>

        <h2 className="text-lg font-bold text-slate-900">禁止事項</h2>

        <p>
          当サイトの運営を妨害する行為、不正アクセスその他法令に反する行為を禁止します。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          サービス内容の変更
        </h2>

        <p>
          当サイトは、必要に応じて機能や内容を変更、追加、停止する場合があります。
        </p>

        <h2 className="text-lg font-bold text-slate-900">規約の変更</h2>

        <p>
          本規約は、必要に応じて変更する場合があります。
        </p>
      </div>
    </main>
  );
}
