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
  description:
    "Convert text to MD or MDX effortlessly with our AI-powered tool.",
  keywords: [
    "text to mdx",
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
