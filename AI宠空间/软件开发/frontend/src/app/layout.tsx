import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "PetCare AI - 宠护平台",
  description: "专业宠物护理预约平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="grid-8pt">
        <Header />
        {children}
      </body>
    </html>
  );
}
