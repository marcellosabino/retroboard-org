import Script from "next/script";
import "./globals.css";

export const metadata = {
  title:
    "RetroBoard - A free and easy-to-use retro tool for running your retrospectives",
  description: "Your free and easy-to-use retro tool. No account needed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
      />
      <Script id="google_analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA}');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
