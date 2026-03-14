import type { Metadata } from "next";
import "./globals.css";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TruyenArt LLC - Architectural Visualization",
  description:
    "TruyenArt LLC: Your premier partner for photorealistic architectural visualization. Specializing in stunning 3D renders, VR experiences, and real-time Enscape designs for architects and real estate.",
  keywords:
    "architectural visualization, 3D rendering services, architectural rendering, Enscape rendering, Enscape visualization, interior visualization, exterior visualization, 360 panorama rendering, virtual reality architectural visualization",
  openGraph: {
    title: "TruyenArt LLC",
    description:
      "TruyenArt LLC: Your premier partner for photorealistic architectural visualization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="/cdn/css/sites05bc.css" />
        <link rel="stylesheet" type="text/css" href="/cdn/css/old/fancyboxc6f1.css" />
        <link rel="stylesheet" type="text/css" href="/cdn/css/social-iconsbe9a.css" media="screen,projection" />
        <link rel="stylesheet" type="text/css" href="/files/main_styled28e.css" title="wsite-theme-css" />
        <link href="/cdn/fonts/Montserrat/fontc81e.css" rel="stylesheet" type="text/css" />
        <link href="/cdn/fonts/Open_Sans/fontc81e.css" rel="stylesheet" type="text/css" />
        <link href="/cdn/fonts/Lato/fontc81e.css" rel="stylesheet" type="text/css" />
        <link href="/cdn/fonts/Playfair_Display/fontc81e.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="/files/theme/slideshow.css" />
      </head>
      <body className="header-page full-width-body-off header-overlay-off alt-nav-off wsite-theme-light fade-in">
        <LayoutSwitcher>{children}</LayoutSwitcher>
        <Script src="/files/templateArtifactsd28e.js" strategy="afterInteractive" />
        <Script src="/cdn/js/jquery-1.8.3.min.js" strategy="afterInteractive" />
        <Script src="/cdn/js/site/main05bc.js" strategy="afterInteractive" />
        <Script src="/files/theme/slideshow.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
