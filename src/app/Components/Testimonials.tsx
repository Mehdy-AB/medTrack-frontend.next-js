import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sara M.",
      role: "3e année",
      userType: "Étudiante en médecine",
      text: "J'ai commencé à tester la plateforme, et je sens qu'elle va vraiment m'aider à mieux organiser mes stages.",
      image: "/img/profil-etudiant.jpg",
      rating: 4.5
    },
    {
      id: 2,
      name: "Dr. Hamid A.",
      role: "Chef de Service",
      userType: "Encadrant - Médecine Interne",
      text: "Cette plateforme facilite énormément le suivi des étudiants. Je peux maintenant évaluer et communiquer en temps réel avec l'université.",
      image: "/img/profil-encadrant.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Hôpital Thenla",
      role: "Responsable des stages",
      userType: "Établissement hospitalier",
      text: "Grâce à MedTrack, la coordination avec l'université est devenue beaucoup plus simple. Les affectations sont claires et bien organisées.",
      image: "/img/profil-etablissment.jpg",
      rating: 5
    },
    {
      id: 4,
      name: "Pr. Karim B.",
      role: "Doyen de la faculté",
      userType: "Administrateur - Faculté de Médecine",
      text: "Un outil indispensable pour gérer efficacement les stages de nos étudiants. La centralisation des données nous fait gagner un temps précieux.",
      image: "/img/profil-administrateur.jpg",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-2">
          Découvrez les premières impressions de nos utilisateurs
        </h2>
        
        {/* Ligne décorative */}
        <div className="w-32 h-1 bg-gray-800 mx-auto mb-12"></div>

        {/* Carrousel */}
        <div className="relative flex items-center justify-center">
          {/* Bouton Précédent */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 z-10 p-3 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={32} className="text-gray-600" />
          </button>

          {/* Carte de témoignage */}
          <div className="max-w-3xl w-full mx-16">
            <div className="bg-linear-to-br from-teal-100 to-cyan-100 rounded-3xl p-8 md:p-12 shadow-xl relative">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Contenu texte */}
                <div className="flex-1">
                  {/* Icône guillemet */}
                  <div className="text-6xl text-gray-700 font-serif mb-4">"</div>
                  
                  {/* Texte du témoignage */}
                  <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                    {currentTestimonial.text}
                  </p>
                  
                  {/* Nom et rôle */}
                  <div className="mb-4">
                    <p className="text-gray-700 font-semibold text-lg">
                      {currentTestimonial.name}, {currentTestimonial.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {currentTestimonial.userType}
                    </p>
                  </div>
                  
                  {/* Étoiles */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={24}
                        className={index < Math.floor(currentTestimonial.rating) 
                          ? "fill-yellow-400 text-yellow-400" 
                          : index < currentTestimonial.rating 
                          ? "fill-yellow-400 text-yellow-400 opacity-50"
                          : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Photo */}
                <div className="shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-300 overflow-hidden shadow-lg">
                    <img 
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton Suivant */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 z-10 p-3 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={32} className="text-gray-600" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-teal-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}