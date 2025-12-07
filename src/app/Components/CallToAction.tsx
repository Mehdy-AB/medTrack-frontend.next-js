import React from 'react';

export default function CallToAction() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Image à gauche */}
          <div className="flex-1">
            <img 
              src="/img/se-connecter.png" 
              alt="MedTrack Application"
              className="w-full max-w-md mx-auto object-contain"
            />
          </div>

          {/* Contenu texte à droite */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-teal-600 leading-tight mb-6">
              Tout se fait en quelques clics, sans complications.
            </h2>
            
            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
              Rend la connexion entre les étudiants et les hôpitaux fluide, rapide et sécurisée.
            </p>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Une seule plateforme, des dizaines d'avantages.. 🚀🚀🚀
            </p>

            {/* Lignes décoratives */}
            <div className="flex gap-2 mb-8">
              <div className="h-1 w-16 bg-teal-400 rounded"></div>
              <div className="h-1 w-12 bg-teal-300 rounded"></div>
              <div className="h-1 w-8 bg-teal-200 rounded"></div>
            </div>

            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
              Se connecter
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}