import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl font-bold text-white">
            得
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight text-slate-900">
              お得くらべ
            </p>
            <p className="text-sm text-slate-500">
              値段だけでは分からない「本当にお得」を比較
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
