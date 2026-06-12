import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장기 렌트 및 리스 견적",
  description: "실시간 장기 렌트 및 오토리스 견적 비교 신청",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
