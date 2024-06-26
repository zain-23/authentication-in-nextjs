import type { Metadata } from "next";
import { Alef } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/queryProvider";

const inter = Alef({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Authentication in Next js",
  description: "Complete Authentication in Next js with Jwt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
