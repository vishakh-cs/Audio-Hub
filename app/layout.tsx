import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { NextAuthProvider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audio hub",
  description: "Audio hub for upload audio and share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider >
         <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
