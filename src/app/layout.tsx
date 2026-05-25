import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "黑铁工厂健身房",
  description: "黑铁工厂健身房，面向力量训练、自由重量和认真改变体态的人群。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
