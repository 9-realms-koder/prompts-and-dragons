import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeonRealms - RPG Assincrono com IA',
  description: 'Plataforma de RPG de mesa assincrono com Mestre de IA no universo cyberpunk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-cyber-darker">{children}</body>
    </html>
  );
}
