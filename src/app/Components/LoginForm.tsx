// components/LoginForm.tsx
'use client';
import { Lock, Mail } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        setError('Email ou mot de passe incorrect.');
        setIsLoading(false);
      } else {
        // Fetch session to get the role
        const res = await fetch('/api/auth/session');
        const session = await res.json();

        if (session?.user?.role) {
          const role = session.user.role;
          // Redirect based on role
          switch (role) {
            case 'admin':
              router.push('/tableau-de-bord');
              break;
            case 'student':
              router.push('/espace-etudiant');
              break;
            case 'encadrant':
              router.push('/espace-encadrant');
              break;
            case 'establishment': // Assuming role string from backend
              router.push('/espace-etablissement');
              break;
            default:
              router.push('/tableau-de-bord'); // Fallback
          }
          router.refresh();
        } else {
          // Fallback if session fetch fails or no role
          router.push('/tableau-de-bord');
          router.refresh();
        }
      }
    } catch (error) {
      console.error('Login exception:', error);
      setError('Une erreur est survenue lors de la connexion.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header avec logo */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="MedTrack Logo" className="h-45 w-45" />
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
            Application pour gérer les stages des étudiants de médecine au niveau des hôpitaux de la wilaya de Boumerdès
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
              <p className="text-gray-500 text-sm mt-2">Accédez à votre espace sécurisé</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@medtrack.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : 'Se connecter'}
              </button>
            </form>

            {/* Lien mot de passe oublié */}
            <div className="mt-6 text-center">
              <Link
                href="/reset-password"
                className="text-sm text-gray-500 hover:text-teal-600 transition-colors underline decoration-dotted underline-offset-2"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <p className="text-center text-xs text-gray-400">
          Copyright © 2025 MedTrack.com - Tous droits réservés
        </p>
      </footer>
    </div>
  );
}