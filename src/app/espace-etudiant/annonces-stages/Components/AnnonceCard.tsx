"use client";

import { AnnonceStage } from '../models/stage.model';
import { MapPin, Calendar, Users, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AnnonceCardProps {
  annonce: AnnonceStage;
}

const AnnonceCard = ({ annonce }: AnnonceCardProps) => {
  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'Ouvert':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Fermé':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Bientôt':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {annonce.titre}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="text-teal-500" />
              <span>{annonce.hopital}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-teal-500" />
              <span>{annonce.duree}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatutStyle(annonce.statut)}`}>
          {annonce.statut}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {annonce.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar size={16} />
            <span>Début: {annonce.dateDebut}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={16} />
            <span>{annonce.placesRestantes}/{annonce.nombrePlaces} places</span>
          </div>
        </div>
        <Link
          href={`/espace-etudiant/annonces-stages/${annonce.id}`}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
        >
          Voir détails
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default AnnonceCard;