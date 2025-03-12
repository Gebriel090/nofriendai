import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoFriendAI",
  description:
    "NoFriendAI, uma IA gerada para te ajudar a flertar pelas redes sociais!",
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
        <SessionProvider>
          <div className="flex">
            {/* Sidebar agora começa recolhida */}
            <Sidebar />
            <div className="bg-[#212121] flex-1 h-screen overflow-hidden relative text-gray-200">
              <Header />
              {children}
            </div>
          </div>
        </SessionProvider>
        <Toaster
          position="top-right"
          toastOptions={{ style: { background: "#000000", color: "#ffffff" } }}
        />
      </body>
    </html>
  );
}
