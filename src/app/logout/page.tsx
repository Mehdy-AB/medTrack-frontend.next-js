// app/logout/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogoutPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleLogout = () => {
    // Supprimer les tokens/sessions
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    // Vous pouvez ajouter d'autres éléments à supprimer selon votre logique
    
    // Rediriger vers la page de choix de rôle
    router.push('/choose-role');
  };

  const handleCancel = () => {
    // Retourner à la page précédente
    router.back();
  };

  // Empêcher le scroll quand le modal est ouvert
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-teal-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Se déconnecter ?
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-8">
          Êtes-vous sûr de vouloir quitter votre session ?
        </p>

        {/* Boutons */}
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}