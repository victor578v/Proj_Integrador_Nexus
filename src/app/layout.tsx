import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/footer";
import React from "react";
import { Navbar } from "@/components/Navbar/navbar";
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

export const metadata = {
  title: "Nexus",
  description: "Nexus - Site de mesas para RPG",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

