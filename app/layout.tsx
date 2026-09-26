import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "お得くらべ｜単価・割引・ポイント・送料をまとめて比較",
  description:
    "価格、容量、割引、クーポン、ポイント、送料をまとめて計算し、本当にお得な商品を実質単価で比較できる買い物支援ツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
