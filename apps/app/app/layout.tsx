import "@ezlegin/ui/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./fonts.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased custom-scrollbar ${inter.variable}`}
    >
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID!} />
      <body>
        {children}
        <Toaster theme="system" position="top-right" richColors />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Ezlegin",
    template: "%s - Ezlegin",
  },
  description: "Ezlegin: Design Without Limits",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "آی‌گرافیکال",
    "آی گرافیک",
    "igraphical",
    "آموزش گرافیک",
    "دیزاین",
    "آموزش ایلاستریتور",
    "آموزش فتوشاپ",
    "طراحی بسته‌بندی",
    "طراحی لوگو",
    "گرافیک دیزاین",
  ],
  authors: [{ name: "Ezlegin", url: process.env.NEXT_PUBLIC_BASE_URL }],
  creator: "Ezlegin",
  publisher: "Ezlegin",
  openGraph: {
    title: "Ezlegin",
    description: "Ezlegin: Design Without Limits",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Ezlegin",
    locale: "en",
    type: "website",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Ezlegin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezlegin",
    description: "Ezlegin: Design Without Limits",
    images: ["/og-cover.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  alternates: {
    canonical: "/",
  },
};
