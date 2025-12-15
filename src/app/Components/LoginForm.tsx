// components/LoginForm.tsx
'use client';
import { GraduationCap, UserCheck, Settings, Building2 } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { signIn } from 'next-auth/react';

interface LoginFormProps {
  role: 'etudiant' | 'encadrant' | 'admin' | 'etablissement';
}

const ROLE_CONFIG = {
  etudiant: {
    title: 'Portail Étudiant - Gestion Simplifiée des Stages Médicaux',
    icon: <GraduationCap className="w-7 h-7 text-gray-600" />,
    userPlaceholder: "Matricule Etudiant",
    indication: "nom d'utilisateur = année de bac + matricule du bac ex:20251056989",
    userIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  encadrant: {
    title: 'Portail Encadrant - Gestion Simplifiée des Stages Médicaux',
    icon: <UserCheck className="w-7 h-7 text-gray-600" />,
    userPlaceholder: "Matricule Encadrant",
    userIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <circle cx="18" cy="6" r="3" fill="currentColor" />
      </svg>
    )
  },
  admin: {
    title: 'Portail Admin - Gestion Simplifiée des Stages Médicaux',
    icon: <Settings className="w-7 h-7 text-gray-600" />,
    userPlaceholder: "Matricule Admin",
    userIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L12 6M19.07 4.93L16.24 7.76M22 12L18 12M19.07 19.07L16.24 16.24M12 22L12 18M4.93 19.07L7.76 16.24M2 12L6 12M4.93 4.93L7.76 7.76" />
      </svg>
    )
  },
  etablissement: {
    title: 'Portail Établissement - Gestion Simplifiée des Stages Médicaux',
    icon: <Building2 className="w-7 h-7 text-gray-600" />,
    userPlaceholder: "Matricule Etablissement",
    userIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
};

export default function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const config = ROLE_CONFIG[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: username,
        password: password,
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        alert('Échec de la connexion. Vérifiez vos identifiants.'); // Simple alert for now
        setIsLoading(false);
      } else {
        router.push(`/dashboard/${role}`);
        router.refresh(); // Refresh to update session
      }
    } catch (error) {
      console.error('Login exception:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header avec logo */}
      <header className="bg-white border-b border-gray-200 ">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="MedTrack Logo" className="h-45 w-45 " />
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600 mb-10 max-w-2xl mx-auto">
            Application pour gérer les stages des étudiants de médecine au niveau des hôpitaux de la wilaya de Boumerdès
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Afficher ce div seulement si le rôle est "etudiant" */}
          {role === 'etudiant' && (
            <div className="bg-teal-200/50 rounded-lg py-4 px-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-base font-semibold text-white text-center">
                  nom d&apos;utilisateur = année de bac + matricule du bac ex:20251056989
                </h2>
              </div>
            </div>
          )}

          {/* Formulaire de connexion */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ nom d'utilisateur */}
              <div>
                <div>
                  <p className="text-gray-500 text-center text-xs mb-5">
                    {config.title}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {config.userIcon}
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={config.userPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Champ mot de passe */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            {/* Lien mot de passe oublié */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => router.push(`/reset-password/${role}`)}
                className="text-sm text-gray-600 hover:text-teal-500 transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>
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