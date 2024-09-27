import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

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
  title: "Text2MDX - AI-powered Markdown Converter",
  description: "Convert text to MDX effortlessly with our AI-powered tool.",
  keywords: [
    "AI",
    "Markdown",
    "MDX",
    "Text Conversion",
    "SaaS",
    "Automation",
    "Content Creation",
    "Developer Tools",
    "Productivity",
    "Writing",
    "AI Markdown Converter",
    "Text to MDX",
    "Markdown Automation",
    "AI Writing Tools",
    "Markdown Generator",
    "MDX Generator",
    "AI Content Creation",
    "Markdown Editor",
    "MDX Editor",
    "AI Text Conversion",
    "Markdown SaaS",
    "AI Developer Tools",
    "AI Productivity Tools",
    "Markdown Writing",
    "MDX Writing",
    "AI Content Tools",
    "Markdown Conversion",
    "MDX Conversion",
    "AI Markdown Generator",
    "AI MDX Generator",
    "AI Text Tools",
    "Markdown Productivity",
    "MDX Productivity",
    "AI Writing Assistant",
    "Markdown Assistant",
    "MDX Assistant",
    "AI Content Generator",
    "Markdown Content Generator",
    "MDX Content Generator",
    "AI Text Tools",
    "Markdown Tools",
    "MDX Tools",
    "AI Writing Software",
    "Markdown Software",
    "MDX Software",
    "AI Content Software",
    "Markdown Conversion Tool",
    "MDX Conversion Tool",
  ],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Text2MDX - AI-powered Markdown Converter",
    description: "Convert text to MDX effortlessly with our AI-powered tool.",
    url: "https://text2mdx.cleverdeveloper.in",
    type: "website",
    images: [
      {
        url: "https://text2mdx.cleverdeveloper.in/og.png",
        width: 1200,
        height: 630,
        alt: "Text2MDX",
      },
    ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
