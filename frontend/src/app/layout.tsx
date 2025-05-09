import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { LoadingProvider } from "@/components/providers/loading-provider";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
  display: "swap"
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
      <body className={`${raleway.className} antialiased`}>
        <LoadingProvider>
          <Providers>{children}</Providers>
        </LoadingProvider>
      </body>
    </html>
  );
}
