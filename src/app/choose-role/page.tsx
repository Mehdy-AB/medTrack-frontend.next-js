// app/choose-role/page.tsx
'use client';
import { GraduationCap, UserCheck, Settings, Building2 } from "lucide-react";
import RoleCard from '../Components/RoleCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const ROLES = [
  {
    id: 'etudiant',
    title: 'Étudiant',
    icon: <GraduationCap className="w-7 h-7 text-gray-600" />
  },
  {
    id: 'encadrant',
    title: 'Encadrant',
    icon: <UserCheck className="w-7 h-7 text-gray-600" />
  },
  {
    id: 'etablissement',
    title: 'Etablissement',
    icon: <Building2 className="w-7 h-7 text-gray-600" />
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: <Settings className="w-7 h-7 text-gray-600" />
  }
  
];

export default function ChooseRolePage() {
  const router = useRouter();

  const handleRoleSelect = (roleId: string) => {
    router.push(`/login/${roleId}`);
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
          <p className="text-center text-lg font-medium text-gray-600  max-w-2xl mx-auto">
             Application pour gérer les stages des étudiants de médecine au niveau des hôpitaux de la wilaya de Boumerdès
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
        {/* Titre */}
        <div className="text-center mb-10">
            <h5 className="text-2xl font-bold text-gray-500">
            Choisissez votre rôle
            </h5>
        </div>

        {/* Liste des rôles */}
        <div className="space-y-4">
            {ROLES.map((role) => (
            <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 
                        hover:bg-gray-100 transition cursor-pointer group"
            >
                {/* Icône */}
                <div className="text-3xl">{role.icon}</div>

                {/* Nom */}
                <div className="flex-grow">
                <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900">
                    {role.title}
                </span>
                </div>

                {/* Flèche */}
                <div className="text-gray-400 group-hover:text-gray-600">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                    />
                </svg>
                </div>
            </div>
            ))}
        </div>
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-10 py-4">
            <p className="text-center text-xs text-gray-500">
            Copyright © 2025 MedTrack.com
            </p>
        </footer>
        </div>
        
      </main>

      
    </div>
  );
}