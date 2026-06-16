import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장기 렌트 및 리스 견적",
  description: "실시간 장기 렌트 및 오토리스 견적 비교 신청",
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-17910158234`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17910158234');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
