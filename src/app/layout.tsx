import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import InitReduxFromLocalStorage from "./components/InitReduxFromLocalStorage";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import { Providers } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Next App assignment",
  description: "Datagain Front end developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col h-screen">
        <Providers>
          <Header />
          <div className="flex h-screen">
            <Sidebar />
            <InitReduxFromLocalStorage />
            <main className="flex-1 overflow-y-auto px-4 pt-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
