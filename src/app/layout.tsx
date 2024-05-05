import "~/styles/globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

import { Header } from "~/_components/Header/Header";

import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "~/_components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GitXY",
  description: "Visualize various github data. using public data",
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
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
