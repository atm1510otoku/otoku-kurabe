import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-600">
          <Link href="/about" className="hover:text-emerald-700">
            お得くらべについて
          </Link>
          <Link href="/privacy" className="hover:text-emerald-700">
            プライバシー
          </Link>
          <Link href="/disclaimer" className="hover:text-emerald-700">
            免責事項
          </Link>
          <Link href="/terms" className="hover:text-emerald-700">
            利用規約
          </Link>
        </nav>

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 お得くらべ
        </p>
      </div>
    </footer>
  );
}
