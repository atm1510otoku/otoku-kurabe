import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { getSiteUrl } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "お得くらべ｜単価・割引・ポイント・送料をまとめて比較",
    template: "%s｜お得くらべ",
  },
  description:
    "価格、容量、割引、クーポン、ポイント、送料をまとめて計算し、本当にお得な商品を実質単価で比較できる買い物支援ツールです。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "お得くらべ",
    title: "お得くらべ｜単価・割引・ポイント・送料をまとめて比較",
    description:
      "価格、容量、割引、クーポン、ポイント、送料をまとめて計算し、本当にお得な商品を実質単価で比較できる買い物支援ツールです。",
  },
  twitter: {
    card: "summary",
    title: "お得くらべ｜単価・割引・ポイント・送料をまとめて比較",
    description:
      "価格、容量、割引、クーポン、ポイント、送料をまとめて計算し、本当にお得な商品を実質単価で比較できる買い物支援ツールです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
