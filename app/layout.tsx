import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteEffects from "./components/SiteEffects";

const tanker = localFont({
  src: "./fonts/Tanker-400.woff",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const beVietnamPro = localFont({
  src: [
    { path: "./fonts/BeVietnamPro-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BeVietnamPro-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Crave Bakery — flaky pastries, beautiful cakes",
  description:
    "Fan-favourite meat pies, custom cakes, banana bread and brownies, baked fresh in Port Harcourt. Same-day delivery.",
  openGraph: {
    title: "La Crave Bakery — flaky pastries, beautiful cakes",
    description:
      "Fan-favourite meat pies, custom cakes, banana bread and brownies, baked fresh in Port Harcourt.",
    url: "https://www.instagram.com/lacravebakery/",
    siteName: "La Crave Bakery",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${tanker.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-in animations start hidden, so only hide them when JS can reveal them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
      </head>
      <body id="top">
        {children}
        <SiteEffects />
      </body>
    </html>
  );
}
