// app/reset-password/[role]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const role = params.role as string;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="MedTrack Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-teal-600">MedTrack</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Bouton retour */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>

          {/* Carte de message */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Réinitialisation du mot de passe
            </h2>
            
            <p className="text-gray-600 mb-2">
              Pour réinitialiser votre mot de passe ({role}), veuillez contacter :
            </p>
            
            <div className="bg-gray-100 rounded-lg p-4 mt-4 mb-6">
              <p className="font-medium text-gray-800">Support technique MedTrack</p>
              <p className="text-gray-600 text-sm mt-1">support@medtrack.com</p>
              <p className="text-gray-600 text-sm">+213 XXX XX XX XX</p>
            </div>
            
            <Link
              href={`/login/${role}`}
              className="inline-block text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <p className="text-center text-xs text-gray-500">
          Copyright © 2025 MedTrack.com
        </p>
      </footer>
    </div>
  );
}