import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContactWidget from "./components/ContactWidget";
import Footer from "./components/Footer";
import Motion from "./components/Motion";
import Navbar from "./components/Navbar";
import ParallaxBand from "./components/ParallaxBand";

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
  title: {
    default: "La Crave Bakery | flaky pastries, beautiful cakes",
    template: "%s | La Crave Bakery",
  },
  description:
    "Fan-favourite meat pies, custom cakes, banana bread and brownies, baked fresh in Port Harcourt. Same-day delivery.",
  openGraph: {
    title: "La Crave Bakery | flaky pastries, beautiful cakes",
    description:
      "Fan-favourite meat pies, custom cakes, banana bread and brownies, baked fresh in Port Harcourt.",
    siteName: "La Crave Bakery",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff3e3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${tanker.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-in animations start hidden, so only hide them when JS can reveal them.
            The intro plays once per browser session. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js");try{if(!sessionStorage.getItem("lc-intro")){sessionStorage.setItem("lc-intro","1");d.classList.add("intro-on")}}catch(e){}})()',
          }}
        />
      </head>
      <body id="top">
        <Navbar />
        <main>{children}</main>
        <ParallaxBand />
        <Footer />
        <ContactWidget />
        <Motion />
      </body>
    </html>
  );
}
