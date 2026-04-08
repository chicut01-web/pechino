import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PECHINO | Lo zaino senza compromessi",
  description: "Zaino di alta qualità, costruito con perfezione artigianale, per chi non scende a compromessi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-white bg-black selection:bg-[#C8A97E] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
