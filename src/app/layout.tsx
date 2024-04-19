import "~/styles/globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

export const dynamic = "force-dynamic" //Force page to refresh every visit... Instead of using cached page

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "xvy",
  description: "Compare data from many sources",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function Header() {
  return (
    <header className="w-full text-xl flex bg-blue-900 p-6 shadow-md">
      <nav className="flex w-full justify-between text-violet-100">
        <div className="flex gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/add-graph"}>Graphs</Link>
        </div>

        <Link href={"#"}>Sign In</Link>
      </nav>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
