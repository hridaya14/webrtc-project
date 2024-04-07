import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Call",
  description: "WebRTC Powered web application for video calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#181c24]`}>
        <Providers>
          {
              children
          }
        </Providers>
          
        </body>
    </html>
  );
}
