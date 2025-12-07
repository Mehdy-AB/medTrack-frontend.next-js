import React from 'react';

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Suivi Des Stages",
      description: "centralisation des\naffectations et rapports.",
      icon: "/img/f1.png",
      bgColor: "bg-[#42BABA]",
      position: "top-left"
    },
    {
      id: 2,
      title: "Communication Hop-Uni",
      description: "Communication entre  hôpital et\nuniversité\nvalidation rapide en ligne.",
      icon: "/img/f2.png",
      bgColor: "bg-[#ADF2F2]",
      textColor: "text-gray-700",
      position: "top-right"
    },
    {
      id: 3,
      title: "Accès sécurisé",
      description: "chaque utilisateur a son propre compte.",
      icon: "/img/f3.png",
      bgColor: "bg-[#308F98]",
      position: "bottom-left"
    },
    {
      id: 4,
      title: "Planning",
      description: "gestion automatique des\nrotations.",
      icon: "/img/f4.png",
      bgColor: "bg-[#4CC3DE]",
      textColor: "text-gray-700",
      position: "bottom-right"
    }
  ];

  return (
    <section className="bg-white -mt-22 py-0 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titre de la section - aligné à gauche */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-left">
          Une solution rapide pour gérer les stages<br />
          médicaux efficacement
        </h2>

        {/* Grille des features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className={`${feature.bgColor} rounded-3xl p-8 ${feature.textColor || 'text-white'} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-visible`}
            >
              {/* Icône flottante positionnée au coin supérieur droit */}
              <div className="absolute -top-10 -right-6">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-20 h-20 object-contain drop-shadow-lg"
                />
              </div>

              {/* Contenu */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-base whitespace-pre-line leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}