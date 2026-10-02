import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-slate-700">
          <Link href="/unit-price" className="hover:text-emerald-700">
            単価比較
          </Link>
          <Link href="/discount" className="hover:text-emerald-700">
            割引計算
          </Link>
          <Link href="/points" className="hover:text-emerald-700">
            ポイント還元
          </Link>
          <Link href="/tax" className="hover:text-emerald-700">
            税込・税抜計算
          </Link>
          <Link href="/bottom-price" className="hover:text-emerald-700">
            底値比較
          </Link>
          <Link href="/guides" className="hover:text-emerald-700">
            買い物ガイド
          </Link>
        </nav>

        <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-500">
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