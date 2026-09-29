import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "お得くらべのプライバシーポリシーです。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold">プライバシーポリシー</h1>

      <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
        <p>
          お得くらべでは、利用者のプライバシーを尊重し、
          必要な範囲で情報を取り扱います。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          底値データについて
        </h2>

        <p>
          底値として保存した商品情報は、現在の仕様では利用者のブラウザ内に保存されます。
          サイト運営者のサーバーへ送信して保存する仕組みではありません。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          Google Analyticsについて
        </h2>

        <p>
          当サイトでは、利用状況の把握とサービス改善のため、
          Google LLCが提供するGoogle Analyticsを利用しています。
          Google AnalyticsではCookie等を利用し、閲覧したページ、利用日時、
          参照元、端末やブラウザなどの利用環境に関する情報が収集される場合があります。
        </p>

        <p>
          Googleによる情報の取り扱いについては、
          Googleのプライバシーポリシーをご確認ください。
        </p>

        <p>
          <a
            href="https://policies.google.com/privacy?hl=ja"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-emerald-700 underline underline-offset-2"
          >
            Google プライバシーポリシー
          </a>
        </p>

        <p>
          Google Analyticsによる計測を望まない場合は、
          ブラウザのCookie設定などを利用してCookieを無効にすることができます。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          広告について
        </h2>

        <p>
          現時点では広告配信サービスを導入していません。
          今後、広告サービス等を導入した場合は、
          本ページに必要な情報を追記します。
        </p>

        <h2 className="text-lg font-bold text-slate-900">
          内容の変更
        </h2>

        <p>
          本ポリシーは、サービス内容や法令等の変更に応じて改定する場合があります。
        </p>
      </div>
    </main>
  );
}
