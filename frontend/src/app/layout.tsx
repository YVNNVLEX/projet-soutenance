import type { Metadata } from "next";
import {Raleway, Poppins } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Book My Doctor",
  description: "Application de prise de rendez-vous medical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
