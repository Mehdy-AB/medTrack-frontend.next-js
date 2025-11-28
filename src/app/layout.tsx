import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MedTrack - Gestion des stages médicaux',
  description: 'Plateforme de gestion des stages médicaux à Boumerdès',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 