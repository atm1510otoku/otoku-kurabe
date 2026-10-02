import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "./data";

export const metadata: Metadata = {
  title: "買い物ガイド｜単価・割引・ポイント・底値を分かりやすく解説",
  description:
    "単価比較、割引、ポイント還元、税込・税抜、まとめ買い、底値など、買い物で迷いやすい計算や考え方を分かりやすく解説します。",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">買い物に役立つ</p>

      <h1 className="mt-2 text-2xl font-extrabold">
        お得くらべ 買い物ガイド
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        「どちらが本当に安い？」「割引とポイントはどう違う？」など、
        買い物で迷いやすいテーマを具体例つきで解説します。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300"
          >
            <h2 className="font-bold text-slate-900">
              {guide.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {guide.description}
            </p>

            <p className="mt-3 text-sm font-bold text-emerald-700">
              続きを読む →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}