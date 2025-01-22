import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";
import { CSPostHogProvider } from "@/components/providers/PosthogProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.text2mdx.com"),
  title: "Text2MDX - AI-powered Markdown Converter",
  description:
    "Convert text to MD or MDX effortlessly with our AI-powered tool.",
  authors: {
    name: "Harshit Sharma",
  },
  keywords: [
    "text to mdx",
    "text to mdx online",
    "text to mdx converter",
    "markdown to mdx",
    "markdown to mdx converter",
    "Text2MDX",
    "MDX converter",
    "convert text to mdx",
    "convert markdown to mdx",
    "online mdx converter",
    "free mdx converter",
    "best mdx converter",
    "AI text to MDX",
    "automatic MDX conversion",
    "MDX transformation tool",
    "Text2MDX Converter",
    "MDX Conversion Tool",
    "AI Markdown to MDX",
    "Automatic MDX Generator",
    "Text to MDX Transformer",
    "MDX Automation Software",
    "Intelligent MDX Conversion",
    "AI-Powered Text to MDX",
    "Smart MDX Content Creator",
    "Text2MDX SaaS",
    "MDX Writing Assistant",
    "AI MDX Generator",
    "Efficient MDX Conversion",
    "Text to MDX AI Tool",
    "MDX Content Automation",
    "Quick MDX Transformer",
    "Advanced MDX Converter",
    "AI-Assisted MDX Creation",
    "Text2MDX for Developers",
    "MDX Productivity Tool",
    "Streamlined MDX Conversion",
    "Text to MDX AI Software",
    "MDX Content Generation",
    "Intelligent Text2MDX Tool",
    "MDX Writing Automation",
    "AI-Enhanced MDX Conversion",
    "Text2MDX for Content Creators",
    "MDX Developer Assistant",
    "Rapid MDX Transformation",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Text2MDX - AI-powered Markdown Converter",
    description:
      "Convert text to MD or MDX effortlessly with our AI-powered tool.",
    url: "https://www.text2mdx.com",
    type: "website",
    images: [
      {
        url: "https://www.text2mdx.com/og.png",
        width: 1200,
        height: 630,
        alt: "Text2MDX",
      },
    ],
    siteName: "Text2MDX",
    locale: "en_US",
  },
  icons: { apple: "/og.png" },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@text2mdx",
    title: "Text2MDX - AI-powered Markdown Converter",
    description: "Convert text to MDX effortlessly with our AI-powered tool.",
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2030617860941780"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <CSPostHogProvider>
            <GoogleAnalytics gaId="G-50LGCCPZB6" />
            {children}
            <Toaster
              theme="dark"
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#2D3748",
                  color: "#E2E8F0",
                  border: "1px solid #4A5568",
                },
              }}
            />
          </CSPostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
