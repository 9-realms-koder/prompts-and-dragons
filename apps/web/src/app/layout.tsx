import { JetBrains_Mono, Orbitron } from 'next/font/google';
import type { JSX, ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'NeonRealms - RPG Assíncrono com IA',
  description: 'Plataforma de RPG de mesa assíncrono com Mestre de IA no universo cyberpunk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="pt-BR" className={`${orbitron.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-cyber-darker font-display">{children}</body>
    </html>
  );
}
