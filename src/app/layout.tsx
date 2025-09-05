import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Metavuz - Professional Music Production Studio Lagos",
  description: "Professional recording, mixing, and mastering studio in Lagos. Clean sound, hard beats, and a chill space to create. Beat production, vocal recording, mixing & mastering services.",
  keywords: "music studio Lagos, recording studio, beat production, mixing mastering, music production, studio booking, professional recording, music studio Nigeria",
  authors: [{ name: "Studio Metavuz" }],
  creator: "Studio Metavuz",
  publisher: "Studio Metavuz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studio-metavuz.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Studio Metavuz - Professional Music Production Studio Lagos",
    description: "Professional recording, mixing, and mastering studio in Lagos. Clean sound, hard beats, and a chill space to create.",
    url: 'https://studio-metavuz.vercel.app',
    siteName: 'Studio Metavuz',
    images: [
      {
        url: '/images/IMG_4846.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Metavuz - Professional Music Production Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Studio Metavuz - Professional Music Production Studio Lagos",
    description: "Professional recording, mixing, and mastering studio in Lagos. Clean sound, hard beats, and a chill space to create.",
    images: ['/images/IMG_4846.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
