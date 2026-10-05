import type { Metadata } from "next";
import { Zalando_Sans_Expanded, Luxurious_Script } from "next/font/google";
import "./globals.css";
import { SEO } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RouteScrollReset from "@/components/layout/RouteScrollReset";

const zalandoSansExpanded = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-zalando",
  display: "swap",
});

const luxuriousScript = Luxurious_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-luxurious",
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${zalandoSansExpanded.variable} ${luxuriousScript.variable}`}>
      <body>
        <RouteScrollReset />
        <Header />
        <main id="conteudo-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
