import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./providers";
import ChatAssistant from "./components/ChatAssistant";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import WorkerSafetyButton from "./components/WorkerSafetyButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSakhi - Empowering Women Through Skills",
  description: "Connect with skilled women service providers for tailoring, mehendi, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FDFBF7] text-[#4A4A4A]`}
        style={{ fontFamily: 'Lato, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
      >
        <AuthProvider>
          <ServiceProvider>
            <Providers>
              <Navbar />
              <div className="animate-page-enter">{children}</div>
              <Footer />
              <ChatAssistant />
              <WorkerSafetyButton />
            </Providers>
          </ServiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
