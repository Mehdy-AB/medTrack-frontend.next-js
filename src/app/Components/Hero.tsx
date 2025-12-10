"use client"; // Ajoutez cette ligne en haut

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Hero() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/choose-role');
  };

  return (
    <section className="bg-white mt-0 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          
          {/* Contenu texte - Partie gauche */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Simplifiez la gestion
              <br />
              des stages médicaux
              <br />
              à Boumerdès
            </h1>
            
            <p className="text-base text-gray-600 mb-6">
              Une plateforme intuitive pour connecter étudiants, encadrants et hôpitaux.
            </p>
            
            <button 
              onClick={handleLoginClick}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Se connecter
            </button>
          </div>
          
          {/* Image - Partie droite */}
          <div className="flex-1 flex justify-end">
            <img 
              src="/img/hero-doctors.png" 
              alt="Médecins professionnels"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}