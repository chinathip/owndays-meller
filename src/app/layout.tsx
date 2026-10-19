import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const title =
  "商品一覧 | OWNDAYS × MELLER（メラー） 公式オンラインストア｜サングラス";
const description =
  "OWNDAYS × MELLER 商品一覧。デザイン性・機能性に優れたサステナブルな素材のサングラス（全てUV99%以上カット・偏光レンズ・傷防止コート・撥水コート）を展開中。";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "商品一覧",
    "サングラス",
    "偏光レンズ",
    "Meller",
    "メラー",
    "アイウェア",
    "フレーム",
    "サステナブル",
    "トレンド",
    "バルセロナ",
    "スペイン",
    "OWNDAYS",
    "オンデーズ",
    "オンデイズ",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/images/ogp_1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "OWNDAYS × MELLER",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
