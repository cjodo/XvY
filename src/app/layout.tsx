import "~/styles/globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

import { Header } from "~/_components/Header";

import { ClerkProvider } from "@clerk/nextjs";

export const dynamic = "force-dynamic" //Force page to refresh every visit... Instead of using cached page

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "XvY",
  description: "Compare data from many sources",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gray-600`}>
        <Header/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
