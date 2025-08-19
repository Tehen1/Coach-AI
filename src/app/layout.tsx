
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Alegreya } from 'next/font/google';
import AuthProvider from "@/components/AuthProvider";

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

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
    <html lang="fr" className={alegreya.variable}>
      <body className="font-body antialiased bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
