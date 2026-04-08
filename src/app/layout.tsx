import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani, Oswald, Barlow, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthProvider } from "@/components/providers/auth-provider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ITCPL - Indian Tennis Cricket Premier League",
  description: "Sports tournament management and live scoring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${rajdhani.variable} ${oswald.variable} ${barlow.variable} ${plex.variable} bg-[#080808] text-[#F0EDE8]`}
      >
        <AuthProvider>
          <SiteHeader />
          <main className="min-h-screen pt-16">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </body>
    </html>
  );
}