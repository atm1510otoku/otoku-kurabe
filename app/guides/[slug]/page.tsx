import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guides
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-emerald-700">
        買い物ガイド
      </p>

      <h1 className="mt-2 text-2xl font-extrabold">
        {guide.title}
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        {guide.intro}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-slate-700">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-slate-900">
              {section.heading}
            </h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3">
                {paragraph}
              </p>
            ))}

            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-bold text-slate-900">
            実際に計算して確認する
          </p>

          <Link
            href={guide.toolHref}
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white"
          >
            {guide.toolLabel}
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            関連する買い物ガイド
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedGuides.map((item) => (
              <Link
                key={item.slug}
                href={`/guides/${item.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300"
              >
                <p className="font-bold text-slate-900">
                  {item.title}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/guides"
            className="font-bold text-emerald-700 underline underline-offset-4"
          >
            買い物ガイド一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}