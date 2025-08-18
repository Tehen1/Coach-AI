import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fadma Coach AI - Personal AI Fitness Coach",
  description:
    "Votre coach personnel IA pour fitness, nutrition et bien-être mental. Programmes personnalisés, suivi en temps réel et motivation quotidienne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
